"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";

const BackButton = () => {
  const router = useRouter();
  return (
    <div className="m-2">
      <Button onClick={() => router.back()}>Volver</Button>
    </div>
  );
};

export default BackButton;
