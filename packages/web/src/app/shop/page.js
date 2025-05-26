import { Suspense } from "react";
import ShopScreen from "@/screens/ShopScreen";

export default async function ShopPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ShopScreen />
    </Suspense>
  );
}
