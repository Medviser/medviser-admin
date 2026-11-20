import type { Metadata } from "next";
import ReportsContent from "./content";

export const metadata: Metadata = {
     title: "Սխալների հաղորդումներ"
}
export default function ReportsPage() {
     return (
          <ReportsContent/>
     )
}