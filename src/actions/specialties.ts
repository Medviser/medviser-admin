"use server"
import { deleteSpecialty, insertSpecialty, updateSpecialty } from "@/data/specialties";
import { specialtyDataSchema } from "@/lib/schemas";
import type { SpecialtyFormData } from "@/lib/types/schema";
import { revalidatePath } from "next/cache";

export async function createSpecialty(values: SpecialtyFormData){
     const validated = specialtyDataSchema.safeParse(values);
     if (!validated.success) {
          console.error(validated.error);
          return { error: "Ստուգեք լրացված դաշտերը։" }
     };

     // TODO: Այստեղ միացրու ադմինի իրավունքի սերվերային ստուգումը։

     try {
          await insertSpecialty(validated.data);
     } catch {
          return { error: "Չհաջողվեց պահպանել մասնագիտությունը։ Կրկին փորձեք։" };
     }

     revalidatePath("/specialties");
     return { success: true };
}
export async function editSpecialty(id: string, values: SpecialtyFormData){
     if (typeof id !== "string" || !id.trim()) {
          return { error: "ID-ն պարտադիր է։" };
     }
     const validated = specialtyDataSchema.safeParse(values);
     if (!validated.success) {
          console.error(validated.error);
          return { error: "Ստուգեք լրացված դաշտերը։" }
     };
     // TODO: Այստեղ միացրու ադմինի իրավունքի սերվերային ստուգումը։

     try {
          await updateSpecialty(id, validated.data);
     } catch {
          return { error: "Չհաջողվեց պահպանել մասնագիտությունը։ Կրկին փորձեք։" };
     }

     revalidatePath("/specialties");
     return { success: true };
}
export async function removeSpecialty(id: string) {
     if (typeof id !== "string" || !id.trim()) {
          return { error: "ID-ն պարտադիր է։" };
     }

     // TODO: Այստեղ կանչիր ադմինի իրավունքի սերվերային ստուգումը։

     try {
          const deletedId = await deleteSpecialty(id.trim());
          if (deletedId === null) return { error: "Մասնագիտությունը չի գտնվել։" };
     } catch {
          return { error: "Չհաջողվեց ջնջել մասնագիտությունը։ Կրկին փորձեք։" };
     }
     revalidatePath("/specialties");
     return { success: true };
}