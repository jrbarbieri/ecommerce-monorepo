import { Suspense } from "react";
import ProductScreen from "@/screens/ProductScreen";

export default async function ProductPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ProductScreen />
    </Suspense>
  );
}
