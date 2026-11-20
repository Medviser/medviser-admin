import type { Metadata } from "next";
import QuestionsEditorForm from "./form";
import { getQuestionEditorOptions } from "@/data/question";

export const metadata: Metadata = {
     title: "Հարցի խմբագրիչ"
}
export default async function QuestionsEditor(){
     const options = await getQuestionEditorOptions();
     return (
          <QuestionsEditorForm {...options}/>
     )
}