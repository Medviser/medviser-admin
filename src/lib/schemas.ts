import * as z from "zod";

export const NO_SPONSOR = "none";

const sponsorUntilSchema = z.string({ error: "Մուտքագրեք վավերական ամսաթիվ և ժամ։" }).trim().refine((value) =>value === "" || z.iso.datetime({ local: true }).safeParse(value).success, {
     error: "Մուտքագրեք վավերական ամսաթիվ և ժամ։"
}).transform((value) => {
     if (value === "") return null;
     return new Date(value.endsWith("Z") ? value : `${value}Z`);
});
const emailSchema = z.email();
const phonePattern = /^\+?[0-9]{7,15}$/;

export const loginSchema = z.object({
     identifier: z.string().trim().refine((value) =>
          emailSchema.safeParse(value).success || phonePattern.test(value),
          "Մուտքագրեք վավեր էլ․ փոստի հասցե կամ հեռախոսահամար։",
     ),
     password: z.string().min(1, "Մուտքագրեք գաղտնաբառը։").max(8,"Գաղնաբառը 8 նիշից ավել է"),
     rememberMe: z.boolean(),
});

export const specialtySchema = z.object({
     name_hy: z.string({ error: "Մուտքագրեք մասնագիտության անունը։" }).trim().min(1, "Մուտքագրեք մասնագիտության անունը։"),
     slug: z.string({ error: "Մուտքագրեք հասցեի անվանումը։" }).trim().min(1, "Մուտքագրեք հասցեի անվանումը։").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,"Օգտագործեք փոքրատառ լատինատառեր, թվեր և դրանց միջև գծիկներ։",),
     sort_order: z.number({ error: "Մուտքագրեք հերթականության համարը։" }).int("Հերթականության համարը պետք է ամբողջ թիվ լինի։").min(-2147483648, "Հերթականության համարը թույլատրելի միջակայքից դուրս է։").max(2147483647, "Հերթականության համարը թույլատրելի միջակայքից դուրս է։"),
     sponsor_id: z.string({ error: "Ընտրեք հովանավոր։" }).trim().transform((value) =>value === NO_SPONSOR || value === "" ? null : value),
     sponsor_until: sponsorUntilSchema,
     is_published: z.boolean({
          error: "Նշեք հրապարակման կարգավիճակը։",
     }),
})
.refine(
     ({ sponsor_id, sponsor_until }) =>sponsor_until === null || sponsor_id !== null,{
          path: ["sponsor_until"],
          error: "Ժամկետ սահմանելու համար նախ ընտրեք հովանավոր։",
     },
);