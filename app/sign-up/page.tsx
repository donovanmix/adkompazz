import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth/server';
import { AuthForm } from '@/components/auth-form';

export const dynamic = 'force-dynamic';

export default async function SignUpPage() {
  const { data: session } = await auth.getSession();
  if (session?.user) redirect('/admin');
  return <AuthForm mode="sign-up" />;
}
