'use client';
import { useAppStore } from '@/components/StoreProvider';
import { Home } from '@/components/views/Home';
import { Location } from '@/components/views/Location';
import { Profile } from '@/components/views/Profile';
import { Recommendations } from '@/components/views/Recommendations';
import { CropDetails } from '@/components/views/CropDetails';
import { Market } from '@/components/views/Market';
import { Compare } from '@/components/views/Compare';

export default function Page() {
  const { state } = useAppStore();

  return (
    <div className="w-full min-h-screen">
      {state.view === 'home' && <Home />}
      {state.view === 'location' && <Location />}
      {state.view === 'profile' && <Profile />}
      {state.view === 'recommendations' && <Recommendations />}
      {state.view === 'details' && <CropDetails />}
      {state.view === 'market' && <Market />}
      {state.view === 'compare' && <Compare />}
    </div>
  );
}
