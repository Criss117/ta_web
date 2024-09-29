import CreateProductDto from "./create-product.dto";

interface EditProductDto extends CreateProductDto {
  id: number;
}

export default EditProductDto;
