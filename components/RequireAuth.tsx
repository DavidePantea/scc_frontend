'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '@/lib/auth-context';
import { LoaderIcon } from './icons';

// Client-side guard, not a server-side proxy/middleware check: the access
// token lives only in in-memory React state (never a cookie), so the
// server has nothing to inspect on the request itself. This runs on the
// client, where the auth state actually lives.
export default function RequireAuth({ children }: { children: ReactNode }) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  if (status !== 'authenticated') {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoaderIcon className="h-6 w-6 animate-spin text-brand" />
      </div>
    );
  }

  return <>{children}</>;
}
