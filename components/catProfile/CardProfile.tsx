import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

type CardProfileProps = {
    name: string;
    color?: string;
};

export default function CardProfile({ name }: CardProfileProps) {
    return (
        <Card className="bg-whisker-white text-whisker-black rounded-lg desktop:max-w-xl desktop:text-lg">
            <CardHeader className="min-w-20 w-full items-center">
                <Image
                    src="/assets/pawprint.svg"
                    alt="Cat Assistant"
                    className="object-fill scale-100"
                    width={100}
                    height={100}
                />
            </CardHeader>
            <CardContent className="flex flex-col rounded-md desktop:px-2">
                <h4 className="text-xs font-semibold py-2">
                   {name}
                </h4>
            </CardContent>
        </Card>
    );
}