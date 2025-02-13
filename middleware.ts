import { auth } from './app/_lib/auth';

export const config = {
  matcher: ['/account'],
};

// export function middleware(req: Request, res: Response) {
//   return NextResponse.redirect(new URL('/about', req.url));
// }

export const middleware = auth;
