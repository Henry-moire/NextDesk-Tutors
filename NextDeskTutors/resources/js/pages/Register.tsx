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

      <main className="container mx-auto px-4 py-12 max-w-md">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

          <Form
            {...RegisteredUserController.store.form()}
            resetOnSuccess={['password', 'password_confirmation']}
            disableWhileProcessing
            className="flex flex-col gap-6"
          >
            {({ processing, errors }) => (
              <>
                <div className="grid gap-4">
                  {/* Full Name */}
                  <div className="grid gap-1">
                    <Label htmlFor="full_name" className="px-1 py-1 font-medium">
                      Name
                    </Label>
                    <Input
                      id="full_name"
                      type="text"
                      required
                      autoFocus
                      tabIndex={1}
                      autoComplete="name"
                      name="full_name"
                      placeholder="Full name"
                      className="px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                    <InputError message={errors.full_name} className="mt-1 px-1 text-sm text-red-600" />
                  </div>

                  {/* Email */}
                  <div className="grid gap-1">
                    <Label htmlFor="email" className="px-1 py-1 font-medium">
                      Email address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      tabIndex={2}
                      autoComplete="email"
                      name="email"
                      placeholder="email@example.com"
                      className="px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                    <InputError message={errors.email} className="mt-1 px-1 text-sm text-red-600" />
                  </div>

                  {/* Role */}
                  <div className="grid gap-1">
                    <Label htmlFor="role" className="px-1 py-1 font-medium">
                      Role
                    </Label>
                    <select
                      id="role"
                      name="role"
                      required
                      className="px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                      defaultValue="student"
                    >
                      <option value="student">Student</option>
                      <option value="tutor">Tutor</option>
                    </select>
                    <InputError message={errors.role} className="mt-1 px-1 text-sm text-red-600" />
                  </div>

                  {/* Password */}
                  <div className="grid gap-1">
                    <Label htmlFor="password" className="px-1 py-1 font-medium">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      tabIndex={3}
                      autoComplete="new-password"
                      name="password"
                      placeholder="Password"
                      className="px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                    <InputError message={errors.password} className="mt-1 px-1 text-sm text-red-600" />
                  </div>

                  {/* Confirm Password */}
                  <div className="grid gap-1">
                    <Label htmlFor="password_confirmation" className="px-1 py-1 font-medium">
                      Confirm password
                    </Label>
                    <Input
                      id="password_confirmation"
                      type="password"
                      required
                      tabIndex={4}
                      autoComplete="new-password"
                      name="password_confirmation"
                      placeholder="Confirm password"
                      className="px-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                    <InputError message={errors.password_confirmation} className="mt-1 px-1 text-sm text-red-600" />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring focus:ring-blue-300"
                  tabIndex={5}
                  data-test="register-user-button"
                >
                  {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                  Create account
                </Button>
              </>
            )}
          </Form>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{' '}
            <TextLink href={login()} tabIndex={6}>
              Log in
            </TextLink>
          </div>
        </div>
      </main>
    </Layout>
  );
}
