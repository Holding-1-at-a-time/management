
// Unit tests for: CreateOrganization


import { CreateOrganization } from '../components-create-organization';


jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

jest.mock("convex/react", () => ({
  useAction: jest.fn(),
}));

jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn(),
}));

describe('CreateOrganization() CreateOrganization method', () => {
  let setNameMock: jest.Mock;
  let createOrganizationMock: jest.Mock;
  let userMock: { id: string } | null;

  beforeEach(() => {
    setNameMock = jest.fn();
    createOrganizationMock = jest.fn();
    userMock = { id: 'user123' };

    (useState as jest.Mock).mockImplementation((initialValue) => [initialValue, setNameMock]);
    (useAction as jest.Mock).mockReturnValue(createOrganizationMock);
    (useUser as jest.Mock).mockReturnValue({ user: userMock });
  });

  describe('Happy Path', () => {
    it('should render the form correctly', () => {
      render(<CreateOrganization />);
      expect(screen.getByPlaceholderText('Organization Name')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /create organization/i })).toBeInTheDocument();
    });

    it('should call createOrganization with correct parameters when form is submitted', async () => {
      render(<CreateOrganization />);
      const input = screen.getByPlaceholderText('Organization Name');
      const button = screen.getByRole('button', { name: /create organization/i });

      fireEvent.change(input, { target: { value: 'New Org' } });
      fireEvent.click(button);

      expect(createOrganizationMock).toHaveBeenCalledWith({ name: 'New Org', ownerId: 'user123' });
      expect(setNameMock).toHaveBeenCalledWith('');
    });
  });

  describe('Edge Cases', () => {
    it('should not call createOrganization if user is not logged in', () => {
      (useUser as jest.Mock).mockReturnValue({ user: null });
      render(<CreateOrganization />);
      const button = screen.getByRole('button', { name: /create organization/i });

      fireEvent.click(button);

      expect(createOrganizationMock).not.toHaveBeenCalled();
    });

    it('should handle errors gracefully when createOrganization fails', async () => {
      createOrganizationMock.mockImplementation(() => {
        throw new Error('Failed to create organization');
      });

      render(<CreateOrganization />);
      const input = screen.getByPlaceholderText('Organization Name');
      const button = screen.getByRole('button', { name: /create organization/i });

      fireEvent.change(input, { target: { value: 'New Org' } });
      fireEvent.click(button);

      expect(createOrganizationMock).toHaveBeenCalled();
      expect(setNameMock).not.toHaveBeenCalledWith('');
    });
  });
});

// End of unit tests for: CreateOrganization
