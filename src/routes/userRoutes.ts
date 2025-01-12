import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/UserController";
import { validateUserInput } from "../middleware/validationMiddleware";

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Mendapatkan daftar semua pengguna
 *     responses:
 *       200:
 *         description: Daftar pengguna
 */
router.get("/users", getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Mendapatkan data pengguna berdasarkan id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID pengguna
 *     responses:
 *       200:
 *         description: Data pengguna
 *       404:
 *         description: Pengguna tidak ditemukan
 */
router.get("/users/:id", getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Menambahkan pengguna baru
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Pengguna berhasil ditambahkan
 */
router.post("/users", validateUserInput, createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Memperbarui data pengguna berdasarkan id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID pengguna
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Pengguna berhasil diperbarui
 *       404:
 *         description: Pengguna tidak ditemukan
 */
router.put("/users/:id", validateUserInput, updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Menghapus pengguna berdasarkan id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID pengguna
 *     responses:
 *       200:
 *         description: Pengguna berhasil dihapus
 *       404:
 *         description: Pengguna tidak ditemukan
 */
router.delete("/users/:id", deleteUser);

export default router;
