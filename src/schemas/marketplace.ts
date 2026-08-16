import z from "zod";

export const bookServiceSchema = z.object({
    pricingLabel: z.string().min(1, "Select a service"),
    date: z.date(),
    time: z.date(),
});

export type BookServiceFormValues = z.infer<typeof bookServiceSchema>;
