// Unit tests for: createOrUpdateUser

import { AppError } from "@/lib/errors";
import { createOrUpdateUser } from "../users";

describe("createOrUpdateUser() createOrUpdateUser method", () => {
  let mockCtx: any;

  beforeEach(() => {
    // Mock the database context
    mockCtx = {
      db: {
        query: jest.fn(),
        patch: jest.fn(),
        insert: jest.fn(),
      },
    };
  });

  describe("Happy Path", () => {
    it("should create a new user when no existing user is found", async () => {
      // Arrange
      const args = {
        jwt: {
          aud: "test-audience",
          name: "John Doe",
          email: "john.doe@example.com",
          first_name: "John",
          session_id: "session123",
          updated_at: "2024-09-25T13:32:37Z",
          external_id: "external123",
          clerk_user_id: "clerk123",
          email_verified: true,
          two_factor_enabled: false,
        },
      };

      mockCtx.db.query.mockResolvedValueOnce(null); // No existing user
      mockCtx.db.insert.mockResolvedValueOnce("newUserId");

      // Act
      const result = await createOrUpdateUser.handler(mockCtx, args);

      // Assert
      expect(result).toBe("newUserId");
      expect(mockCtx.db.insert).toHaveBeenCalledWith(
        "users",
        expect.objectContaining({
          clerkId: "clerk123",
          email: "john.doe@example.com",
          firstName: "John",
          lastName: "Doe",
        }),
      );
    });

    it("should update an existing user when found", async () => {
      // Arrange
      const args = {
        jwt: {
          aud: "test-audience",
          name: "Jane Doe",
          email: "jane.doe@example.com",
          first_name: "Jane",
          session_id: "session456",
          updated_at: "2024-09-25T13:32:37Z",
          external_id: "external456",
          clerk_user_id: "clerk456",
          email_verified: true,
          two_factor_enabled: true,
        },
      };

      const existingUser = { _id: "existingUserId" };
      mockCtx.db.query.mockResolvedValueOnce(existingUser);

      // Act
      const result = await createOrUpdateUser.handler(mockCtx, args);

      // Assert
      expect(result).toBe("existingUserId");
      expect(mockCtx.db.patch).toHaveBeenCalledWith(
        "existingUserId",
        expect.objectContaining({
          clerkId: "clerk456",
          email: "jane.doe@example.com",
          firstName: "Jane",
          lastName: "Doe",
        }),
      );
    });
  });

  describe("Edge Cases", () => {
    it("should handle missing optional fields gracefully", async () => {
      // Arrange
      const args = {
        jwt: {
          aud: "test-audience",
          name: "John Smith",
          email: "john.smith@example.com",
          first_name: "John",
          session_id: "session789",
          updated_at: "2024-09-25T13:32:37Z",
          external_id: "external789",
          clerk_user_id: "clerk789",
          email_verified: false,
          two_factor_enabled: false,
        },
      };

      mockCtx.db.query.mockResolvedValueOnce(null);
      mockCtx.db.insert.mockResolvedValueOnce("newUserId");

      // Act
      const result = await createOrUpdateUser.handler(mockCtx, args);

      // Assert
      expect(result).toBe("newUserId");
      expect(mockCtx.db.insert).toHaveBeenCalledWith(
        "users",
        expect.objectContaining({
          clerkId: "clerk789",
          email: "john.smith@example.com",
          firstName: "John",
          lastName: "Smith",
          phoneVerified: false, // Default value
        }),
      );
    });

    it("should throw an AppError if database query fails", async () => {
      // Arrange
      const args = {
        jwt: {
          aud: "test-audience",
          name: "Error User",
          email: "error.user@example.com",
          first_name: "Error",
          session_id: "sessionError",
          updated_at: "2024-09-25T13:32:37Z",
          external_id: "externalError",
          clerk_user_id: "clerkError",
          email_verified: true,
          two_factor_enabled: true,
        },
      };

      mockCtx.db.query.mockRejectedValueOnce(new Error("Database error"));

      // Act & Assert
      await expect(createOrUpdateUser.handler(mockCtx, args)).rejects.toThrow(
        AppError,
      );
    });
  });
});

// End of unit tests for: createOrUpdateUser
