import z from "zod";

export const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const signupMethodSchema = z.enum(["email", "phone"]);
export type SignupMethod = z.infer<typeof signupMethodSchema>;

export const signupSchema = z
    .object({
        method: signupMethodSchema,
        identifier: z.string().min(1, "This field is required"),
    })
    .refine(
        (data) =>
            data.method === "phone" ||
            z.string().email().safeParse(data.identifier).success,
        { message: "Enter a valid email address", path: ["identifier"] }
    );

export type SignupFormValues = z.infer<typeof signupSchema>;

export const otpSchema = z.object({
    code: z.string().length(6, "Enter the 6-digit code"),
});

export type OtpFormValues = z.infer<typeof otpSchema>;

export const forgotPasswordSchema = z.object({
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const newPasswordSchema = z
    .object({
        newPassword: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export type NewPasswordFormValues = z.infer<typeof newPasswordSchema>;
