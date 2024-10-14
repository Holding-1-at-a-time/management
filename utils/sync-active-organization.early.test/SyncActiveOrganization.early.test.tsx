// Unit tests for: SyncActiveOrganization

import { useAuth, useOrganizationList } from "@clerk/nextjs";
import { redirect, useParams } from "next/navigation";
import { SyncActiveOrganization } from "../sync-active-organization";

// Mock the dependencies
jest.mock("@clerk/nextjs", () => ({
  useOrganizationList: jest.fn(),
  useAuth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  redirect: jest.fn(),
}));

describe("SyncActiveOrganization() SyncActiveOrganization method", () => {
  let setActiveMock: jest.Mock;
  let isLoadedMock: boolean;
  let orgIdMock: string;
  let urlOrgIdMock: string;

  beforeEach(() => {
    setActiveMock = jest.fn();
    isLoadedMock = true;
    orgIdMock = "org_123";
    urlOrgIdMock = "org_456";

    (useOrganizationList as jest.Mock).mockReturnValue({
      setActive: setActiveMock,
      isLoaded: isLoadedMock,
    });

    (useAuth as jest.Mock).mockReturnValue({
      orgId: orgIdMock,
    });

    (useParams as jest.Mock).mockReturnValue({
      orgId: urlOrgIdMock,
    });

    (redirect as jest.Mock).mockClear();
  });

  describe("Happy Path", () => {
    it("should set the active organization when URL orgId is different from session orgId", () => {
      // Test description: This test checks if the active organization is set correctly when the orgId in the URL is different from the session orgId.
      renderHook(() => SyncActiveOrganization());

      expect(setActiveMock).toHaveBeenCalledWith({
        organization: urlOrgIdMock,
      });
      expect(redirect).not.toHaveBeenCalled();
    });

    it("should not set the active organization when URL orgId is the same as session orgId", () => {
      // Test description: This test ensures that the active organization is not set when the orgId in the URL matches the session orgId.
      urlOrgIdMock = "org_123";
      (useParams as jest.Mock).mockReturnValue({
        orgId: urlOrgIdMock,
      });

      renderHook(() => SyncActiveOrganization());

      expect(setActiveMock).not.toHaveBeenCalled();
      expect(redirect).not.toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    it("should redirect to homepage when isLoaded is false", () => {
      // Test description: This test verifies that the function redirects to the homepage when the organization list is not loaded.
      isLoadedMock = false;
      (useOrganizationList as jest.Mock).mockReturnValue({
        setActive: setActiveMock,
        isLoaded: isLoadedMock,
      });

      renderHook(() => SyncActiveOrganization());

      expect(redirect).toHaveBeenCalledWith("/");
      expect(setActiveMock).not.toHaveBeenCalled();
    });

    it("should redirect to homepage when URL orgId is invalid", () => {
      // Test description: This test checks if the function redirects to the homepage when the orgId in the URL is invalid.
      urlOrgIdMock = "invalid_org_id";
      (useParams as jest.Mock).mockReturnValue({
        orgId: urlOrgIdMock,
      });

      renderHook(() => SyncActiveOrganization());

      expect(redirect).toHaveBeenCalledWith("/");
      expect(setActiveMock).not.toHaveBeenCalled();
    });

    it("should handle missing URL orgId gracefully", () => {
      // Test description: This test ensures that the function handles a missing orgId in the URL without errors.
      (useParams as jest.Mock).mockReturnValue({
        orgId: undefined,
      });

      renderHook(() => SyncActiveOrganization());

      expect(redirect).toHaveBeenCalledWith("/");
      expect(setActiveMock).not.toHaveBeenCalled();
    });
  });
});

// End of unit tests for: SyncActiveOrganization
