import { describe, it, expect, beforeEach, afterEach } from "@jest/globals";
import { validateUser } from "@/app/api/user/login/services/validate.service";
import { findUserByEmail } from "@/app/api/user/login/repositories/user.repository";
import { validatePassword } from "@/app/api/common/services/password.service";
import { ApiResponse } from "@/app/api/common/utils/apiResponse";
import { User } from "@/app/api/common/types/user.types";

// Mock the findUserByEmail function
jest.mock("@/app/api/user/login/repositories/user.repository", () => ({
  findUserByEmail: jest.fn(),
}));

// Mock the validatePassword function
jest.mock("@/app/api/common/services/password.service", () => ({
  validatePassword: jest.fn(),
}));

describe("Login Service Tests", () => {
  const testUser = {
    email: "test@example.com",
    password: "testPassword123",
  };

  const mockUser = {
    id: 1,
    email: "test@example.com",
    password: "hashedPassword",
    name: "Test User",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should validate user successfully", async () => {
    // Mock findUserByEmail to return a user
    (findUserByEmail as jest.Mock).mockResolvedValue(mockUser);

    // Mock validatePassword to return true
    (validatePassword as jest.Mock).mockResolvedValue(true);

    const result = await validateUser(testUser.email, testUser.password);

    expect(result.success).toBe(true);
    expect(result.status).toBe(200);
    if (result.success) {
      expect(result.data?.user).toBeDefined();
      expect(result.data?.user.email).toBe(testUser.email);
      expect(result.data?.user).not.toHaveProperty("password");
    }
  });

  it("should return error when user not found", async () => {
    // Mock findUserByEmail to return null
    (findUserByEmail as jest.Mock).mockResolvedValue(null);

    const result = await validateUser(testUser.email, testUser.password);

    expect(result.success).toBe(false);
    expect(result.status).toBe(401);
    if (!result.success) {
      expect(result.errorMessage).toBe(
        "이메일 또는 비밀번호가 올바르지 않습니다."
      );
    }
  });

  it("should return error when password is invalid", async () => {
    // Mock findUserByEmail to return a user
    (findUserByEmail as jest.Mock).mockResolvedValue(mockUser);

    // Mock validatePassword to return false
    (validatePassword as jest.Mock).mockResolvedValue(false);

    const result = await validateUser(testUser.email, testUser.password);

    expect(result.success).toBe(false);
    expect(result.status).toBe(401);
    if (!result.success) {
      expect(result.errorMessage).toBe(
        "이메일 또는 비밀번호가 올바르지 않습니다."
      );
    }
  });
});
