import type { Metadata } from "next";
import AccountContent from "./content";

export const metadata: Metadata = {
     title: "Հաշիվ"
}
export default function AccountPage() {
     return (
          <AccountContent/>
     );
}