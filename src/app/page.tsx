import React from 'react';
import AppLayout from '@/components/AppLayout';
import MapPageClient from './components/MapPageClient';

export default function InteractiveMapPage() {
  return (
    <AppLayout>
      <MapPageClient />
    </AppLayout>
  );
}