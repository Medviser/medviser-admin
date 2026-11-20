import { db } from "@/lib/drizzle";
import { cache } from "react";
import { resources } from "@/db/schema"
import { asc, eq } from "drizzle-orm";
import type { ResourceFormValues } from "@/lib/types/schema";

export const getResourceById = cache(async(id: string) => {
     const [resource] = await db.select().from(resources).where(eq(resources.id, id)).limit(1);
     return resource ?? null;
})
export const listResources = cache(async() => {
     return db.select().from(resources).orderBy(asc(resources.title), asc(resources.id)).limit(25) ?? []
})
export const insertResource = async(values: ResourceFormValues) => {
     const [inserted] = await db.insert(resources).values({
          ...values,
          description: values.description || null,
     }).returning({id: resources.id})
     return inserted?.id ?? null;
}
export const updateResource = async(id: string, values: ResourceFormValues) => {
     const [updated] = await db.update(resources).set({
          ...values,
          description: values.description || null,
     }).where(eq(resources.id,id)).returning({id: resources.id})
     return updated?.id ?? null;
}
export const deleteResource = async(id: string) => {
     const [deleted] = await db.delete(resources).where(eq(resources.id, id)).returning({ id: resources.id });
     return deleted?.id ?? null;
}