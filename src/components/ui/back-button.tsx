"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

const BackButton = ({ className }: Props) => {
  const router = useRouter();
  return (
    <div className={cn("m-2", className)}>
      <Button onClick={() => router.back()}>Volver</Button>
    </div>
  );
};

export default BackButton;
