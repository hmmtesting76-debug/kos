// Components
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';
import { email, update } from '@/routes/password';

type Props = {
    status?: string;
    otpSent?: boolean;
    passwordRules: string;
};

export default function ForgotPassword({
    status,
    otpSent = false,
    passwordRules,
}: Props) {
    return (
        <>
            <Head title="Forgot password" />

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="space-y-6">
                <Form {...email.form()}>
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="no_hp">Nomor HP</Label>
                                <Input
                                    id="no_hp"
                                    type="tel"
                                    name="no_hp"
                                    required
                                    autoComplete="off"
                                    autoFocus
                                    inputMode="numeric"
                                    placeholder="08xxxxxxxxxx"
                                />

                                <InputError message={errors.no_hp} />
                            </div>

                            <div className="my-6 flex items-center justify-start">
                                <Button
                                    className="w-full"
                                    disabled={processing}
                                    data-test="phone-password-reset-otp-button"
                                >
                                    {processing && (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                    )}
                                    Kirim kode OTP
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                {otpSent && (
                    <Form
                        {...update.form()}
                        resetOnSuccess={['otp', 'password', 'password_confirmation']}
                    >
                        {({ processing, errors }) => (
                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="reset_no_hp">Nomor HP</Label>
                                    <Input
                                        id="reset_no_hp"
                                        type="tel"
                                        name="no_hp"
                                        required
                                        inputMode="numeric"
                                        placeholder="08xxxxxxxxxx"
                                    />
                                    <InputError message={errors.no_hp} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="otp">Kode OTP</Label>
                                    <Input
                                        id="otp"
                                        type="text"
                                        name="otp"
                                        required
                                        inputMode="numeric"
                                        maxLength={6}
                                        placeholder="123456"
                                    />
                                    <InputError message={errors.otp} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password baru</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        autoComplete="new-password"
                                        passwordrules={passwordRules}
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">
                                        Konfirmasi password baru
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        required
                                        autoComplete="new-password"
                                        passwordrules={passwordRules}
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    {processing && (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                    )}
                                    Reset password
                                </Button>
                            </div>
                        )}
                    </Form>
                )}

                <div className="text-muted-foreground space-x-1 text-center text-sm">
                    <span>Atau kembali ke</span>
                    <TextLink href={login()}>login</TextLink>
                </div>
            </div>
        </>
    );
}

ForgotPassword.layout = {
    title: 'Reset password',
    description: 'Gunakan nomor HP untuk menerima kode OTP WhatsApp',
};
