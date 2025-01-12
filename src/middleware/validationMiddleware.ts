import { Request, Response, NextFunction } from "express";
import { z } from "zod";

// Skema Zod untuk validasi input User
const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  age: z
    .number()
    .int()
    .min(18, "Age must be at least 18")
    .max(100, "Age must be less than or equal to 100"),
});

export const validateUserInput = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Validasi input menggunakan Zod
    userSchema.parse(req.body);
    next(); // Jika valid, lanjutkan ke endpoint berikutnya
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((e) => e.message); // Ambil pesan kesalahan
      res.status(400).json({ errors });
    } else {
      res.status(500).json({ error: "Terjadi kesalahan" });
    }
  }
};
