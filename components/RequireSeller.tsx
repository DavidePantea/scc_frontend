'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '@/lib/auth-context';
import { LoaderIcon } from './icons';

// Same client-side-only reasoning as RequireAuth (no cookie for the server
// to check), plus an account-type gate: a buyer who lands on /seller is
// bounced to their own account page rather than to /login.
export default function RequireSeller({ children }: { children: ReactNode }) {
  const { status, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    } else if (status === 'authenticated' && user && user.accountType !== 'seller') {
      router.replace('/account');
    }
  }, [status, user, router]);

  if (status !== 'authenticated' || !user || user.accountType !== 'seller') {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoaderIcon className="h-6 w-6 animate-spin text-[#2563EB]" />
      </div>
    );
  }

  return <>{children}</>;
}
