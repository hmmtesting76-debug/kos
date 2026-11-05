<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\WhatsApp\WhatsAppService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render('auth/forgot-password', [
            'status' => $request->session()->get('status'),
            'otpSent' => $request->boolean('otp_sent'),
            'passwordRules' => Password::defaults()->toPasswordRulesString(),
        ]);
    }

    public function show(Request $request): Response
    {
        return $this->create($request);
    }

    public function sendOtp(Request $request, WhatsAppService $whatsapp): RedirectResponse
    {
        $validated = $request->validate([
            'no_hp' => ['required', 'numeric', 'digits_between:10,15'],
        ]);

        $phone = $this->normalizePhone($validated['no_hp']);
        $user = User::where('no_hp', $phone)->first();

        if ($user === null) {
            return back()->withErrors([
                'no_hp' => 'Nomor HP tidak terdaftar.',
            ]);
        }

        $otp = (string) random_int(100000, 999999);
        $expiresAt = now()->addMinutes((int) config('fortify.password_reset_otp.expire', 5));
        $message = sprintf(
            "Kode OTP reset password KosKita: %s\n\nKode berlaku selama %d menit. Jangan bagikan kode ini kepada siapa pun.",
            $otp,
            $expiresAt->diffInMinutes(now()),
        );

        if (! $whatsapp->sendMessage((string) $user->no_hp, $message)) {
            return back()->withErrors([
                'no_hp' => 'Pesan OTP gagal dikirim. Silakan coba lagi nanti.',
            ]);
        }

        Cache::put(
            $this->cacheKey($phone),
            [
                'user_id' => $user->id,
                'otp' => Hash::make($otp),
                'attempts' => 0,
                'expires_at' => $expiresAt->timestamp,
            ],
            $expiresAt,
        );

        return redirect()->route('password.request', ['otp_sent' => 1])
            ->with('status', 'Kode OTP telah dikirim ke nomor WhatsApp Anda.');
    }

    public function reset(Request $request): RedirectResponse
    {
        $validated = Validator::make($request->all(), [
            'no_hp' => ['required', 'numeric', 'digits_between:10,15'],
            'otp' => ['required', 'digits:6'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ])->validate();

        $phone = $this->normalizePhone($validated['no_hp']);
        $reset = Cache::get($this->cacheKey($phone));

        if (! is_array($reset) || ! isset($reset['user_id'], $reset['otp'], $reset['expires_at'])) {
            return back()->withErrors([
                'otp' => 'Kode OTP sudah kedaluwarsa. Silakan minta kode baru.',
            ]);
        }

        if (! Hash::check($validated['otp'], $reset['otp'])) {
            $attempts = (int) ($reset['attempts'] ?? 0) + 1;

            if ($attempts >= 5) {
                Cache::forget($this->cacheKey($phone));

                return back()->withErrors([
                    'otp' => 'Terlalu banyak percobaan. Silakan minta kode baru.',
                ]);
            }

            Cache::put($this->cacheKey($phone), [
                ...$reset,
                'attempts' => $attempts,
            ], now()->setTimestamp((int) $reset['expires_at']));

            return back()->withErrors([
                'otp' => 'Kode OTP tidak valid.',
            ]);
        }

        $user = User::find((int) $reset['user_id']);

        if ($user === null || (string) $user->no_hp !== $phone) {
            return back()->withErrors([
                'otp' => 'Kode OTP tidak valid.',
            ]);
        }

        $user->forceFill(['password' => $validated['password']])->save();
        Cache::forget($this->cacheKey($phone));

        return redirect()->route('login')
            ->with('status', 'Password berhasil direset. Silakan masuk dengan password baru.');
    }

    private function normalizePhone(string $phone): string
    {
        return ltrim($phone, '0');
    }

    private function cacheKey(string $phone): string
    {
        return 'password-reset-otp:'.$phone;
    }
}
