// Unit tests for: hasPermission

import { hasPermission } from "../auth";

type MockPermission = {
  [key: string]: string;
};

// Mock data for testing
const mockPermissions: MockPermission = {
  CREATE_SERVICE: "org:services:create",
  READ_CLIENT: "org:client:read",
  UPDATE_CLIENT: "org:client:update",
  DELETE_CLIENT: "org:client:delete",
  CREATE_SCHEDULE: "org:schedules:create",
  READ_FEEDBACK: "org:feedback:read",
};

describe("hasPermission() hasPermission method", () => {
  // Happy path tests
  describe("Happy Path", () => {
    it("should return true when the user has the required permission", () => {
      // Test to ensure the function returns true when the user has the required permission
      const userPermissions = [
        mockPermissions.CREATE_SERVICE,
        mockPermissions.READ_CLIENT,
      ] as any;
      const permission = mockPermissions.CREATE_SERVICE as any;
      const result = hasPermission(userPermissions, permission);
      expect(result).toBe(true);
    });

    it("should return false when the user does not have the required permission", () => {
      // Test to ensure the function returns false when the user does not have the required permission
      const userPermissions = [
        mockPermissions.READ_CLIENT,
        mockPermissions.UPDATE_CLIENT,
      ] as any;
      const permission = mockPermissions.CREATE_SERVICE as any;
      const result = hasPermission(userPermissions, permission);
      expect(result).toBe(false);
    });
  });

  // Edge case tests
  describe("Edge Cases", () => {
    it("should return false when the user permissions array is empty", () => {
      // Test to ensure the function returns false when the user permissions array is empty
      const userPermissions: any[] = [];
      const permission = mockPermissions.CREATE_SERVICE as any;
      const result = hasPermission(userPermissions, permission);
      expect(result).toBe(false);
    });

    it("should return false when the permission is not in the permissions list", () => {
      // Test to ensure the function returns false when the permission is not in the permissions list
      const userPermissions = [
        mockPermissions.READ_CLIENT,
        mockPermissions.UPDATE_CLIENT,
      ] as any;
      const permission = "org:unknown:permission" as any;
      const result = hasPermission(userPermissions, permission);
      expect(result).toBe(false);
    });

    it("should handle case sensitivity correctly", () => {
      // Test to ensure the function handles case sensitivity correctly
      const userPermissions = [
        mockPermissions.CREATE_SERVICE.toLowerCase(),
      ] as any;
      const permission = mockPermissions.CREATE_SERVICE as any;
      const result = hasPermission(userPermissions, permission);
      expect(result).toBe(false);
    });

    it("should return false when the permission is null", () => {
      // Test to ensure the function returns false when the permission is null
      const userPermissions = [
        mockPermissions.CREATE_SERVICE,
        mockPermissions.READ_CLIENT,
      ] as any;
      const permission = null as any;
      const result = hasPermission(userPermissions, permission);
      expect(result).toBe(false);
    });

    it("should return false when the user permissions array contains null", () => {
      // Test to ensure the function returns false when the user permissions array contains null
      const userPermissions = [null] as any;
      const permission = mockPermissions.CREATE_SERVICE as any;
      const result = hasPermission(userPermissions, permission);
      expect(result).toBe(false);
    });
  });
});

// End of unit tests for: hasPermission
