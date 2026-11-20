"use server"
import { deleteQuestion, insertQuestion, updateQuestion } from "@/data/question";
import { questionSchema } from "@/lib/schemas";
import type { QuestionFormValues } from "@/lib/types/schema";
import { revalidatePath } from "next/cache";

export async function createQuestion(values: QuestionFormValues){
     const validated = questionSchema.safeParse(values);
     if(!validated.success) {
          console.error(validated.error)
          return {error: "Դաշտերը դեռ անվավեր են"}
     }

     

     try {
          await insertQuestion(validated.data);
          return { success: true };
     } catch {
          return { error: "Չհաջողվեց պահպանել հարցը։ Կրկին փորձեք։" };
     }
}
export async function editQuestion(id: string, values: QuestionFormValues) {
     if (typeof id !== "string" || !id.trim()) {
          return { error: "Հարցի ID-ն պարտադիր է։" };
     }

     const parsed = questionSchema.safeParse(values);
     if (!parsed.success) return { error: "Ստուգեք լրացված դաշտերը։" };

     // TODO: Այստեղ միացրու ադմինի իրավունքի սերվերային ստուգումը։

     try {
          await updateQuestion(id, parsed.data);
     } catch {
          return { error: "Չհաջողվեց պահպանել հարցը։" };
     }

     revalidatePath("/questions");
     return { success: true as const };
}

export async function removeQuestion(id: string) {
     if (typeof id !== "string" || !id.trim()) {
          return { error: "Հարցի ID-ն պարտադիր է։" };
     }

     // TODO: Այստեղ միացրու ադմինի իրավունքի սերվերային ստուգումը։

     try {
          if (!(await deleteQuestion(id))) {
               return { error: "Հարցը չի գտնվել։" };
          }
     } catch {
          return { error: "Չհաջողվեց ջնջել հարցը։ Հնարավոր է՝ այն արդեն օգտագործվում է։" };
     }

     revalidatePath("/questions");
     return { success: true as const };
}