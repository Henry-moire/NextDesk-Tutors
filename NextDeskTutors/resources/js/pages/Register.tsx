import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from "../layouts/Layout";

export default function Register() {
  return (
    <Layout>
      <Head title="Register" />

      <main className="min-h-screen bg-gray-100 flex items-start justify-center pt-16">
        <div className="bg-white shadow-xl rounded-2xl p-10 w-[60%]">
          <h2 className="text-3xl font-bold mb-8 text-blue-600 text-center">
            Create Your Account
          </h2>
          <p className="text-black mb-6">
            Fill in your details to start learning or teaching with NextDesk Tutor.
          </p>

          <Form
            {...RegisteredUserController.store.form()}
            resetOnSuccess={['password', 'password_confirmation']}
            disableWhileProcessing
            className="flex flex-col gap-6"
          >
            {({ processing, errors }) => (
              <>
                {/* Full Name */}
                <div className="flex items-center gap-4">
                  <Label htmlFor="full_name" className="w-1/4 text-blue-600 font-medium text-right">
                    Name
                  </Label>
                  <div className="w-3/4">
                    <Input
                      id="full_name"
                      type="text"
                      required
                      autoFocus
                      tabIndex={1}
                      autoComplete="name"
                      name="full_name"
                      placeholder="Full name"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 text-black"
                    />
                    <InputError message={errors.full_name} className="mt-1 text-sm text-red-600" />
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <Label htmlFor="email" className="w-1/4 text-blue-600 font-medium text-right">
                    Email
                  </Label>
                  <div className="w-3/4">
                    <Input
                      id="email"
                      type="email"
                      required
                      tabIndex={2}
                      autoComplete="email"
                      name="email"
                      placeholder="email@example.com"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 text-black"
                    />
                    <InputError message={errors.email} className="mt-1 text-sm text-red-600" />
                  </div>
                </div>

                {/* Role */}
                <div className="flex items-center gap-4">
                  <Label htmlFor="role" className="w-1/4 text-blue-600 font-medium text-right">
                    Role
                  </Label>
                  <div className="w-3/4">
                    <select
                      id="role"
                      name="role"
                      required
                      defaultValue="student"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 text-black"
                    >
                      <option value="student">Student</option>
                      <option value="tutor">Tutor</option>
                    </select>
                    <InputError message={errors.role} className="mt-1 text-sm text-red-600" />
                  </div>
                </div>

                {/* Password */}
                <div className="flex items-center gap-4">
                  <Label htmlFor="password" className="w-1/4 text-blue-600 font-medium text-right">
                    Password
                  </Label>
                  <div className="w-3/4">
                    <Input
                      id="password"
                      type="password"
                      required
                      tabIndex={3}
                      autoComplete="new-password"
                      name="password"
                      placeholder="Password"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 text-black"
                    />
                    <InputError message={errors.password} className="mt-1 text-sm text-red-600" />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="flex items-center gap-4">
                  <Label htmlFor="password_confirmation" className="w-1/4 text-blue-600 font-medium text-right">
                    Confirm Password
                  </Label>
                  <div className="w-3/4">
                    <Input
                      id="password_confirmation"
                      type="password"
                      required
                      tabIndex={4}
                      autoComplete="new-password"
                      name="password_confirmation"
                      placeholder="Confirm password"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 text-black"
                    />
                    <InputError message={errors.password_confirmation} className="mt-1 text-sm text-red-600" />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-yellow-400 text-black hover:bg-yellow-500 focus:ring focus:ring-yellow-300 rounded-lg transition"
                  tabIndex={5}
                  data-test="register-user-button"
                >
                  {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                  Create Account
                </Button>
              </>
            )}
          </Form>

          {/* Login Link */}
          <div className="text-left text-sm text-black mt-4">
            Already have an account?{' '}
            <TextLink
              href={login()}
              tabIndex={6}
              className="inline-block bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            >
              Log in
            </TextLink>
          </div>
        </div>
      </main>
    </Layout>
  );
}
