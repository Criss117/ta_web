import { ROUTES } from "@/lib/constants/nav";
import Link from "next/link";
const NotFound = () => {
  return (
    <div className="mx-auto h-screen">
      <h1 className="text-3xl font-bold text-center">Producto no encontrado</h1>
      <div className="mx-auto mt-20 flex justify-between w-1/3">
        <Link href={ROUTES.EDIT_PRODUCTS} className="underline">
          Editar un producto
        </Link>
        <Link href={ROUTES.CREATE_PRODUCTS} className="underline">
          Crear un producto
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
