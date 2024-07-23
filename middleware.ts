import { NextResponse, NextRequest, NextFetchEvent } from "next/server";
import { rateLimiter } from "./lib/ratelimiter";
// import  { NextRequest } from "next/server";

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
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

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/message/:path*",
};
