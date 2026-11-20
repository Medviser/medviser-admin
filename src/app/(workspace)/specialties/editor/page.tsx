import type { Metadata } from "next";
import SpecialtyEditorForm from "./form";
import { getSpecialtyById } from "@/data/specialties";

export const metadata: Metadata = {
     title: "Մասնագիտության խմբագրիչ"
}
export default async function SpecialtyEditor({searchParams}: {
     searchParams: Promise<{ id?: string }>
}){
     const {id} = await searchParams;
     const specialty = id ? await getSpecialtyById(id) : null
     return (
          <SpecialtyEditorForm specialty={specialty} sponsorOptions={[]}/>
     )
}