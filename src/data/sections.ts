import { asc, eq } from "drizzle-orm";
import { sections, specialties } from "@/db/schema";
import { db } from "@/lib/drizzle";
import type { SectionFormValues } from "@/lib/types/schema";

export function getSections() {
     return db.select({
          id: sections.id,
          name_hy: sections.name_hy,
          sort_order: sections.sort_order,
          specialty: specialties.name_hy,
     }).from(sections).innerJoin(specialties, eq(sections.specialty_id, specialties.id)).orderBy(asc(specialties.sort_order), asc(sections.sort_order), asc(sections.id));
}

export async function getSectionById(id: string) {
     const [section] = await db.select().from(sections).where(eq(sections.id, id)).limit(1);
     return section ?? null;
}

export function insertSection(values: SectionFormValues) {
     return db.insert(sections).values(values);
}

export async function updateSection(id: string, values: SectionFormValues) {
     const [updated] = await db.update(sections).set(values).where(eq(sections.id, id)).returning({ id: sections.id });
     return updated?.id ?? null;
}

export async function deleteSection(id: string) {
     const [deleted] = await db.delete(sections).where(eq(sections.id, id)).returning({ id: sections.id });
     return deleted?.id ?? null;
}