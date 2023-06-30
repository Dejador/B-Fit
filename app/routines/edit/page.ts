'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function EditRoot() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/routines');
  }, []);
  return null;
}
