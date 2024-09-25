
// Unit tests for: UserOrganizations


import { UserOrganizations } from '../User-Organization';


// Mock the dependencies
jest.mock("convex/react", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn(),
}));

describe('UserOrganizations() UserOrganizations method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Happy Path Tests
  describe('Happy Path', () => {
    it('should display loading message when organizations are being fetched', () => {
      // Mock useUser to return a user
      (useUser as jest.Mock).mockReturnValue({ user: { id: 'user123' } });
      // Mock useQuery to return undefined (loading state)
      (useQuery as jest.Mock).mockReturnValue(undefined);

      render(<UserOrganizations />);

      expect(screen.getByText('Loading organizations...')).toBeInTheDocument();
    });

    it('should display organizations when they are fetched successfully', () => {
      // Mock useUser to return a user
      (useUser as jest.Mock).mockReturnValue({ user: { id: 'user123' } });
      // Mock useQuery to return a list of organizations
      (useQuery as jest.Mock).mockReturnValue([
        { _id: 'org1', name: 'Organization One' },
        { _id: 'org2', name: 'Organization Two' },
      ]);

      render(<UserOrganizations />);

      expect(screen.getByText('Your Organizations')).toBeInTheDocument();
      expect(screen.getByText('Organization One')).toBeInTheDocument();
      expect(screen.getByText('Organization Two')).toBeInTheDocument();
    });

    it('should display a message when the user is not a member of any organizations', () => {
      // Mock useUser to return a user
      (useUser as jest.Mock).mockReturnValue({ user: { id: 'user123' } });
      // Mock useQuery to return an empty array
      (useQuery as jest.Mock).mockReturnValue([]);

      render(<UserOrganizations />);

      expect(screen.getByText('You are not a member of any organizations.')).toBeInTheDocument();
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should handle the case when user is not logged in', () => {
      // Mock useUser to return no user
      (useUser as jest.Mock).mockReturnValue({ user: null });
      // Mock useQuery to return undefined (loading state)
      (useQuery as jest.Mock).mockReturnValue(undefined);

      render(<UserOrganizations />);

      expect(screen.getByText('Loading organizations...')).toBeInTheDocument();
    });

    it('should handle the case when organizations data is null', () => {
      // Mock useUser to return a user
      (useUser as jest.Mock).mockReturnValue({ user: { id: 'user123' } });
      // Mock useQuery to return null
      (useQuery as jest.Mock).mockReturnValue(null);

      render(<UserOrganizations />);

      expect(screen.getByText('Loading organizations...')).toBeInTheDocument();
    });
  });
});

// End of unit tests for: UserOrganizations
