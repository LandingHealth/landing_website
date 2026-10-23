import type { Metadata } from "next";
import SveltePage from "@/components/SveltePage";

export const metadata: Metadata = {
  title: "Product | Landing",
  description: "Landing connects physical therapy practice tools with movement context from SafeSock.",
};

export default function ProductPage() {
  return <SveltePage name="product" />;
}
