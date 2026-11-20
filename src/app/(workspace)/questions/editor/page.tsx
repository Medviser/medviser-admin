import type { Metadata } from "next";
import QuestionsEditorForm from "./form";

export const metadata: Metadata = {
     title: "Հարցի խմբագրիչ"
}
export default function QuestionsEditor(){
     return (
          <QuestionsEditorForm/>
     )
}