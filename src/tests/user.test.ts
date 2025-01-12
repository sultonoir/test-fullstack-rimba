import request from "supertest";
import { app, server } from "../index"; // Mengimpor server untuk ditutup setelah pengujian

describe("User API", () => {
  let userId: string;

  // Test GET /users
  it("should fetch all users", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test POST /users
  it("should create a new user", async () => {
    const newUser = {
      name: "John Doe",
      email: "john.doe@example.com",
      age: 30,
    };

    const response = await request(app)
      .post("/users")
      .send(newUser)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(201);
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
    expect(response.body.age).toBe(newUser.age);
    userId = response.body.id; // Menyimpan ID untuk pengujian lainnya
  });

  // Test GET /users/:id
  it("should fetch a user by ID", async () => {
    const response = await request(app).get(`/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(userId);
    expect(response.body.name).toBe("John Doe");
  });

  // Test PUT /users/:id
  it("should update a user by ID", async () => {
    const updatedUser = {
      name: "John Updated",
      email: "john.updated@example.com",
      age: 35,
    };

    const response = await request(app)
      .put(`/users/${userId}`)
      .send(updatedUser)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedUser.name);
    expect(response.body.email).toBe(updatedUser.email);
    expect(response.body.age).toBe(updatedUser.age);
  });

  // Test DELETE /users/:id
  it("should delete a user by ID", async () => {
    const response = await request(app).delete(`/users/${userId}`);
    expect(response.status).toBe(200); // Status 200 jika berhasil
    expect(response.body.message).toBe("User deleted successfully");
  });

  // Menutup server setelah pengujian selesai
  afterAll(() => {
    server.close();
  });
});
