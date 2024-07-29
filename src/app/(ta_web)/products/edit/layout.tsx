import Subtitle from "@/components/ui/subtitle";
import { PropsWithChildren } from "react";

const EditProductLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Subtitle subtitle="Editar Producto" />
      {children}
    </>
  );
};

export default EditProductLayout;
