import z from "zod";
export const signUpSchema  = z.object({
    fullName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
});

export const signINSchema = z.object({
    email: z.string(),
    password: z.string().min(8),
})


export const mt5Schema = z.object({
    login: z.string().min(5, "Login must be at least 5 characters"),
    password: z.string().min(4, "Password is required"),
    server: z.string().min(3, "Server is required"),
  });
  
  export type Mt5FormData = z.infer<typeof mt5Schema>;