import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CatProfileProps } from "@/types";



export default function CatInfoTable({
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
}: CatProfileProps) {
  return (
    <Table className="">
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
        <TableCell>{vetClinic}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Chip Number</TableCell>
        <TableCell>{chipNumber}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Medical Issues</TableCell>
        <TableCell>{medicalIssues}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Favorite Food</TableCell>
        <TableCell>{favFood}</TableCell>
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
  );
}
