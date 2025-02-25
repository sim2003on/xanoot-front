'use client';

import { Catalog } from '@/components/layouts/ui/catalog/Catalog';

import { useProfile } from '@/hooks/useProfile';

export function Favorites() {
  const { user } = useProfile();

  if (!user) return null;
  console.log(user.favorites);
  return (
    <div className="my-6">
      <Catalog title="Favorites" products={user.favorites} />
    </div>
  );
}
