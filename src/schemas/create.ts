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

export const editProfileSchema = z.object({
    displayName: z.string().min(1, "Display name is required"),
    userName: z.string().min(1, "Username is required"),
    dateOfBirth: z.date({ error: "Date of birth is required" }),
    gender: z.string().min(1, "Select a gender"),
    bio: z.string().optional(),
});

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;

export const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, "Current password is required"),
        newPassword: z.string().min(8, "Use at least 8 characters"),
        confirmPassword: z.string().min(1, "Confirm your new password"),
    })
    .refine((values) => values.newPassword === values.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export const phoneEmailSchema = z.object({
    email: z.email("Enter a valid email address"),
    phone: z.string().min(1, "Phone number is required"),
});

export type PhoneEmailFormValues = z.infer<typeof phoneEmailSchema>;

export const contactSupportSchema = z.object({
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(1, "Describe your issue"),
    screenshot: z.array(z.any()).optional(),
});

export type ContactSupportFormValues = z.infer<typeof contactSupportSchema>;

export const feedbackSchema = z.object({
    sentiment: z.string().min(1, "Pick how you feel"),
    message: z.string().min(1, "Tell us what you think"),
    screenshot: z.array(z.any()).optional(),
});

export type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export const streamSummarySchema = z.object({
    duration: z.string().optional(),
    peakViewers: z.number().optional(),
    totalViewers: z.number().optional(),
    likes: z.number().optional(),
    comments: z.number().optional(),
    shares: z.number().optional(),
});

export type StreamSummaryFormValues = z.infer<typeof streamSummarySchema>;
