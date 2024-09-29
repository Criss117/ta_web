interface CreateProductDto {
  barcode: string;
  description: string;
  costPrice: number;
  salePrice: number;
  wholesalePrice: number;
  stock: number;
  minStock: number;
}

export default CreateProductDto;
