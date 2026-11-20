"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Plus, Save } from "lucide-react";
import Link from "next/link";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { questionSchema } from "@/lib/schemas";
import type { QuestionFormValues } from "@/lib/types/schema";
import { useTransition } from "react";
import { createQuestion } from "@/actions/questions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

type NamedOption = { id: string; name_hy: string };
type SpecialtyOption = NamedOption & { specialty_id: string };

type QuestionsEditorFormProps = {
     specialties: NamedOption[];
     sections: SpecialtyOption[];
     topics: SpecialtyOption[];
     initialValues?: QuestionFormValues;
};

const letters = ["Ա", "Բ", "Գ", "Դ"];

export default function QuestionsEditorForm({
     specialties,
     sections,
     topics,
     initialValues,
}: QuestionsEditorFormProps) {
     const router = useRouter();
     const [isSubmitting, startTransition] = useTransition();
     const form = useForm<QuestionFormValues>({
          resolver: zodResolver(questionSchema),
          defaultValues: initialValues ?? {
               specialty_id: "",
               section_id: "",
               topic_ids: [],
               number: 1,
               stem: "",
               options: letters.map((_, index) => ({ id: `o${index + 1}`, text: "" })),
               correct_option_id: "",
               explanation: "",
               note: "",
               sources: [],
               shuffle: true,
          },
     });
     const { fields: sources, append, remove } = useFieldArray({
          control: form.control,
          name: "sources",
     });
     const [specialtyId, options] = useWatch({
          control: form.control,
          name: ["specialty_id", "options"],
     });
     const { errors } = form.formState;
     const visibleSections = sections.filter((item) => item.specialty_id === specialtyId);
     const visibleTopics = topics.filter((item) => item.specialty_id === specialtyId);

     const onSubmit = (values: QuestionFormValues) => {
          startTransition(async() => {
               const res = await createQuestion(values);
               if(res.error) {
                    toast.error(res.error);
                    return;
               }
               if(res.success) {
                    form.reset();
                    router.push("/questions")
               }
          })
     }
     return (
          <div className="space-y-4">
               <div className="flex flex-wrap items-center justify-between gap-3">
                    <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                         {initialValues ? "Խմբագրել հարցը" : "Ստեղծել հարց"}
                    </h1>
                    <Button variant="outline" asChild>
                         <Link href="/questions">
                              <ChevronLeft />
                              Վերադառնալ
                         </Link>
                    </Button>
               </div>
               <form
                    noValidate
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-5 rounded-md border bg-card/60 p-4 shadow-sm backdrop-blur-sm"
               >
                    <FieldGroup className="gap-5">
                         <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                              <Controller
                                   control={form.control}
                                   name="specialty_id"
                                   render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                             <FieldLabel htmlFor={field.name}>Մասնագիտություն</FieldLabel>
                                             <Select
                                                  value={field.value}
                                                  onValueChange={(value) => {
                                                       if (value === field.value) return;
                                                       field.onChange(value);
                                                       form.setValue("section_id", "", { shouldDirty: true });
                                                       form.setValue("topic_ids", [], { shouldDirty: true });
                                                  }}
                                             >
                                                  <SelectTrigger
                                                       id={field.name}
                                                       ref={field.ref}
                                                       onBlur={field.onBlur}
                                                       aria-invalid={fieldState.invalid}
                                                       className="w-full"
                                                  >
                                                       <SelectValue placeholder="Ընտրեք մասնագիտությունը" />
                                                  </SelectTrigger>
                                                  <SelectContent>
                                                       {specialties.map((item) => (
                                                            <SelectItem key={item.id} value={item.id}>
                                                                 {item.name_hy}
                                                            </SelectItem>
                                                       ))}
                                                  </SelectContent>
                                             </Select>
                                             {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                   )}
                              />

                              <Controller
                                   control={form.control}
                                   name="section_id"
                                   render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                             <FieldLabel htmlFor={field.name}>Բաժին</FieldLabel>
                                             <Select
                                                  value={field.value}
                                                  onValueChange={field.onChange}
                                                  disabled={!specialtyId}
                                             >
                                                  <SelectTrigger
                                                       id={field.name}
                                                       ref={field.ref}
                                                       onBlur={field.onBlur}
                                                       aria-invalid={fieldState.invalid}
                                                       className="w-full"
                                                  >
                                                       <SelectValue placeholder="Ընտրեք բաժինը" />
                                                  </SelectTrigger>
                                                  <SelectContent>
                                                       {visibleSections.map((item) => (
                                                            <SelectItem key={item.id} value={item.id}>
                                                                 {item.name_hy}
                                                            </SelectItem>
                                                       ))}
                                                  </SelectContent>
                                             </Select>
                                             {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                   )}
                              />

                              <Field data-invalid={Boolean(errors.number)}>
                                   <FieldLabel htmlFor="number">Հարցի համարը</FieldLabel>
                                   <Input
                                        id="number"
                                        type="number"
                                        min={1}
                                        step={1}
                                        aria-invalid={Boolean(errors.number)}
                                        {...form.register("number", { valueAsNumber: true })}
                                   />
                                   {errors.number && <FieldError errors={[errors.number]} />}
                              </Field>
                         </div>

                         {visibleTopics.length > 0 && (
                              <Controller
                                   control={form.control}
                                   name="topic_ids"
                                   render={({ field }) => (
                                        <fieldset className="space-y-2">
                                             <legend className="text-sm font-medium">Թեմաներ</legend>
                                             <div className="flex flex-wrap gap-4">
                                                  {visibleTopics.map((topic) => (
                                                       <label key={topic.id} className="flex items-center gap-2 text-sm">
                                                            <input
                                                                 type="checkbox"
                                                                 checked={field.value.includes(topic.id)}
                                                                 onBlur={field.onBlur}
                                                                 onChange={(event) =>
                                                                      field.onChange(
                                                                           event.currentTarget.checked
                                                                                ? [...field.value, topic.id]
                                                                                : field.value.filter((id) => id !== topic.id),
                                                                      )
                                                                 }
                                                            />
                                                            {topic.name_hy}
                                                       </label>
                                                  ))}
                                             </div>
                                        </fieldset>
                                   )}
                              />
                         )}

                         <Field data-invalid={Boolean(errors.stem)}>
                              <FieldLabel htmlFor="stem">Հարցի տեքստը</FieldLabel>
                              <Textarea id="stem" rows={3} {...form.register("stem")} />
                              {errors.stem && <FieldError errors={[errors.stem]} />}
                         </Field>

                         <fieldset className="space-y-3">
                              <legend className="text-sm font-medium">
                                   Պատասխանների տարբերակներ և ճիշտ պատասխան
                              </legend>
                              {options.map((option, index) => {
                                   const error = errors.options?.[index]?.text;

                                   return (
                                        <Field key={option.id} data-invalid={Boolean(error)}>
                                             <div className="flex items-center gap-3">
                                                  <input
                                                       type="radio"
                                                       value={option.id}
                                                       aria-label={`${letters[index]} տարբերակը ճիշտ է`}
                                                       {...form.register("correct_option_id")}
                                                  />
                                                  <FieldLabel htmlFor={`option-${option.id}`}>
                                                       {letters[index]}
                                                  </FieldLabel>
                                                  <Input
                                                       id={`option-${option.id}`}
                                                       aria-invalid={Boolean(error)}
                                                       {...form.register(`options.${index}.text`)}
                                                  />
                                             </div>
                                             {error && <FieldError errors={[error]} />}
                                        </Field>
                                   );
                              })}
                              {errors.correct_option_id && (
                                   <FieldError errors={[errors.correct_option_id]} />
                              )}
                         </fieldset>

                         <Field data-invalid={Boolean(errors.explanation)}>
                              <FieldLabel htmlFor="explanation">Հիմնավորում</FieldLabel>
                              <Textarea id="explanation" rows={4} {...form.register("explanation")} />
                              {errors.explanation && <FieldError errors={[errors.explanation]} />}
                         </Field>

                         <Field>
                              <FieldLabel htmlFor="note">Նշում</FieldLabel>
                              <Textarea id="note" rows={2} {...form.register("note")} />
                         </Field>

                         <fieldset className="space-y-3">
                              <legend className="text-sm font-medium">Աղբյուրներ</legend>
                              {sources.map((source, index) => (
                                   <div key={source.id} className="grid items-start gap-3 md:grid-cols-[1fr_1fr_auto]">
                                        <Field>
                                             <FieldLabel htmlFor={`source-${index}-title`}>Անուն</FieldLabel>
                                             <Input
                                                  id={`source-${index}-title`}
                                                  {...form.register(`sources.${index}.title`)}
                                             />
                                             {errors.sources?.[index]?.title && (
                                                  <FieldError errors={[errors.sources[index].title]} />
                                             )}
                                        </Field>
                                        <Field>
                                             <FieldLabel htmlFor={`source-${index}-url`}>Հղում</FieldLabel>
                                             <Input
                                                  id={`source-${index}-url`}
                                                  type="url"
                                                  {...form.register(`sources.${index}.url`)}
                                             />
                                             {errors.sources?.[index]?.url && (
                                                  <FieldError errors={[errors.sources[index].url]} />
                                             )}
                                        </Field>
                                        <Button type="button" variant="outline" onClick={() => remove(index)}>
                                             Հեռացնել
                                        </Button>
                                   </div>
                              ))}
                              <Button
                                   type="button"
                                   variant="outline"
                                   onClick={() => append({ title: "", url: "" })}
                              >
                                   Ավելացնել աղբյուր
                              </Button>
                         </fieldset>

                         <Controller
                              control={form.control}
                              name="shuffle"
                              render={({ field }) => (
                                   <Field orientation="horizontal">
                                        <Switch
                                             id={field.name}
                                             checked={field.value}
                                             onCheckedChange={field.onChange}
                                             onBlur={field.onBlur}
                                             ref={field.ref}
                                        />
                                        <FieldLabel htmlFor={field.name}>Խառնել տարբերակները</FieldLabel>
                                   </Field>
                              )}
                         />
                    </FieldGroup>

                    {errors.root?.save && <FieldError errors={[errors.root.save]} />}
                    <div className="flex justify-end">
                         <Button type="submit" disabled={isSubmitting}>
                              {isSubmitting ? <Spinner/> : initialValues ? <Save/> : <Plus/>}
                              {isSubmitting ? "Խնդրում ենք սպասել․․․" : initialValues ? "Պահպանել" : "Ստեղծել"}
                         </Button>
                    </div>
               </form>
          </div>
     );
}