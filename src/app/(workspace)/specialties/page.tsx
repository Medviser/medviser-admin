import type { Metadata } from "next";
import SpecialtitesContent from "./content";

export const metadata: Metadata = {
     title: "Մասնագիտություններ"
}
export default function SpecialtiesPage() {
     return (
          <SpecialtitesContent/>
     );
}