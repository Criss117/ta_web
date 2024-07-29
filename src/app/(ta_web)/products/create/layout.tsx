import Subtitle from "@/components/ui/subtitle";
import { PropsWithChildren } from "react";

const CreateProductLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Subtitle subtitle="Nuevo Producto" />
      {children}
    </>
  );
};

export default CreateProductLayout;
