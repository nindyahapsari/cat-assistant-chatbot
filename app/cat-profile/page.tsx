"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
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
import { Button } from "@/components/ui/button";

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

        console.log("Fetching cats for user ID:", userId);

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
        <Button>
          <Link href={`/cat-profile/edit`}>Add Cat Profile</Link>
        </Button>
      </div>

      <div className="py-8 w-full h-full flex flex-row justify-start items-center gap-4 desktop:overflow-x-scroll desktop:flex-row">
        {cats.map(
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
              <div key={id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableRow>
                        <TableCell>Age</TableCell>
                        <TableCell>{age}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Breed</TableCell>
                        <TableCell>{breed}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Birthdate</TableCell>
                        <TableCell>{birthdate}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Vet Clinic</TableCell>
                        <TableCell>{vet_clinic}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Chip Number</TableCell>
                        <TableCell>{chip_number}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Medical Issues</TableCell>
                        <TableCell>{medical_issues}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Favorite Food</TableCell>
                        <TableCell>{fav_food}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Vaccinations</TableCell>
                        <TableCell>{vaccinations}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Weight</TableCell>
                        <TableCell>{weight}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Color</TableCell>
                        <TableCell>{color}</TableCell>
                      </TableRow>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
