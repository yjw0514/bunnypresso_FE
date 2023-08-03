import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('go to => ', request.nextUrl.pathname);
  if (
    request.nextUrl.pathname.startsWith('/story') ||
    request.nextUrl.pathname.startsWith('/mypage')
  ) {
    console.log('로그인 accessToken!', request.cookies.get('accessToken'));
    console.log('로그인 refreshToken!', request.cookies.get('refreshToken'));
    const accessToken = request.cookies.get('accessToken');
    const refreshToken = request.cookies.get('refreshToken');
    if (!accessToken || !refreshToken) {
      console.log('미들웨어 체크 : 로그인 필요함');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}

export const config = {
  matcher: ['/story', '/mypage'],
};
