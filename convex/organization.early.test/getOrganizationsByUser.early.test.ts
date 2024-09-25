
// Unit tests for: getOrganizationsByUser


import { getOrganizationsByUser } from '../organization';


// Mocking the database context
const mockDb = {
  query: jest.fn(),
  get: jest.fn(),
};

const mockCtx = {
  db: mockDb,
};

describe('getOrganizationsByUser() getOrganizationsByUser method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy Path', () => {
    it('should return a list of organizations for a valid userId', async () => {
      // Arrange
      const userId = 'validUserId';
      const memberships = [
        { organizationId: 'org1' },
        { organizationId: 'org2' },
      ];
      const organizations = [
        { id: 'org1', name: 'Organization 1' },
        { id: 'org2', name: 'Organization 2' },
      ];

      mockDb.query.mockReturnValueOnce({
        withIndex: jest.fn().mockReturnValueOnce({
          eq: jest.fn().mockReturnValueOnce({
            collect: jest.fn().mockResolvedValueOnce(memberships),
          }),
        }),
      });

      mockDb.get
        .mockResolvedValueOnce(organizations[0])
        .mockResolvedValueOnce(organizations[1]);

      // Act
      const result = await getOrganizationsByUser.handler(mockCtx, { userId });

      // Assert
      expect(result).toEqual(organizations);
      expect(mockDb.query).toHaveBeenCalledWith('organizationMembers');
      expect(mockDb.get).toHaveBeenCalledTimes(2);
    });
  });

  describe('Edge Cases', () => {
    it('should return an empty array if the user has no memberships', async () => {
      // Arrange
      const userId = 'userWithNoMemberships';
      const memberships: any[] = [];

      mockDb.query.mockReturnValueOnce({
        withIndex: jest.fn().mockReturnValueOnce({
          eq: jest.fn().mockReturnValueOnce({
            collect: jest.fn().mockResolvedValueOnce(memberships),
          }),
        }),
      });

      // Act
      const result = await getOrganizationsByUser.handler(mockCtx, { userId });

      // Assert
      expect(result).toEqual([]);
      expect(mockDb.query).toHaveBeenCalledWith('organizationMembers');
      expect(mockDb.get).not.toHaveBeenCalled();
    });

    it('should filter out null organizations from the result', async () => {
      // Arrange
      const userId = 'userWithSomeNullOrganizations';
      const memberships = [
        { organizationId: 'org1' },
        { organizationId: 'org2' },
      ];
      const organizations = [
        { id: 'org1', name: 'Organization 1' },
        null,
      ];

      mockDb.query.mockReturnValueOnce({
        withIndex: jest.fn().mockReturnValueOnce({
          eq: jest.fn().mockReturnValueOnce({
            collect: jest.fn().mockResolvedValueOnce(memberships),
          }),
        }),
      });

      mockDb.get
        .mockResolvedValueOnce(organizations[0])
        .mockResolvedValueOnce(organizations[1]);

      // Act
      const result = await getOrganizationsByUser.handler(mockCtx, { userId });

      // Assert
      expect(result).toEqual([organizations[0]]);
      expect(mockDb.query).toHaveBeenCalledWith('organizationMembers');
      expect(mockDb.get).toHaveBeenCalledTimes(2);
    });

    it('should handle the case where the userId does not exist', async () => {
      // Arrange
      const userId = 'nonExistentUserId';
      const memberships: any[] = [];

      mockDb.query.mockReturnValueOnce({
        withIndex: jest.fn().mockReturnValueOnce({
          eq: jest.fn().mockReturnValueOnce({
            collect: jest.fn().mockResolvedValueOnce(memberships),
          }),
        }),
      });

      // Act
      const result = await getOrganizationsByUser.handler(mockCtx, { userId });

      // Assert
      expect(result).toEqual([]);
      expect(mockDb.query).toHaveBeenCalledWith('organizationMembers');
      expect(mockDb.get).not.toHaveBeenCalled();
    });
  });
});

// End of unit tests for: getOrganizationsByUser
