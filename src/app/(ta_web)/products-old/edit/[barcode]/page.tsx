import ProductFormContainer from "@/core/products-old/product-form/product-form.container";
import { notFound } from "next/navigation";

interface Props {
  params: {
    barcode: string;
  };
}

const EditProductPage = ({ params }: Props) => {
  const { barcode } = params;

  return (
    <section className="w-1/3 mx-auto">
      <ProductFormContainer onPage="edit" barcode={barcode} />
    </section>
  );
};

export default EditProductPage;
