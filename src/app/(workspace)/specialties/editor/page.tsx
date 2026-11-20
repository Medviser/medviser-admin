import type { Metadata } from "next";
import SpecialtyEditorForm from "./form";

export const metadata: Metadata = {
     title: "Մասնագիտության խմբագրիչ"
}
export default function SpecialtyEditor(){
     return (
          <SpecialtyEditorForm sponsorOptions={[]}/>
     )
}