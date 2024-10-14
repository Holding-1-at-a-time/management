// Unit tests for: getUser

import { AppError } from "@/lib/errors";
import { getUser } from "../users";

// getUser.test.ts
describe("getUser() getUser method", () => {
  let mockDb: any;
  let ctx: any;

  beforeEach(() => {
    mockDb = {
      query: jest.fn().mockReturnThis(),
      withIndex: jest.fn().mockReturnThis(),
      unique: jest.fn(),
    };
    ctx = { db: mockDb };
  });

  describe("Happy Path", () => {
    it("should return a user when a valid clerkId is provided", async () => {
      // Arrange
      const clerkId = "validClerkId";
      const expectedUser = { clerkId, email: "user@example.com" };
      mockDb.unique.mockResolvedValue(expectedUser);

      // Act
      const result = await getUser.handler(ctx, { clerkId });

      // Assert
      expect(mockDb.query).toHaveBeenCalledWith("users");
      expect(mockDb.withIndex).toHaveBeenCalledWith(
        "by_clerk_id",
        expect.any(Function),
      );
      expect(mockDb.unique).toHaveBeenCalled();
      expect(result).toEqual(expectedUser);
    });
  });

  describe("Edge Cases", () => {
    it("should throw an AppError with status 404 when the user is not found", async () => {
      // Arrange
      const clerkId = "nonExistentClerkId";
      mockDb.unique.mockResolvedValue(null);

      // Act & Assert
      await expect(getUser.handler(ctx, { clerkId })).rejects.toThrow(AppError);
      await expect(getUser.handler(ctx, { clerkId })).rejects.toThrow(
        "User not found",
      );
    });

    it("should propagate errors from the database query", async () => {
      // Arrange
      const clerkId = "validClerkId";
      const dbError = new Error("Database error");
      mockDb.unique.mockRejectedValue(dbError);

      // Act & Assert
      await expect(getUser.handler(ctx, { clerkId })).rejects.toThrow(dbError);
    });
  });
});

// End of unit tests for: getUser
