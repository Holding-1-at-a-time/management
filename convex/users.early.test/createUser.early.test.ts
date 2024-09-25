
// Unit tests for: createUser


import { createUser } from '../users';


// Mocking the context and database
const mockCtx = {
  db: {
    insert: jest.fn(),
  },
};

describe('createUser() createUser method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy Path', () => {
    it('should create a user with valid inputs', async () => {
      // Arrange
      const args = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        clerkId: 'clerk123',
        tokenIdentifier: 'token123',
      };
      const expectedUserData = {
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        clerkId: args.clerkId,
        tokenIdentifier: '',
        name: '',
      };
      mockCtx.db.insert.mockResolvedValue({ _id: 'user123' });

      // Act
      const result = await createUser.handler(mockCtx, args);

      // Assert
      expect(mockCtx.db.insert).toHaveBeenCalledWith('users', expectedUserData);
      expect(result).toEqual({ _id: 'user123' });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty strings for optional fields', async () => {
      // Arrange
      const args = {
        email: 'test@example.com',
        firstName: '',
        lastName: '',
        clerkId: 'clerk123',
        tokenIdentifier: 'token123',
      };
      const expectedUserData = {
        email: args.email,
        firstName: '',
        lastName: '',
        clerkId: args.clerkId,
        tokenIdentifier: '',
        name: '',
      };
      mockCtx.db.insert.mockResolvedValue({ _id: 'user123' });

      // Act
      const result = await createUser.handler(mockCtx, args);

      // Assert
      expect(mockCtx.db.insert).toHaveBeenCalledWith('users', expectedUserData);
      expect(result).toEqual({ _id: 'user123' });
    });

    it('should throw an error if email is missing', async () => {
      // Arrange
      const args = {
        email: '',
        firstName: 'John',
        lastName: 'Doe',
        clerkId: 'clerk123',
        tokenIdentifier: 'token123',
      };

      // Act & Assert
      await expect(createUser.handler(mockCtx, args)).rejects.toThrow();
    });

    it('should throw an error if clerkId is missing', async () => {
      // Arrange
      const args = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        clerkId: '',
        tokenIdentifier: 'token123',
      };

      // Act & Assert
      await expect(createUser.handler(mockCtx, args)).rejects.toThrow();
    });
  });
});

// End of unit tests for: createUser
