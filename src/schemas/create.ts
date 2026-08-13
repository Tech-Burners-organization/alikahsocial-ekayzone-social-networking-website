import z from "zod";

export const createProductSchema = z.object({
    title: z.string().min(1, "Product title is required"),
    sellingPrice: z.string().min(1, "Selling price is required"),
    discountPrice: z.string().optional(),
    description: z.string().optional(),
    category: z.string().min(1, "Select a category"),
    stockQuantity: z.string().min(1, "Stock quantity is required"),
    images: z.array(z.any()).optional(),
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;

export const createServiceSchema = z.object({
    title: z.string().min(1, "Service title is required"),
    price: z.string().min(1, "Service price is required"),
    additionalPrices: z.array(z.object({ value: z.string().min(1, "Price is required") })).optional(),
    description: z.string().optional(),
    category: z.string().min(1, "Select a category"),
    images: z.array(z.any()).optional(),
});

export type CreateServiceFormValues = z.infer<typeof createServiceSchema>;

export const goLiveSchema = z.object({
    streamTitle: z.string().min(1, "Stream title is required"),
    category: z.string().min(1, "Select a category"),
    promoteListing: z.string().optional(),
    privacy: z.enum(["public", "followers-only"]),
});

export type GoLiveFormValues = z.infer<typeof goLiveSchema>;

export const streamSummarySchema = z.object({
    duration: z.string().optional(),
    peakViewers: z.number().optional(),
    totalViewers: z.number().optional(),
    likes: z.number().optional(),
    comments: z.number().optional(),
    shares: z.number().optional(),
});

export type StreamSummaryFormValues = z.infer<typeof streamSummarySchema>;
