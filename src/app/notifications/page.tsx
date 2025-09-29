"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const NotificationsPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to scholarship notifications by default
    router.replace('/notifications/scholarship');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
};

export default NotificationsPage;