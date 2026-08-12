import z from "zod";

export const deliveryDetailsSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    phone: z.string().min(1, "Phone number is required"),
    streetAddress1: z.string().min(1, "Street address is required"),
    streetAddress2: z.string(),
    city: z.string().min(1, "City is required"),
    province: z.string().min(1, "Province is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    note: z.string(),
});

export type DeliveryDetailsFormValues = z.infer<typeof deliveryDetailsSchema>;
