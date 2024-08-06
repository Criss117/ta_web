"use client";

import { useEffect, useState } from "react";

import { useSaleState } from "../state/sale.state";
import { useQueryClient } from "@tanstack/react-query";
import useFindOneProduct from "../../hooks/use.find-one-product";
import { ProductForTickerAdapter } from "../adapters/porduct-for-ticker.adapter";
import type { MutateProductReturnType } from "../../mutate-product/models/types";

const useSales = () => {
  const [barCodeState, setBarCodeState] = useState<string>("");
  const { addProductToCurrentTicket } = useSaleState();

  const queryClient = useQueryClient();

  const { findOneProductQuery, executeQuery } = useFindOneProduct(
    barCodeState,
    false
  );

  //when barCodeState changes execute query
  useEffect(() => {
    if (barCodeState.length <= 3) return;
    executeQuery();
  }, [barCodeState]);

  //when get a new product it is added to the state
  useEffect(() => {
    if (!findOneProductQuery.data?.data?.barcode) return;

    addProductToCurrentTicket(
      ProductForTickerAdapter.adapt(findOneProductQuery.data?.data)
    );
  }, [findOneProductQuery.data?.data?.barcode]);

  const handleSearch = (barcode: string) => {
    const productCached: MutateProductReturnType | undefined =
      queryClient.getQueryData(["product", barcode]);

    if (productCached && productCached.data?.barcode === barcode) {
      addProductToCurrentTicket(
        ProductForTickerAdapter.adapt(productCached.data)
      );
      return;
    }
    setBarCodeState(barcode);
  };

  return { findOneProductQuery, handleSearch };
};

export default useSales;
