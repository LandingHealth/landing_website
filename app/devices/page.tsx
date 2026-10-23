import type { Metadata } from "next";
import SveltePage from "@/components/SveltePage";

export const metadata: Metadata = {
  title: "Devices | Landing",
  description: "Meet SafeSock, Landing's sensor sleeve for understanding weight bearing during recovery.",
};

export default function DevicesPage() {
  return <SveltePage name="devices" />;
}
