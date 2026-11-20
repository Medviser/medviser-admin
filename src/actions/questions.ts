"use server"
import { insertQuestion } from "@/data/question";
import { questionSchema } from "@/lib/schemas";
import type { QuestionFormValues } from "@/lib/types/schema";

export async function createQuestion(values: QuestionFormValues){
     const validated = questionSchema.safeParse(values);
     if(!validated.success) {
          console.error(validated.error)
          return {error: "Դաշտերը դեռ անվավեր են"}
     }

     // TODO: Այստեղ միացրու ադմինի իրավունքի սերվերային ստուգումը։

     try {
          await insertQuestion(validated.data);
          return { success: true };
     } catch {
          return { error: "Չհաջողվեց պահպանել հարցը։ Կրկին փորձեք։" };
     }
}