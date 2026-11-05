<?php

use App\Models\User;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;

test('password reset screen can be rendered', function () {
    $response = $this->get(route('password.request'));

    $response->assertOk();
});

test('password reset otp can be requested by phone number', function () {
    config(['whatsapp.fonnte.url' => 'https://api.fonnte.test/send']);
    Http::fake([
        'https://api.fonnte.test/send' => Http::response(['status' => true]),
    ]);

    $user = User::factory()->create();

    $response = $this->post(route('password.email'), ['no_hp' => $user->no_hp]);

    $response
        ->assertRedirect(route('password.request', ['otp_sent' => 1]))
        ->assertSessionHas('status');
    Http::assertSent(fn (Request $request): bool => $request->data()['target'] === (string) $user->refresh()->no_hp);
});

test('password can be reset with a valid phone otp', function () {
    config(['whatsapp.fonnte.url' => 'https://api.fonnte.test/send']);
    $message = null;
    Http::fake(function (Request $request) use (&$message) {
        $message = $request->data()['message'];

        return Http::response(['status' => true]);
    });

    $user = User::factory()->create();

    $this->post(route('password.email'), ['no_hp' => $user->no_hp]);

    preg_match('/\b\d{6}\b/', (string) $message, $matches);

    $response = $this->post(route('password.update'), [
        'no_hp' => $user->no_hp,
        'otp' => $matches[0],
        'password' => 'new-password',
        'password_confirmation' => 'new-password',
    ]);

    $response
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('login'));
    expect(Hash::check('new-password', $user->refresh()->password))->toBeTrue();
});

test('password cannot be reset with an invalid otp', function () {
    $user = User::factory()->create();

    $response = $this->post(route('password.update'), [
        'no_hp' => $user->no_hp,
        'otp' => '123456',
        'password' => 'newpassword123',
        'password_confirmation' => 'newpassword123',
    ]);

    $response->assertSessionHasErrors('otp');
});
