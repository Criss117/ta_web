import EditProductScreen from "@Core/products/presentation/screen/edit-product.screen";

interface Props {
  params: Promise<{
    barcode: string;
  }>;
}

const EditProductPage = async (props: Props) => {
  const params = await props.params;
  const { barcode } = params;

  const barcodeDecode = decodeURIComponent(barcode);

  return <EditProductScreen barcode={barcodeDecode} />;
};

export default EditProductPage;
