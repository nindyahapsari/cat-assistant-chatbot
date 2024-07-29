"use client";
import { useState, useEffect } from "react";
import { loadAuth2, loadGapiInsideDOM } from "gapi-script";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardNav from "@/components/dashboard/DashboardNav";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Dashboard() {
  const [googleApi, setGoogleApi] = useState({});
  const [isGoogleInit, setIsGoogleInit] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const DISCOVERY_DOC =
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
  const SCOPES = "https://www.googleapis.com/auth/calendar";

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    console.log(url);
  }, [pathname, searchParams]);

  useEffect(() => {
    // Load the Google API client
    const loadGapi = async () => {
      const newGapi = await loadGapiInsideDOM();
      console.log("newGapi", newGapi);

      setIsGoogleInit(true);
      setGoogleApi(newGapi);
    };
    loadGapi();
  }, [accessToken, isGoogleInit]);

  useEffect(() => {
    if (!isGoogleInit) return;

    const setAuth2 = async () => {
      const auth2 = await loadAuth2(
        googleApi,
        "610188912129-52moq56krgnh4kig28kfb5u76dldc0or.apps.googleusercontent.com",
        SCOPES
      );
      if (auth2.isSignedIn.get()) {
        console.log(`auth2 signed in`, auth2);
        setAccessToken(auth2.currentUser.get().getAuthResponse().access_token);
      } else {
        console.log(`auth2 not signed in`);
        const googleSignIn = document.getElementById("googleSignIn");
        auth2.attachClickHandler(googleSignIn, {}, (googleUser: any) => {
          // getBasicProfile().getName() is the user's name
          // click prototype in console to see all the methods available
          // old docs:https://developers.google.com/identity/sign-in/web/reference
          console.log(`googleUser`, googleUser);
        });
      }
    };
    setAuth2();
  }, [isGoogleInit, googleApi, accessToken]);

  const handleCreateEvent = async () => {
    const body = {
      summary: "TEST Calendar integration",
      location: "800 Howard St., San Francisco, CA 94103",
      description: "A chance to hear more about Google's developer products.",
      start: {
        dateTime: "2024-08-01T09:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: "2024-08-01T17:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
    };

    try {
      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const result = await response.json();
      console.log(`result`, result);
      alert(`Event created: ${result.htmlLink}`);
    } catch (error) {
      console.error(`error`, error);
    }
  };

  const handleSignOut = async () => {
    const auth2 = googleApi.auth2.getAuthInstance();
    await auth2.signOut();
    setAccessToken(null);
  };

  return (
    <div className="w-full flex flex-col justify-center overflow-y-scroll">
      <div className="flex w-full flex-col my-4">
        <DashboardNav />

        <main className="flex flex-1 flex-col gap-4 p-4 tablet:gap-8 tablet:p-8">
          <div>
            {!accessToken && (
              <>
                <Button id="googleSignIn">Sign in with Google</Button>
              </>
            )}

            {accessToken && isGoogleInit && (
              <>
                <Button onClick={handleCreateEvent}>
                  Create Event Calendar
                </Button>
                <Button onClick={handleSignOut}>Sign out google</Button>
              </>
            )}
          </div>
          <div>
            <h3 className="text-xl font-thin">
              Oh you dont have a cat profile, create one right here
            </h3>
            <Link href={`/cat-profile`}>
              <Button>Cat Profile</Button>
            </Link>
          </div>
          <div className="flex flex-row gap-4">
            <Card className="flex-grow w-2/3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium">
                  Cat Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Name:</TableCell>
                      <TableCell className="font-bold">Marie</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Age:</TableCell>
                      <TableCell className="font-bold">10 years old</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Breed:</TableCell>
                      <TableCell className="font-bold">
                        Eurpean domestic short hair
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>Marie aka Bawang</CardHeader>
              <CardContent>
                <Image
                  alt="Product image"
                  className="aspect-square w-full rounded-md object-cover"
                  src="/assets/whisker.svg"
                  height="100"
                  width="200"
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
