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
import { CatProfileProps } from "@/types";
import { convertSnakeCaseToCamelCase } from "@/lib/utils";


type CatProfileConvertedProps = {
  [key: string]: string;
} & CatProfileProps;

export default function CatProfile() {
  const { user } = useUser();
  const userId: string | undefined = user?.id as string;
  const [catsInfo, setCatsInfo] = useState<{
    isLoading: boolean, 
    data: CatProfileProps[], 
    error: string | null}>
    ({
    isLoading: false,
    data: [],
    error: null,
  });

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
        const convertKeysToCamelCase = (data: CatProfileConvertedProps[]): CatProfileConvertedProps[] => {
          return data.map((item) => {
            const convertedItem: CatProfileConvertedProps = {
              name: "",
              age: "",
              breed: "",
              birthdate: "",
              vetClinic: "",
              chipNumber: "",
              medicalIssues: "",
              favFood: "",
              vaccinations: "",
              weight: "",
              color: "",
            };
            for (const key in item) {
              if (Object.prototype.hasOwnProperty.call(item, key)) {
          const camelCaseKey = convertSnakeCaseToCamelCase(key);
          convertedItem[camelCaseKey] = item[key] || ""; 
              }
            }
            return convertedItem;
          });
        };

        const convertedData: CatProfileProps[] = convertKeysToCamelCase(data);
        setCatsInfo({ isLoading: false, data: convertedData, error: null });
        

        setCatsInfo({ isLoading: false, data, error: null });

        // console.log("ERROR", error);
      } catch (error ) {
        if(error instanceof Error) {
          setCatsInfo({ isLoading: false, data: [], error: error.message });
        } else {

          console.error("Error fetching cats:", error);
      }
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
        {catsInfo.data.length === 0 ? (
          <div className="border rounded-lg p-4 my-auto">
            <p>
              No cat info found! Add cat info with the button above
                </p>
          </div>
        ) : (
          catsInfo.data.map(
            ({
              id,
              name,
              age,
              breed,
              birthdate,
              vetClinic,
              chipNumber,
              medicalIssues,
              favFood,
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
                          vetClinic={vetClinic}
                          chipNumber={chipNumber}
                          medicalIssues={medicalIssues}
                          favFood={favFood}
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
