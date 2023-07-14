const request = require("supertest");
const app = require("../index"); // Assuming this is your Express app
const users = require("../userData");

describe("User API", () => {
  // Test the GET /api/users endpoint
  describe("GET /api/users", () => {
    it("should return all users", async () => {
      const response = await request(app).get("/api/users");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(users);
    });
  });

  // Test the GET /api/users/:userID endpoint
  describe("GET /api/users/:userID", () => {
    it("should return the user with the specified ID", async () => {
      const userID = 1; // Assuming there is a user with ID 1
      const response = await request(app).get(`/api/users/${userID}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(userID);
    });

    it("should return 404 if the user is not found", async () => {
      const userID = 999; // Assuming there is no user with ID 999
      const response = await request(app).get(`/api/users/${userID}`);
      expect(response.status).toBe(404);
      expect(response.text).toBe("User not found");
    });
  });

  // Test the POST /api/users endpoint
  describe("POST /api/users", () => {
    it("should create a new user", async () => {
      const newUser = { name: "John Doe" };
      const response = await request(app).post("/api/users").send(newUser);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.name).toBe(newUser.name);
    });
  });

  // Test the PUT /api/users/:userID endpoint
  describe("PUT /api/users/:userID", () => {
    it("should update the user with the specified ID", async () => {
      const userID = 1; // Assuming there is a user with ID 1
      const updatedUser = { name: "Updated Name" };
      const response = await request(app)
        .put(`/api/users/${userID}`)
        .send(updatedUser);
      expect(response.status).toBe(200);
      expect(response.body).toBe("User updated");
    });

    it("should return 404 if the user is not found", async () => {
      const userID = 999; // Assuming there is no user with ID 999
      const updatedUser = { name: "Updated Name" };
      const response = await request(app)
        .put(`/api/users/${userID}`)
        .send(updatedUser);
      expect(response.status).toBe(404);
      expect(response.text).toEqual("User not found");
    });
  });

  // Test the DELETE /api/users/:userID endpoint
  describe("DELETE /api/users/:userID", () => {
    it("should delete the user with the specified ID", async () => {
      const userID = 1; // Assuming there is a user with ID 1
      const response = await request(app).delete(`/api/users/${userID}`);
      expect(response.status).toBe(200);
      expect(response.body).toBe("User deleted");
    });

    it("should return 404 if the user is not found", async () => {
      const userID = 999; // Assuming there is no user with ID 999
      const response = await request(app).delete(`/api/users/${userID}`);
      expect(response.status).toBe(404);
      expect(response.text).toEqual("User not found");
    });
  });
});
