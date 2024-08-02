import {
    Loader2,
  } from "lucide-react";

export default function Loading(){
    return(
        <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-primary">Loading</p>
        </div>
      </div>
    )
}