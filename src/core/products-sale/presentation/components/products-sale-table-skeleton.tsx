import TableComponent from "@Core/table/components/table-component";
import { productsSaleColumns } from "./products-sale-columns";

const ProductsSaleTableSkeleton = () => {
  return (
    <TableComponent
      data={[]}
      offset={5}
      isFetching={false}
      columns={productsSaleColumns}
    />
  );
};

export default ProductsSaleTableSkeleton;
