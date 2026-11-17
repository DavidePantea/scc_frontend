import type { NextConfig } from "next";

// Security headers applied to every route.
//
// The Content-Security-Policy is intentionally limited to directives that
// cannot break the page: a full script-src allowlist would need per-request
// nonces and would have to track every Google AdSense domain, so it is left
// out. `browsing-topics` is not disabled because AdSense uses the Topics API.
const securityHeaders = [
  // Nobody may embed the site in a frame (clickjacking protection for the
  // login and signup forms). X-Frame-Options covers older browsers.
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'",
  },
  { key: "X-Frame-Options", value: "DENY" },
  // Browsers must not guess content types.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send only the origin, not the full URL (which can hold a researchId),
  // to other sites.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Features the site never uses.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), usb=(), payment=()" },
  // HTTPS only, for two years. No includeSubDomains/preload, so other
  // subdomains of the domain are not affected.
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
];

const nextConfig: NextConfig = {
  // Don't advertise the framework/version in an X-Powered-By header.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
