import ProductForm from "@/core/products-old/product-form/components/product-form";

const CreateProductPage = () => {
  return (
    <section className="w-1/3 mx-auto">
      <ProductForm onPage="create" />
    </section>
  );
};

export default CreateProductPage;
