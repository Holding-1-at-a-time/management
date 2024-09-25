
// Unit tests for: store


import { store } from '../organization';


describe('store() store method', () => {
  let mockCtx: any;

  beforeEach(() => {
    // Mock the database context
    mockCtx = {
      db: {
        insert: jest.fn(),
      },
    };
  });

  describe('Happy Path', () => {
    it('should create an organization and owner successfully', async () => {
      // Arrange
      const args = {
        tenantId: v.id('tenants'),
        name: 'Test Organization',
        ownerId: 'owner123',
      };
      const expectedOrganizationId = 'org123';

      // Mock the insert function to return a specific organization ID
      mockCtx.db.insert.mockResolvedValueOnce(expectedOrganizationId);

      // Act
      const result = await store.handler(mockCtx, args);

      // Assert
      expect(mockCtx.db.insert).toHaveBeenCalledTimes(2);
      expect(mockCtx.db.insert).toHaveBeenCalledWith('organizations', {
        name: args.name,
        ownerId: args.ownerId,
      });
      expect(mockCtx.db.insert).toHaveBeenCalledWith('organizationMembers', {
        userId: args.ownerId,
        organizationId: expectedOrganizationId,
        role: 'owner',
      });
      expect(result).toBe(expectedOrganizationId);
    });
  });

  describe('Edge Cases', () => {
    it('should handle database insertion failure gracefully', async () => {
      // Arrange
      const args = {
        tenantId: v.id('tenants'),
        name: 'Test Organization',
        ownerId: 'owner123',
      };

      // Mock the insert function to throw an error
      mockCtx.db.insert.mockRejectedValueOnce(new Error('Database error'));

      // Act & Assert
      await expect(store.handler(mockCtx, args)).rejects.toThrow('Database error');
      expect(mockCtx.db.insert).toHaveBeenCalledTimes(1);
    });

    it('should handle empty organization name', async () => {
      // Arrange
      const args = {
        tenantId: v.id('tenants'),
        name: '',
        ownerId: 'owner123',
      };

      // Mock the insert function to return a specific organization ID
      const expectedOrganizationId = 'org123';
      mockCtx.db.insert.mockResolvedValueOnce(expectedOrganizationId);

      // Act
      const result = await store.handler(mockCtx, args);

      // Assert
      expect(mockCtx.db.insert).toHaveBeenCalledTimes(2);
      expect(mockCtx.db.insert).toHaveBeenCalledWith('organizations', {
        name: args.name,
        ownerId: args.ownerId,
      });
      expect(result).toBe(expectedOrganizationId);
    });

    it('should handle invalid ownerId', async () => {
      // Arrange
      const args = {
        tenantId: v.id('tenants'),
        name: 'Test Organization',
        ownerId: '',
      };

      // Mock the insert function to throw an error
      mockCtx.db.insert.mockRejectedValueOnce(new Error('Invalid ownerId'));

      // Act & Assert
      await expect(store.handler(mockCtx, args)).rejects.toThrow('Invalid ownerId');
      expect(mockCtx.db.insert).toHaveBeenCalledTimes(1);
    });
  });
});

// End of unit tests for: store
