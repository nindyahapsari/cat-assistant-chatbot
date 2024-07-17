import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function Funfact() {
    return (
        <Card className="bg-slate-100">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold">Fun Fact</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-sm">
                    Did you know that cats have a unique "vocabulary" with their owners? Cats have a variety of ways to communicate with their owners, including meowing, purring, and hissing. 
                </CardDescription>
            </CardContent>
            <CardFooter>
                <p className="text-xs">Source: <a href="https://www.petmd.com/cat/behavior/evr_ct_how-cats-communicate" target="_blank" rel="noreferrer">PetMD</a></p>
            </CardFooter>
        </Card>
    )
};