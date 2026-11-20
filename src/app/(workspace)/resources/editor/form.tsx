// resources/editor/form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createResource, editResource } from "@/actions/resource";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Resource } from "@/db/schema";
import { resourceSchema } from "@/lib/schemas";
import type { ResourceFormValues } from "@/lib/types/schema";

export default function ResourceEditorForm({ resource }: { resource?: Resource }) {
     const router = useRouter();
     const form = useForm<ResourceFormValues>({
          resolver: zodResolver(resourceSchema),
          defaultValues: {
               title: resource?.title ?? "",
               url: resource?.url ?? "",
               description: resource?.description ?? "",
               is_published: resource?.is_published ?? false,
          },
     });

     const { errors, isSubmitting } = form.formState;

     async function onSubmit(values: ResourceFormValues) {
          try {
               const result = resource
                    ? await editResource(resource.id, values)
                    : await createResource(values);

               if ("error" in result) {
                    toast.error(result.error);
                    return;
               }

               toast.success(resource ? "Ռեսուրսը պահպանվեց։" : "Ռեսուրսը ստեղծվեց։");
               router.push("/resources");
          } catch {
               toast.error("Չհաջողվեց պահպանել ռեսուրսը։");
          }
     }

     return (
          <div className="space-y-4">
               <div className="flex flex-wrap items-center justify-between gap-3">
                    <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                         {resource ? "Խմբագրել ռեսուրսը" : "Ստեղծել ռեսուրս"}
                    </h1>

                    <Button variant="outline" asChild>
                         <Link href="/resources">
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
                         <div className="grid gap-5 md:grid-cols-2">
                              <Field data-invalid={Boolean(errors.title)}>
                                   <FieldLabel htmlFor="title">Վերնագիր</FieldLabel>
                                   <Input
                                        id="title"
                                        aria-invalid={Boolean(errors.title)}
                                        {...form.register("title")}
                                   />
                                   {errors.title && <FieldError errors={[errors.title]} />}
                              </Field>

                              <Field data-invalid={Boolean(errors.url)}>
                                   <FieldLabel htmlFor="url">Հղում</FieldLabel>
                                   <Input
                                        id="url"
                                        type="url"
                                        placeholder="https://example.com"
                                        aria-invalid={Boolean(errors.url)}
                                        {...form.register("url")}
                                   />
                                   {errors.url && <FieldError errors={[errors.url]} />}
                              </Field>
                         </div>

                         <Field>
                              <FieldLabel htmlFor="description">Նկարագրություն</FieldLabel>
                              <Textarea id="description" rows={3} {...form.register("description")} />
                         </Field>

                         <Controller
                              control={form.control}
                              name="is_published"
                              render={({ field }) => (
                                   <Field orientation="horizontal">
                                        <Switch
                                             id={field.name}
                                             ref={field.ref}
                                             checked={field.value}
                                             onCheckedChange={field.onChange}
                                             onBlur={field.onBlur}
                                        />
                                        <FieldLabel htmlFor={field.name}>Հրապարակել</FieldLabel>
                                   </Field>
                              )}
                         />
                    </FieldGroup>

                    <div className="flex justify-end">
                         <Button type="submit" disabled={isSubmitting}>
                              {isSubmitting
                                   ? "Պահպանվում է…"
                                   : resource ? "Պահպանել" : "Ստեղծել"}
                         </Button>
                    </div>
               </form>
          </div>
     );
}