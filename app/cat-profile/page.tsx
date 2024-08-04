"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CardProfile from "@/components/catProfile/CardProfile";
import CatInfoTable from "@/components/catProfile/CatInfoTable";

export default function CatProfile() {
  const { user } = useUser();
  const userId = user?.id;
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      try {
        if (!userId) {
          console.error("User ID is undefined or null");
          return;
        }

        const response = await fetch(`/api/cat-profile?userId=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching cats");
        }

        const { data } = await response.json();
        setCats(data);

        // console.log("ERROR", error);
      } catch (error) {
        console.error("Error fetching cats:", error);
      }
    };
    getCats();
  }, [userId]);

  return (
    <div className="p-8 flex flex-col justify-center">
      <div>
        <Button className="border border-whisker-darkBlue bg-whisker-darkBlue text-whisker-white">
          <Link href={`/cat-profile/edit`}>Add Cat Profile</Link>
        </Button>
      </div>

      <div className="py-8 w-full h-full flex flex-row justify-start items-center gap-4 desktop:overflow-x-scroll desktop:flex-row">
        {cats.length > 1 ? (
          <div className="border rounded-lg p-4 my-auto">
            <p>
              No cat info found! Add cat info with the button above
                </p>
          </div>
        ) : (
          cats.map(
            ({
              id,
              name,
              age,
              breed,
              birthdate,
              vet_clinic,
              chip_number,
              medical_issues,
              fav_food,
              vaccinations,
              weight,
              color,
            }) => {
              return (
                <Dialog key={id}>
                  <DialogTrigger>
                    <CardProfile name={name} />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{name}</DialogTitle>
                      <DialogDescription>
                        <CatInfoTable
                          name={name}
                          age={age}
                          breed={breed}
                          birthdate={birthdate}
                          vetClinic={vet_clinic}
                          chipNumber={chip_number}
                          medicalIssues={medical_issues}
                          favFood={fav_food}
                          vaccinations={vaccinations}
                          weight={weight}
                          color={color}
                        />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              );
            }
          )
        )}
      </div>
    </div>
  );
}
