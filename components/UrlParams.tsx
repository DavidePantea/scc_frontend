'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type Params<K extends string> = Record<K, string | null>;

function Reader<K extends string>({ keys, onChange }: { keys: readonly K[]; onChange: (values: Params<K>) => void }) {
  const searchParams = useSearchParams();
  const values = keys.map((key) => searchParams.get(key));
  const signature = values.join('\u0000');

  useEffect(() => {
    onChange(Object.fromEntries(keys.map((key, i) => [key, values[i]])) as Params<K>);
    // Re-run only when the watched values actually change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);

  return null;
}

/**
 * Read query-string values without opting the whole page out of static
 * rendering. `useSearchParams` makes Next.js render everything up to the
 * nearest <Suspense> in the browser only; isolating it in this tiny reader
 * keeps the page's real content in the server HTML (which is what search
 * engines and the AdSense crawler see). Values are null until hydration.
 *
 * Render the returned `reader` element somewhere in the component.
 */
export function useUrlParams<K extends string>(keys: readonly K[]) {
  const [values, setValues] = useState<Params<K>>(
    () => Object.fromEntries(keys.map((key) => [key, null])) as Params<K>,
  );
  const reader = (
    <Suspense fallback={null}>
      <Reader keys={keys} onChange={setValues} />
    </Suspense>
  );
  return [values, reader] as const;
}
