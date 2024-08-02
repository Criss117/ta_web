import MutateProductContainer from "@/core/products/mutate-product/mutate-product.container";

interface Props {
  params: {
    barcode: string;
  };
}

const EditProductPage = ({ params }: Props) => {
  const { barcode } = params;

  const barcodeDecode = decodeURIComponent(barcode);

  return <MutateProductContainer barcode={barcodeDecode} action="edit" />;
};

export default EditProductPage;
