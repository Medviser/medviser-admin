import { asc, eq } from "drizzle-orm";
import { specialties, topics } from "@/db/schema";
import { db } from "@/lib/drizzle";
import type { TopicFormValues } from "@/lib/types/schema";

export function getTopics() {
     return db.select({
          id: topics.id,
          name_hy: topics.name_hy,
          specialty_name: specialties.name_hy,
     })
     .from(topics)
     .innerJoin(specialties, eq(topics.specialty_id, specialties.id))
     .orderBy(
          asc(specialties.sort_order),
          asc(specialties.name_hy),
          asc(topics.name_hy),
          asc(topics.id),
     );
}

export async function getTopicById(id: string) {
     const [topic] = await db.select().from(topics).where(eq(topics.id, id)).limit(1);
     return topic ?? null;
}

export function getTopicSpecialtyOptions() {
     return db.select({ id: specialties.id, name_hy: specialties.name_hy }).from(specialties).orderBy(asc(specialties.sort_order), asc(specialties.name_hy));
}

export async function insertTopic(values: TopicFormValues) {
     const [inserted] = await db.insert(topics).values(values).returning({id: topics.id});
     return inserted?.id ?? null
}

export async function updateTopic(id: string, name_hy: string) {
     const [updated] = await db.update(topics).set({ name_hy }).where(eq(topics.id, id)).returning({ id: topics.id });
     return updated?.id ?? null;
}

export async function deleteTopic(id: string) {
     const [deleted] = await db.delete(topics).where(eq(topics.id, id)).returning({ id: topics.id });
     return deleted?.id ?? null;
}