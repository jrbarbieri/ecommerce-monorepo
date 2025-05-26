"use client";

import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { useParams, useSearchParams } from "next/navigation";

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin: 32px;
`;

const ProductCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  min-width: 200px;
  background: green;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const PRODUCT_QUERY = gql`
  query ($productId: ID!) {
    product(productId: $productId) {
      id
      name
      price
      stock
      users {
        name
      }
    }
  }
`;

export default function ProductScreen() {
  const params = useParams();
  const productId = params.id;
  const { data, loading, error } = useQuery(PRODUCT_QUERY, {
    variables: { productId },
    skip: !productId,
  });

  if (!productId) return <div>Usuário não informado.</div>;
  if (loading) return <div>Carregando produtos....</div>;
  if (error) return <div>Erro ao carregar produtos.</div>;

  return (
    <ProductsContainer>
      <ProductCard key={data.product.id}>
        <h1>{data.product.name}</h1>
        <p>Price: $ {data.product.price}</p>
        <p>Stock: $ {data.product.stock}</p>
        <p>Users: $ {data.product.users?.map((user) => user.name)}</p>
      </ProductCard>
    </ProductsContainer>
  );
}
