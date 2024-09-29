import EditProductScreen from "@Core/products/presentation/screen/edit-product.screen";

interface Props {
  params: {
    barcode: string;
  };
}

const EditProductPage = ({ params }: Props) => {
  const { barcode } = params;

  const barcodeDecode = decodeURIComponent(barcode);

  return <EditProductScreen barcode={barcodeDecode} />;
};

export default EditProductPage;
