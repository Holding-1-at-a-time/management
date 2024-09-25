
// Unit tests for: store


import { store } from '../users';


describe('store() store method', () => {
  let ctx: any;

  beforeEach(() => {
    ctx = {
      auth: {
        getUserIdentity: jest.fn(),
      },
      db: {
        query: jest.fn(),
        patch: jest.fn(),
        insert: jest.fn(),
      },
    };
  });

  describe('Happy Path', () => {
    it('should return existing user ID if user is already stored', async () => {
      // Arrange
      const mockIdentity = { name: 'John Doe', tokenIdentifier: 'token123' };
      const mockUser = { _id: 'user123', name: 'John Doe' };
      ctx.auth.getUserIdentity.mockResolvedValue(mockIdentity);
      ctx.db.query.mockReturnValue({
        withIndex: jest.fn().mockReturnValue({
          unique: jest.fn().mockResolvedValue(mockUser),
        }),
      });

      // Act
      const result = await store.handler(ctx);

      // Assert
      expect(result).toBe(mockUser._id);
      expect(ctx.db.patch).not.toHaveBeenCalled();
    });

    it('should update user name if it has changed', async () => {
      // Arrange
      const mockIdentity = { name: 'Jane Doe', tokenIdentifier: 'token123' };
      const mockUser = { _id: 'user123', name: 'John Doe' };
      ctx.auth.getUserIdentity.mockResolvedValue(mockIdentity);
      ctx.db.query.mockReturnValue({
        withIndex: jest.fn().mockReturnValue({
          unique: jest.fn().mockResolvedValue(mockUser),
        }),
      });

      // Act
      const result = await store.handler(ctx);

      // Assert
      expect(result).toBe(mockUser._id);
      expect(ctx.db.patch).toHaveBeenCalledWith(mockUser._id, { name: mockIdentity.name });
    });

    it('should create a new user if identity is new', async () => {
      // Arrange
      const mockIdentity = { name: 'John Doe', tokenIdentifier: 'token123' };
      ctx.auth.getUserIdentity.mockResolvedValue(mockIdentity);
      ctx.db.query.mockReturnValue({
        withIndex: jest.fn().mockReturnValue({
          unique: jest.fn().mockResolvedValue(null),
        }),
      });
      ctx.db.insert.mockResolvedValue('newUserId');

      // Act
      const result = await store.handler(ctx);

      // Assert
      expect(result).toBe('newUserId');
      expect(ctx.db.insert).toHaveBeenCalledWith('users', {
        name: mockIdentity.name,
        tokenIdentifier: mockIdentity.tokenIdentifier,
        email: '',
        firstName: '',
        lastName: '',
        clerkId: '',
      });
    });
  });

  describe('Edge Cases', () => {
    it('should throw an error if no identity is present', async () => {
      // Arrange
      ctx.auth.getUserIdentity.mockResolvedValue(null);

      // Act & Assert
      await expect(store.handler(ctx)).rejects.toThrow('Called storeUser without authentication present');
    });

    it('should handle identity with no name gracefully', async () => {
      // Arrange
      const mockIdentity = { name: null, tokenIdentifier: 'token123' };
      ctx.auth.getUserIdentity.mockResolvedValue(mockIdentity);
      ctx.db.query.mockReturnValue({
        withIndex: jest.fn().mockReturnValue({
          unique: jest.fn().mockResolvedValue(null),
        }),
      });
      ctx.db.insert.mockResolvedValue('newUserId');

      // Act
      const result = await store.handler(ctx);

      // Assert
      expect(result).toBe('newUserId');
      expect(ctx.db.insert).toHaveBeenCalledWith('users', {
        name: 'Anonymous',
        tokenIdentifier: mockIdentity.tokenIdentifier,
        email: '',
        firstName: '',
        lastName: '',
        clerkId: '',
      });
    });
  });
});

// End of unit tests for: store
