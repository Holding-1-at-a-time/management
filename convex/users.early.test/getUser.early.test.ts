// Unit tests for: getUser

import { getUser } from "../users";

describe("getUser() getUser method", () => {
  let mockCtx: any;

  beforeEach(() => {
    // Mock the context and its methods
    mockCtx = {
      db: {
        query: jest.fn().mockReturnThis(),
        withIndex: jest.fn().mockReturnThis(),
        first: jest.fn(),
      },
    };
  });

  describe("Happy Path", () => {
    it("should return the user when a valid clerkId is provided", async () => {
      // Arrange
      const mockUser = { id: "user123", clerkId: "clerk123" };
      mockCtx.db.first.mockResolvedValue(mockUser);

      // Act
      const result = await getUser.handler(mockCtx, { clerkId: "clerk123" });

      // Assert
      expect(mockCtx.db.query).toHaveBeenCalledWith("users");
      expect(mockCtx.db.withIndex).toHaveBeenCalledWith(
        "by_clerk_id",
        expect.any(Function),
      );
      expect(mockCtx.db.first).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });
  });

  describe("Edge Cases", () => {
    it("should throw an error if the user is not found", async () => {
      // Arrange
      mockCtx.db.first.mockResolvedValue(null);

      // Act & Assert
      await expect(
        getUser.handler(mockCtx, { clerkId: "nonexistent" }),
      ).rejects.toThrow("User not found");
    });

    it("should handle case where clerkId is an empty string", async () => {
      // Arrange
      mockCtx.db.first.mockResolvedValue(null);

      // Act & Assert
      await expect(getUser.handler(mockCtx, { clerkId: "" })).rejects.toThrow(
        "User not found",
      );
    });

    it("should handle case where clerkId is undefined", async () => {
      // Arrange
      mockCtx.db.first.mockResolvedValue(null);

      // Act & Assert
      await expect(
        getUser.handler(mockCtx, { clerkId: undefined as unknown as string }),
      ).rejects.toThrow("User not found");
    });
  });
});

// End of unit tests for: getUser
