"use client";

import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

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

const PRODUCTS_QUERY = gql`
  query ($userId: ID!) {
    products {
      id
      name
      price
    }
    user(userId: $userId) {
      name
    }
  }
`;

export default function ShopScreen() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const userId = searchParams.get("id");
  const { data, loading, error } = useQuery(PRODUCTS_QUERY, {
    variables: { userId },
    skip: !userId,
  });

  const [
    buyProduct,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(
    gql`
      mutation ($userId: ID!, $productId: ID!) {
        buyProduct(userId: $userId, productId: $productId) {
          name
        }
      }
    `
  );

  const handleSubmit = (productId) => (e) => {
    e.preventDefault();
    router.push(`/shop/product/${productId}`);
  };

  const addProduct = (productId, userId) => async (e) => {
    e.preventDefault();
    const result = await buyProduct({ variables: { productId, userId } });
    alert(`Produto ${result.data.buyProduct.name} adicionado ao carrinho!`);
  };

  if (!userId) return <div>Usuário não informado.</div>;
  if (loading) return <div>Carregando produtos...</div>;
  if (error) return <div>Erro ao carregar produtos.</div>;

  return (
    <div>
      <h1>Welcome to the Shop</h1>
      {data.user && <h2>Hello, {data.user.name}!</h2>}
      <p>Here are the available products:</p>
      <br />

      <ProductsContainer>
        {data.products.map((product) => (
          <ProductCard key={product.id}>
            <h3>{product.name}</h3>
            <p>Price: $ {product.price}</p>
            <button onClick={handleSubmit(product.id)}>Ver detalhes</button>
            <button onClick={addProduct(product.id, userId)}>
              Pegar produto
            </button>
          </ProductCard>
        ))}
      </ProductsContainer>
    </div>
  );
}
