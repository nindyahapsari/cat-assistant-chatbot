// "use client";
// import { useState, useEffect } from "react";
// import { loadAuth2, loadGapiInsideDOM } from "gapi-script";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import DashboardNav from "@/components/dashboard/DashboardNav";
// import Link from "next/link";
// import { usePathname, useSearchParams } from "next/navigation";

import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Calendar,
  Cat,
  CircleUser,
  Clock,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// export default function Dashboard() {
//   const [googleApi, setGoogleApi] = useState<any>({});
//   const [isGoogleInit, setIsGoogleInit] = useState<boolean>(false);
//   const [accessToken, setAccessToken] = useState(null);

//   const isBrowser = typeof window !== "undefined";

//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const DISCOVERY_DOC =
//     "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
//   const SCOPES = "https://www.googleapis.com/auth/calendar";

//   useEffect(() => {
//     if (!isBrowser) return;
//     const url = `${pathname}?${searchParams}`;
//     // console.log(url);
//   }, [pathname, searchParams, isBrowser]);

//   useEffect(() => {
//     if (!isBrowser) return;
//     // Load the Google API client
//     const loadGapi = async () => {
//       const newGapi = await loadGapiInsideDOM();

//       setIsGoogleInit(true);
//       setGoogleApi(newGapi);
//     };
//     loadGapi();
//   }, [accessToken, isGoogleInit, isBrowser]);

//   useEffect(() => {
//     if (!isGoogleInit || !isBrowser) return;

//     const setAuth2 = async () => {
//       const auth2 = await loadAuth2(
//         googleApi,
//         "610188912129-52moq56krgnh4kig28kfb5u76dldc0or.apps.googleusercontent.com",
//         SCOPES
//       );
//       if (auth2.isSignedIn.get()) {
//         setAccessToken(auth2.currentUser.get().getAuthResponse().access_token);
//       } else {
//         console.log(`auth2 not signed in`);
//         const googleSignIn = document.getElementById("googleSignIn");
//         auth2.attachClickHandler(googleSignIn, {}, (googleUser: any) => {
//           // getBasicProfile().getName() is the user's name
//           // click prototype in console to see all the methods available
//           // old docs:https://developers.google.com/identity/sign-in/web/reference
//         });
//       }
//     };
//     setAuth2();
//   }, [isGoogleInit, googleApi, accessToken, isBrowser]);

//   const handleCreateEvent = async () => {
//     if (!isBrowser) return;
//     const body = {
//       summary: "TEST Calendar integration",
//       location: "800 Howard St., San Francisco, CA 94103",
//       description: "A chance to hear more about Google's developer products.",
//       start: {
//         dateTime: "2024-08-01T09:00:00-07:00",
//         timeZone: "America/Los_Angeles",
//       },
//       end: {
//         dateTime: "2024-08-01T17:00:00-07:00",
//         timeZone: "America/Los_Angeles",
//       },
//     };

//     try {
//       const response = await fetch(
//         "https://www.googleapis.com/calendar/v3/calendars/primary/events",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(body),
//         }
//       );

//       const result = await response.json();
//       alert(`Event created: ${result.htmlLink}`);
//     } catch (error) {
//       console.error(`error`, error);
//     }
//   };

//   const handleSignOut = async () => {
//     const auth2 = googleApi.auth2.getAuthInstance();
//     await auth2.signOut();
//     setAccessToken(null);
//   };

//   return (
//     <div className="w-full flex flex-col justify-center overflow-y-scroll">
//       <div className="flex w-full flex-col my-4">
//         <DashboardNav />

//         <main className="flex flex-1 flex-col gap-4 p-4 tablet:gap-8 tablet:p-8">
//           <div>
//             {!accessToken && (
//               <>
//                 <Button id="googleSignIn">Sign in with Google</Button>
//               </>
//             )}

//             {accessToken && isGoogleInit && (
//               <>
//                 <Button onClick={handleCreateEvent}>
//                   Create Event Calendar
//                 </Button>
//                 <Button onClick={handleSignOut}>Sign out google</Button>
//               </>
//             )}
//           </div>
//           <div>
//             <h3 className="text-xl font-thin">
//               Oh you dont have a cat profile, create one right here
//             </h3>
//             <Link href={`/cat-profile`}>
//               <Button>Cat Profile</Button>
//             </Link>
//           </div>
//           <div className="flex flex-row gap-4">
//             <Card className="flex-grow w-2/3">
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-xl font-medium">
//                   Cat Profile
//                 </CardTitle>
//               </CardHeader>
//               <CardContent></CardContent>
//             </Card>
//             <Card>
//               <CardHeader>Marie aka Bawang</CardHeader>
//               <CardContent>
//                 <Image
//                   alt="Product image"
//                   className="aspect-square w-full rounded-md object-cover"
//                   src="/assets/whisker.svg"
//                   height="100"
//                   width="200"
//                 />
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

export default function Dashboard() {
  return (
    <div className="w-full flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 tablet:grid-cols-2 tablet:gap-8 desktop:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cats</CardTitle>
            <Cat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Number of cats you own
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Activities
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Activities in the last 24 hours
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Vet Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Appointments in the next week
            </p>
          </CardContent>
        </Card>

        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feeding Schedule</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Next: 6 PM</div>
            <p className="text-xs text-muted-foreground">
              Last fed at 12 PM
            </p>
          </CardContent>
        </Card>
        
      </div>
      <div className="grid gap-4 tablet:gap-8 desktop:grid-cols-2">
            <Card x-chunk="dashboard-01-chunk-4">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-8">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cat Name</TableHead>
                      <TableHead >Activity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Whiskers</div>
                      </TableCell>
                      <TableCell>Feeding</TableCell>
                      <TableCell>
                        <Badge className="text-xs" variant="outline">
                          Completed
                        </Badge>
                      </TableCell>
                      <TableCell>
                        2023-10-01
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-5">
  <CardHeader>
    <CardTitle>Upcoming Vet Appointments</CardTitle>
  </CardHeader>
  <CardContent>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cat Name</TableHead>
          <TableHead>Clinic</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <div className="font-medium">Whiskers</div>
          </TableCell>
          <TableCell>Watson Neuköln Clinic</TableCell>
          <TableCell>
            2023-10-05
          </TableCell>
          <TableCell>
            10:00 AM
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </CardContent>
</Card>
      </div>
    </div>
  );
}
