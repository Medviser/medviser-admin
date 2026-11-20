import { specialties } from "@/db/schema";
import { db } from "@/lib/drizzle";
import type { SpecialtyFormData } from "@/lib/types/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const getSpecialtyById = cache(async (id: string) => {
     const [specialty] = await db
          .select()
          .from(specialties)
          .where(eq(specialties.id, id))
          .limit(1);

     return specialty ?? null;
});
export const getSpecialtyBySlug = cache(async (slug: string) => {
     const [specialty] = await db
          .select()
          .from(specialties)
          .where(eq(specialties.slug, slug))
          .limit(1);

     return specialty ?? null;
});
export const insertSpecialty = async(values: SpecialtyFormData) => {
     const [inserted] = await db.insert(specialties).values(values).returning({id: specialties.id})
     return inserted?.id ?? null;
}
export const updateSpecialty = async(id: string, values: SpecialtyFormData) => {
     const [updated] = await db.update(specialties).set(values).where(eq(specialties.id,id)).returning({id: specialties.id})
     return updated?.id ?? null;
}
export const listSpecialties = cache(async() => {
     return db.select().from(specialties) ?? []
})
export const deleteSpecialty = async(id: string) => {
     const [deleted] = await db.delete(specialties).where(eq(specialties.id, id)).returning({ id: specialties.id });
     return deleted?.id ?? null;
}