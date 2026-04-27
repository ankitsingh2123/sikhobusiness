import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { pathname } = request.nextUrl;
  const isAuthRoute = pathname.startsWith('/auth');
  const isCreatorRoute = pathname.startsWith('/creator');
  const isCreatorOnboarding = pathname.startsWith('/creator-onboarding');
  const isAccountRoute = pathname.startsWith('/account');

  // ONLY perform the expensive getUser check if we are on a route that requires redirect logic
  if (isAuthRoute || isCreatorRoute || isCreatorOnboarding || isAccountRoute) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // If user is logged in and tries to access /auth routes, redirect to home
    if (user && isAuthRoute) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/';
      return NextResponse.redirect(redirectUrl);
    }

    // If user is NOT logged in and tries to access protected routes, redirect to login
    if (!user && (isCreatorRoute || isCreatorOnboarding || isAccountRoute)) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/auth/login';
      return NextResponse.redirect(redirectUrl);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/ (API routes)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|api/.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
