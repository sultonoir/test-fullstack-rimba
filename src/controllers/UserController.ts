import { Request, Response } from "express";
import db from "../db";

// GET /users - Mendapatkan semua user
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await db.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan" });
  }
};

// GET /users/:id - Mendapatkan user berdasarkan id
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan" });
  }
};

// POST /users - Menambahkan user baru
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, age } = req.body;
  try {
    const newUser = await db.user.create({
      data: {
        name,
        email,
        age,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Email sudah digunakan" });
  }
};

// PUT /users/:id - Memperbarui data user
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const user = await db.user.update({
      where: { id },
      data: {
        name,
        email,
        age,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Data tidak valid" });
  }
};

// DELETE /users/:id - Menghapus user
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await db.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan" });
  }
};
