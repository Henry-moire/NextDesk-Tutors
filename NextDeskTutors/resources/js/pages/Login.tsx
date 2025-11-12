import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { register } from '@/routes';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import Layout from "../layouts/Layout";

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    return (
        <Layout>
            <Head title="Log in" />

            <main className="container mx-auto px-4 py-12 max-w-md">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">Log in to Your Account</h2>

                    <Form
                        {...AuthenticatedSessionController.store.form()}
                        resetOnSuccess={['password']}
                        className="flex flex-col gap-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-4">
                                    {/* Email */}
                                    <div className="grid gap-1">
                                        <Label htmlFor="email" className="px-1 py-1 font-medium">
                                            Email address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            placeholder="email@example.com"
                                            className="px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        />
                                        <InputError message={errors.email} className="mt-1 px-1 text-sm text-red-600" />
                                    </div>

                                    {/* Password */}
                                    <div className="grid gap-1">
                                        <div className="flex items-center">
                                            <Label htmlFor="password" className="px-1 py-1 font-medium">
                                                Password
                                            </Label>
                                            {canResetPassword && (
                                                <TextLink
                                                    href={request()}
                                                    className="ml-auto text-sm"
                                                    tabIndex={5}
                                                >
                                                    Forgot password?
                                                </TextLink>
                                            )}
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            placeholder="Password"
                                            className="px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        />
                                        <InputError message={errors.password} className="mt-1 px-1 text-sm text-red-600" />
                                    </div>

                                    {/* Remember Me */}
                                    <div className="flex items-center space-x-3 px-1 py-1">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            tabIndex={3}
                                        />
                                        <Label htmlFor="remember" className="font-medium">
                                            Remember me
                                        </Label>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring focus:ring-blue-300"
                                    tabIndex={4}
                                    disabled={processing}
                                    data-test="login-button"
                                >
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Log in
                                </Button>

                                {/* Sign up Link */}
                                <div className="text-center text-sm text-gray-500 mt-4">
                                    Don't have an account?{' '}
                                    <TextLink href={register()} tabIndex={5}>
                                        Sign up
                                    </TextLink>
                                </div>
                            </>
                        )}
                    </Form>

                    {/* Status Message */}
                    {status && (
                        <div className="mb-4 text-center text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}
                </div>
            </main>
        </Layout>
    );
}
