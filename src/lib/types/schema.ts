import type * as z from "zod";
import type { loginSchema, questionSchema, specialtySchema } from "../schemas";

export type SpecialtyFormValues = z.input<typeof specialtySchema>;
export type SpecialtyFormData = z.output<typeof specialtySchema>;

export type LoginFormValues = z.infer<typeof loginSchema>;
export type QuestionFormValues = z.infer<typeof questionSchema>;