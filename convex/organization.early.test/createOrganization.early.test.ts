
// Unit tests for: createOrganization


import { createOrganization } from '../organization';


describe('createOrganization() createOrganization method', () => {
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
    it('should create an organization and return its ID', async () => {
      // Arrange
      const args = { name: 'Test Organization', ownerId: 'owner123' };
      const expectedOrganizationId = 'org123';
      mockCtx.db.insert.mockResolvedValueOnce(expectedOrganizationId);

      // Act
      const result = await createOrganization.handler(mockCtx, args);

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
    it('should handle empty organization name', async () => {
      // Arrange
      const args = { name: '', ownerId: 'owner123' };
      const expectedOrganizationId = 'org123';
      mockCtx.db.insert.mockResolvedValueOnce(expectedOrganizationId);

      // Act
      const result = await createOrganization.handler(mockCtx, args);

      // Assert
      expect(mockCtx.db.insert).toHaveBeenCalledTimes(2);
      expect(mockCtx.db.insert).toHaveBeenCalledWith('organizations', {
        name: args.name,
        ownerId: args.ownerId,
      });
      expect(result).toBe(expectedOrganizationId);
    });

    it('should handle empty ownerId', async () => {
      // Arrange
      const args = { name: 'Test Organization', ownerId: '' };
      const expectedOrganizationId = 'org123';
      mockCtx.db.insert.mockResolvedValueOnce(expectedOrganizationId);

      // Act
      const result = await createOrganization.handler(mockCtx, args);

      // Assert
      expect(mockCtx.db.insert).toHaveBeenCalledTimes(2);
      expect(mockCtx.db.insert).toHaveBeenCalledWith('organizations', {
        name: args.name,
        ownerId: args.ownerId,
      });
      expect(result).toBe(expectedOrganizationId);
    });

    it('should handle database insertion failure', async () => {
      // Arrange
      const args = { name: 'Test Organization', ownerId: 'owner123' };
      mockCtx.db.insert.mockRejectedValueOnce(new Error('Database error'));

      // Act & Assert
      await expect(createOrganization.handler(mockCtx, args)).rejects.toThrow('Database error');
      expect(mockCtx.db.insert).toHaveBeenCalledTimes(1);
    });
  });
});

// End of unit tests for: createOrganization
