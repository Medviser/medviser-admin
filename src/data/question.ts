import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/drizzle";
import { questions, questionTopics, sections, specialties, topics } from "@/db/schema";
import type { QuestionFormValues } from "@/lib/types/schema";
import { createId } from "@paralleldrive/cuid2";
import { cache } from "react";

export const getQuestionEditorOptions = cache(async() => {
     const [specialtyOptions, sectionOptions, topicOptions] = await Promise.all([
          db.select({
               id: specialties.id,
               name_hy: specialties.name_hy,
          }).from(specialties).orderBy(asc(specialties.sort_order), asc(specialties.name_hy)),
          db.select({
               id: sections.id,
               name_hy: sections.name_hy,
               specialty_id: sections.specialty_id,
          }).from(sections).orderBy(asc(sections.sort_order), asc(sections.name_hy)),
          db.select({
               id: topics.id,
               name_hy: topics.name_hy,
               specialty_id: topics.specialty_id,
          }).from(topics).orderBy(asc(topics.name_hy)),
     ]);
     return {
          specialties: specialtyOptions,
          sections: sectionOptions,
          topics: topicOptions,
     };
})
export async function insertQuestion(values: QuestionFormValues) {
     const { topic_ids, ...question } = values;
     const id = createId();
     const insert = db.insert(questions).values({ ...question, id });
     const links = [...new Set(topic_ids)].map((topicId) => ({
          question_id: id,
          topic_id: topicId,
     }));
     if (links.length === 0) {
          await insert;
     } else {
          await db.batch([insert, db.insert(questionTopics).values(links)]);
     }
     return id;
}
export async function updateQuestion(id: string, values: QuestionFormValues) {
     const { topic_ids, ...question } = values;
     const update = db.update(questions).set(question).where(eq(questions.id, id)).returning({ id: questions.id });
     const deleteLinks = db.delete(questionTopics).where(eq(questionTopics.question_id, id));
     const links = [...new Set(topic_ids)].map((topicId) => ({
          question_id: id,
          topic_id: topicId,
     }));
     const [updated] = links.length === 0 ? await db.batch([update, deleteLinks]) : await db.batch([
          update,
          deleteLinks,
          db.insert(questionTopics).values(links),
     ]);
     if (updated.length === 0) throw new Error("Հարցը չի գտնվել։");
     return updated[0].id;
}