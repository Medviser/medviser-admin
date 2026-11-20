// src/actions/resources.ts
"use server";

import { revalidatePath } from "next/cache";
import { deleteResource, insertResource, updateResource } from "@/data/resources";
import { resourceSchema } from "@/lib/schemas";
import type { ResourceFormValues } from "@/lib/types/schema";

type ResourceResult = { success: true } | { error: string };

export async function createResource(values: ResourceFormValues): Promise<ResourceResult> {
     const parsed = resourceSchema.safeParse(values);
     if (!parsed.success) {
          console.error(parsed.error);
          return { error: "Ստուգեք լրացված դաշտերը։" }
     };

     // TODO: Այստեղ կանչիր ադմինի իրավունքի սերվերային ստուգումը։

     try {
          await insertResource(parsed.data);
     } catch {
          return { error: "Չհաջողվեց ստեղծել ռեսուրսը։" };
     }

     revalidatePath("/resources");
     return { success: true };
}

export async function editResource(id: string, values: ResourceFormValues): Promise<ResourceResult> {
     if (typeof id !== "string" || !id.trim()) {
          return { error: "Ռեսուրսի ID-ն պարտադիր է։" };
     }

     const parsed = resourceSchema.safeParse(values);
     if (!parsed.success) {
          console.error(parsed.error);
          return { error: "Ստուգեք լրացված դաշտերը։" }
     };

     // TODO: Այստեղ կանչիր ադմինի իրավունքի սերվերային ստուգումը։

     try {
          if (!(await updateResource(id, parsed.data))) {
               return { error: "Ռեսուրսը չի գտնվել։" };
          }
     } catch {
          return { error: "Չհաջողվեց պահպանել ռեսուրսը։" };
     }

     revalidatePath("/resources");
     return { success: true };
}

export async function removeResource(id: string): Promise<ResourceResult> {
     if (typeof id !== "string" || !id.trim()) {
          return { error: "Ռեսուրսի ID-ն պարտադիր է։" };
     }

     // TODO: Այստեղ կանչիր ադմինի իրավունքի սերվերային ստուգումը։

     try {
          if (!(await deleteResource(id))) {
               return { error: "Ռեսուրսը չի գտնվել։" };
          }
     } catch {
          return { error: "Չհաջողվեց ջնջել ռեսուրսը։" };
     }

     revalidatePath("/resources");
     return { success: true };
}