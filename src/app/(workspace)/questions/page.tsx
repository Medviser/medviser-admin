import type { Metadata } from "next";
import QuestionsContent from "./content";

export const metadata: Metadata = {
     title: "Հարցեր"
}
export default function QuestionsPage() {
     return (
          <QuestionsContent/>
     )
}