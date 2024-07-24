import { NextResponse, NextRequest, NextFetchEvent } from "next/server";
import { rateLimiter } from "./lib/ratelimiter";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

async function rateLimitMiddleware(req: NextRequest) {
  //helps enables authentication and to confifure protected routes

  const ip = req.ip ?? "127.0.0.1";

  try {
    const { success } = await rateLimiter.limit(ip);

    console.log("success", success);

    if (!success) return new NextResponse("You are writing messages too fast.");
    return NextResponse.next();
  } catch (error) {
    return new NextResponse(
      "Sorry, something went wrong processing your message. Please try again later."
    );
  }
}

const isProtectedRoutes = createRouteMatcher([/signin\/.*/]);

export default clerkMiddleware(async (auth, request) => {
  if (isProtectedRoutes(request)) {
    auth().protect();
  }

  const rateLimit = await rateLimitMiddleware(request);
  if (rateLimit) return rateLimit;

  return NextResponse.next();
});

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/api/message/:path*",
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    "/",
  ],
};
