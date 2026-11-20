import type { Metadata } from "next";
import ResourceEditorForm from "./form";

export const metadata: Metadata = {
     title: "Ռեսուրսների խմբագրիչ"
}
export default function ResourceEditor(){
     return (
          <ResourceEditorForm/>
     )
}