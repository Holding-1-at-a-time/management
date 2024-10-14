// Unit tests for: hasRole

import { hasRole } from "../auth";

// utils/auth.test.ts
// Mock types to simulate Role and Permission
type MockRole =
  | "AdminCreator"
  | "Client"
  | "Management"
  | "Member"
  | "Non-Member";

describe("hasRole() hasRole method", () => {
  // Happy path tests
  describe("Happy Path", () => {
    it("should return true when userRole is equal to requiredRole", () => {
      // Test that the function returns true when the userRole is the same as the requiredRole
      const userRole: MockRole = "Management" as any;
      const requiredRole: MockRole = "Management" as any;
      expect(hasRole(userRole, requiredRole)).toBe(true);
    });

    it("should return true when userRole is higher in hierarchy than requiredRole", () => {
      // Test that the function returns true when the userRole is higher in the hierarchy than the requiredRole
      const userRole: MockRole = "AdminCreator" as any;
      const requiredRole: MockRole = "Member" as any;
      expect(hasRole(userRole, requiredRole)).toBe(true);
    });

    it("should return false when userRole is lower in hierarchy than requiredRole", () => {
      // Test that the function returns false when the userRole is lower in the hierarchy than the requiredRole
      const userRole: MockRole = "Client" as any;
      const requiredRole: MockRole = "Management" as any;
      expect(hasRole(userRole, requiredRole)).toBe(false);
    });
  });

  // Edge case tests
  describe("Edge Cases", () => {
    it("should return false when userRole is the lowest and requiredRole is the highest", () => {
      // Test that the function returns false when the userRole is the lowest in the hierarchy and the requiredRole is the highest
      const userRole: MockRole = "Non-Member" as any;
      const requiredRole: MockRole = "AdminCreator" as any;
      expect(hasRole(userRole, requiredRole)).toBe(false);
    });

    it("should handle invalid roles gracefully", () => {
      // Test that the function handles invalid roles gracefully
      const userRole: MockRole = "InvalidRole" as any;
      const requiredRole: MockRole = "AdminCreator" as any;
      expect(hasRole(userRole, requiredRole)).toBe(false);
    });

    it("should handle empty strings as roles gracefully", () => {
      // Test that the function handles empty strings as roles gracefully
      const userRole: MockRole = "" as any;
      const requiredRole: MockRole = "AdminCreator" as any;
      expect(hasRole(userRole, requiredRole)).toBe(false);
    });
  });
});

// End of unit tests for: hasRole
