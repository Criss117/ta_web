import ProductFormContainer from "@/core/products/product-form/product-form.container";

const EditProductsPage = () => {
  return (
    <section className="w-1/2 mx-auto">
      <ProductFormContainer onPage="edit" />
    </section>
  );
};

export default EditProductsPage;
