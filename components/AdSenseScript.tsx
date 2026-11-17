'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { ADSENSE_CLIENT_ID, routeAllowsAds } from '@/lib/adsense';

/** Loads the AdSense script only on routes with real publisher content. */
export default function AdSenseScript() {
  const pathname = usePathname();
  if (!routeAllowsAds(pathname)) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
