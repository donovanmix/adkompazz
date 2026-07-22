'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { authClient } from '@/lib/auth/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface AuthFormProps {
  mode: 'sign-in' | 'sign-up';
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result =
        mode === 'sign-up'
          ? await authClient.signUp.email({ name: name || email.split('@')[0], email, password })
          : await authClient.signIn.email({ email, password });

      if (result?.error) {
        setError(result.error.message || 'Something went wrong. Please try again.');
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <Image
            src="/images/kompas-logo-transparent.png"
            alt="Adkompas"
            width={48}
            height={48}
          />
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h1 className="text-xl font-bold text-gray-900 text-center text-balance">
            {mode === 'sign-in' ? 'Sign in to Lead Manager' : 'Create your account'}
          </h1>
          <p className="text-sm text-gray-500 text-center mt-1 mb-6">
            {mode === 'sign-in'
              ? 'Access the Adkompas lead dashboard'
              : 'Manage Adkompas leads in one place'}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'sign-up' && (
              <div>
                <Label htmlFor="name" className="text-xs font-semibold text-gray-600 uppercase mb-2 block">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Kien Soon"
                  className="border-gray-200"
                />
              </div>
            )}
            <div>
              <Label htmlFor="email" className="text-xs font-semibold text-gray-600 uppercase mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@adkompas.com"
                className="border-gray-200"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-xs font-semibold text-gray-600 uppercase mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="border-gray-200"
              />
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white w-full"
            >
              {loading
                ? 'Please wait...'
                : mode === 'sign-in'
                  ? 'Sign In'
                  : 'Sign Up'}
            </Button>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            {mode === 'sign-in' ? (
              <>
                No account?{' '}
                <Link href="/sign-up" className="text-emerald-700 font-semibold hover:underline">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link href="/sign-in" className="text-emerald-700 font-semibold hover:underline">
                  Sign in
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </main>
  );
}
