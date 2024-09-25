
// Unit tests for: getUser


import { getUser } from '../users';


describe('getUser() getUser method', () => {
  let mockCtx: any;

  beforeEach(() => {
    // Mock the context object with necessary methods
    mockCtx = {
      db: {
        query: jest.fn().mockReturnThis(),
        withIndex: jest.fn().mockReturnThis(),
        first: jest.fn(),
      },
    };
  });

  describe('Happy Path', () => {
    it('should return a user when a valid clerkId is provided', async () => {
      // Arrange
      const mockUser = { _id: 'user123', clerkId: 'clerk123' };
      mockCtx.db.first.mockResolvedValue(mockUser);

      // Act
      const result = await getUser.handler(mockCtx, { clerkId: 'clerk123' });

      // Assert
      expect(mockCtx.db.query).toHaveBeenCalledWith('users');
      expect(mockCtx.db.withIndex).toHaveBeenCalledWith('by_clerk_id', expect.any(Function));
      expect(mockCtx.db.first).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });
  });

  describe('Edge Cases', () => {
    it('should throw an error when no user is found for the given clerkId', async () => {
      // Arrange
      mockCtx.db.first.mockResolvedValue(null);

      // Act & Assert
      await expect(getUser.handler(mockCtx, { clerkId: 'nonexistent' })).rejects.toThrow('User not found');
      expect(mockCtx.db.query).toHaveBeenCalledWith('users');
      expect(mockCtx.db.withIndex).toHaveBeenCalledWith('by_clerk_id', expect.any(Function));
      expect(mockCtx.db.first).toHaveBeenCalled();
    });

    it('should handle case sensitivity in clerkId', async () => {
      // Arrange
      const mockUser = { _id: 'user123', clerkId: 'Clerk123' };
      mockCtx.db.first.mockResolvedValue(mockUser);

      // Act
      const result = await getUser.handler(mockCtx, { clerkId: 'Clerk123' });

      // Assert
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if clerkId is an empty string', async () => {
      // Arrange
      mockCtx.db.first.mockResolvedValue(null);

      // Act & Assert
      await expect(getUser.handler(mockCtx, { clerkId: '' })).rejects.toThrow('User not found');
      expect(mockCtx.db.query).toHaveBeenCalledWith('users');
      expect(mockCtx.db.withIndex).toHaveBeenCalledWith('by_clerk_id', expect.any(Function));
      expect(mockCtx.db.first).toHaveBeenCalled();
    });
  });
});

// End of unit tests for: getUser
