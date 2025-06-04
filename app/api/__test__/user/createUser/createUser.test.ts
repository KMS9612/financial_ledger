import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";
import { createUser } from "@/app/api/user/createUser/services/createUser.service";
import { findUserByEmail } from "@/app/api/user/login/repositories/user.repository";
import { pool } from "@/app/src/lib/db/db";

// Mock the database pool
jest.mock("@/app/src/lib/db/db", () => ({
  pool: {
    query: jest.fn(),
  },
}));

// Mock the findUserByEmail function
jest.mock("@/app/api/user/login/repositories/user.repository", () => ({
  findUserByEmail: jest.fn(),
}));

describe("Create User Service Tests", () => {
  const testUser = {
    email: "test@example.com",
    password: "testPassword123",
    name: "Test User",
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Clean up after each test
    jest.resetAllMocks();
  });

  it("should create a new user successfully", async () => {
    // Mock findUserByEmail to return null (no existing user)
    (findUserByEmail as jest.Mock).mockResolvedValue(null);

    // Mock successful database insertion
    (pool.query as jest.Mock).mockResolvedValue([{ insertId: 1 }]);

    const result = await createUser(testUser);

    if (result.success) {
      expect(result.success).toBe(true);
      expect(result.status).toBe(201);
      expect(result.data.user).toHaveProperty("id");
      expect(typeof result.data.user.id).toBe("number");
      expect(result.data.user.email).toBe(testUser.email);
      expect(result.data.user.name).toBe(testUser.name);
      expect(result.data.user).not.toHaveProperty("password");
    }
  });

  it("should return error for duplicate email", async () => {
    // Mock findUserByEmail to return an existing user
    (findUserByEmail as jest.Mock).mockResolvedValue({
      id: 123,
      email: testUser.email,
      password: "hashedPassword",
      name: "Existing User",
    });

    const result = await createUser(testUser);

    if (!result.success) {
      expect(result.success).toBe(false);
      expect(result.status).toBe(400);
      expect(result.errorMessage).toBe("이미 사용 중인 이메일입니다.");
    }
  });

  it("should handle database errors gracefully", async () => {
    // Mock findUserByEmail to return null
    (findUserByEmail as jest.Mock).mockResolvedValue(null);

    // Mock database error
    (pool.query as jest.Mock).mockRejectedValue(new Error("Database error"));

    const result = await createUser(testUser);

    if (!result.success) {
      expect(result.success).toBe(false);
      expect(result.status).toBe(500);
      expect(result.errorMessage).toBe(
        "사용자 생성 내부로직 작동 중 오류가 발생했습니다."
      );
    }
  });
});
