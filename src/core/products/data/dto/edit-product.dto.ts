import CreateProductDto from "./create-product.dto";

interface EditProductDto extends CreateProductDto {
  id: string;
}

export default EditProductDto;
