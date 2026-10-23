import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from './lib/auth/token';
import { AFFILIATE_COOKIE_NAME, verifyAffiliateSessionToken } from './lib/auth/affiliate';

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // 0. Affiliate Referral Interception (?ref=CODE -> Route via /r/code tracking engine)
  if (
    searchParams.has('ref') &&
    !pathname.startsWith('/r/') &&
    !pathname.startsWith('/api/') &&
    !pathname.startsWith('/_next/')
  ) {
    const refCode = searchParams.get('ref')?.trim();
    if (refCode) {
      const targetUrl = new URL(`/r/${encodeURIComponent(refCode.toLowerCase())}`, req.url);
      if (pathname && pathname !== '/') {
        targetUrl.searchParams.set('target', pathname);
      }
      return NextResponse.redirect(targetUrl);
    }
  }

  // 1. SEO 301 Redirect: Legacy /products?category=... -> Clean /category/...
  if (pathname === '/products' && searchParams.has('category')) {
    const categorySlug = searchParams.get('category');
    if (categorySlug) {
      const targetUrl = new URL(`/category/${encodeURIComponent(categorySlug)}`, req.url);
      // Preserve other filter/sorting params (e.g. sortBy)
      searchParams.forEach((value, key) => {
        if (key !== 'category' && key !== 'ref') {
          targetUrl.searchParams.set(key, value);
        }
      });
      return NextResponse.redirect(targetUrl, 301);
    }
  }

  // 2. SEO 301 Redirect: Legacy /collections/... -> Clean /category/...
  if (pathname.startsWith('/collections/')) {
    const slug = pathname.replace('/collections/', '');
    const targetUrl = new URL(`/category/${slug}`, req.url);
    searchParams.forEach((value, key) => {
      if (key !== 'ref') targetUrl.searchParams.set(key, value);
    });
    return NextResponse.redirect(targetUrl, 301);
  }

  // 3. Admin Route Security & Access Control
  if (pathname.startsWith('/admin')) {
    const sessionCookie = req.cookies.get(ADMIN_COOKIE_NAME)?.value || req.cookies.get('mfe_admin_session')?.value;
    const session = sessionCookie ? await verifyAdminSessionToken(sessionCookie) : null;
    const isAuthenticated = Boolean(session && session.role === 'super_admin');

    // Handle /admin/login route
    if (pathname === '/admin/login') {
      if (isAuthenticated) {
        const dashboardUrl = new URL('/admin', req.url);
        return NextResponse.redirect(dashboardUrl);
      }
      return NextResponse.next();
    }

    // All other /admin/** routes require verified authentication
    if (!isAuthenticated) {
      const loginUrl = new URL('/admin/login', req.url);
      const fullPath = pathname + req.nextUrl.search;
      if (fullPath !== '/admin') {
        loginUrl.searchParams.set('redirect', fullPath);
      }
      return NextResponse.redirect(loginUrl);
    }
  }

  // 4. Affiliate Route Security & Access Control
  if (pathname.startsWith('/affiliate')) {
    const isPublicAffiliatePath = 
      pathname === '/affiliate/login' || 
      pathname === '/affiliate/register' || 
      pathname === '/affiliate/terms';

    const sessionCookie = req.cookies.get(AFFILIATE_COOKIE_NAME)?.value;
    const session = sessionCookie ? await verifyAffiliateSessionToken(sessionCookie) : null;

    if (!session) {
      if (!isPublicAffiliatePath) {
        const loginUrl = new URL('/affiliate/login', req.url);
        return NextResponse.redirect(loginUrl);
      }
      return NextResponse.next();
    }

    // Authenticated affiliate
    const isImpersonated = Boolean(session.impersonatedBy);

    if (session.status !== 'approved' && !isImpersonated) {
      if (pathname !== '/affiliate/pending') {
        return NextResponse.redirect(new URL('/affiliate/pending', req.url));
      }
      return NextResponse.next();
    }

    // Approved affiliate (or admin impersonating) visiting auth pages or pending page -> redirect to dashboard
    if (pathname === '/affiliate/login' || pathname === '/affiliate/register' || (pathname === '/affiliate/pending' && isImpersonated)) {
      return NextResponse.redirect(new URL('/affiliate', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};
