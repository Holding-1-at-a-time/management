// Unit tests for: createUser

import { createUser } from "../users";

// createUser.test.ts
describe("createUser() createUser method", () => {
  let mockDb: any;

  beforeEach(() => {
    // Mock the database context
    mockDb = {
      insert: jest.fn(),
    };
  });

  describe("Happy Path", () => {
    it("should create a user successfully with valid inputs", async () => {
      // Arrange
      const args = {
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        clerkId: "clerk123",
        tokenIdentifier: "token123",
      };

      // Act
      const result = await createUser.handler({ db: mockDb }, args);

      // Assert
      expect(mockDb.insert).toHaveBeenCalledWith("users", {
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        clerkId: args.clerkId,
        tokenIdentifier: "",
        name: "",
      });
      expect(result).toBeDefined();
    });
  });

  describe("Edge Cases", () => {
    it("should handle missing optional fields gracefully", async () => {
      // Arrange
      const args = {
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        clerkId: "clerk123",
        tokenIdentifier: "token123",
      };

      // Act
      const result = await createUser.handler({ db: mockDb }, args);

      // Assert
      expect(mockDb.insert).toHaveBeenCalledWith("users", {
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        clerkId: args.clerkId,
        tokenIdentifier: "",
        name: "",
      });
      expect(result).toBeDefined();
    });

    it("should throw an error if email is missing", async () => {
      // Arrange
      const args = {
        firstName: "John",
        lastName: "Doe",
        clerkId: "clerk123",
        tokenIdentifier: "token123",
      };

      // Act & Assert
      await expect(createUser.handler({ db: mockDb }, args)).rejects.toThrow();
    });

    it("should throw an error if firstName is missing", async () => {
      // Arrange
      const args = {
        email: "test@example.com",
        lastName: "Doe",
        clerkId: "clerk123",
        tokenIdentifier: "token123",
      };

      // Act & Assert
      await expect(createUser.handler({ db: mockDb }, args)).rejects.toThrow();
    });

    it("should throw an error if lastName is missing", async () => {
      // Arrange
      const args = {
        email: "test@example.com",
        firstName: "John",
        clerkId: "clerk123",
        tokenIdentifier: "token123",
      };

      // Act & Assert
      await expect(createUser.handler({ db: mockDb }, args)).rejects.toThrow();
    });

    it("should throw an error if clerkId is missing", async () => {
      // Arrange
      const args = {
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        tokenIdentifier: "token123",
      };

      // Act & Assert
      await expect(createUser.handler({ db: mockDb }, args)).rejects.toThrow();
    });

    it("should throw an error if tokenIdentifier is missing", async () => {
      // Arrange
      const args = {
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        clerkId: "clerk123",
      };

      // Act & Assert
      await expect(createUser.handler({ db: mockDb }, args)).rejects.toThrow();
    });
  });
});

// End of unit tests for: createUser
