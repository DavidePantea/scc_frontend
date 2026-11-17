export const ADSENSE_CLIENT_ID = 'ca-pub-5647173051825914';

// AdSense policy forbids Google-served ads on screens without publisher
// content (login/signup, account, dashboards, empty forms, error pages) and
// rejects sites for low-value content. Only routes with substantial content
// load the AdSense script; everything else stays ad-free. Add a route here
// only once it carries real, substantial content of its own.
const AD_ROUTES = ['/'];
const AD_ROUTE_PREFIXES = ['/articole'];

export function routeAllowsAds(pathname: string): boolean {
  return AD_ROUTES.includes(pathname) || AD_ROUTE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}
