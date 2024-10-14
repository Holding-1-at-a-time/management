// Unit tests for: cn

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cn } from "../utils";

// Mocking the clsx and twMerge functions
jest.mock("clsx", () => ({
  clsx: jest.fn(),
}));

jest.mock("tailwind-merge", () => ({
  twMerge: jest.fn(),
}));

// Define a mock type to simulate ClassValue
type MockClassValue = {
  className: string;
  condition?: boolean;
};

// Test suite for the cn function
describe("cn() cn method", () => {
  beforeEach(() => {
    // Reset mocks before each test
    (clsx as jest.Mock).mockReset();
    (twMerge as jest.Mock).mockReset();
  });

  // Happy path tests
  describe("Happy path", () => {
    it("should merge class names correctly", () => {
      // Arrange
      const mockInput1: MockClassValue = { className: "class1" } as any;
      const mockInput2: MockClassValue = { className: "class2" } as any;
      (clsx as jest.Mock).mockReturnValue("class1 class2");
      (twMerge as jest.Mock).mockReturnValue("class1 class2");

      // Act
      const result = cn(mockInput1, mockInput2);

      // Assert
      expect(clsx).toHaveBeenCalledWith([mockInput1, mockInput2]);
      expect(twMerge).toHaveBeenCalledWith("class1 class2");
      expect(result).toBe("class1 class2");
    });
  });

  // Edge case tests
  describe("Edge cases", () => {
    it("should handle empty input gracefully", () => {
      // Arrange
      (clsx as jest.Mock).mockReturnValue("");
      (twMerge as jest.Mock).mockReturnValue("");

      // Act
      const result = cn();

      // Assert
      expect(clsx).toHaveBeenCalledWith([]);
      expect(twMerge).toHaveBeenCalledWith("");
      expect(result).toBe("");
    });

    it("should handle undefined and null values", () => {
      // Arrange
      const mockInput1: MockClassValue = { className: "class1" } as any;
      (clsx as jest.Mock).mockReturnValue("class1");
      (twMerge as jest.Mock).mockReturnValue("class1");

      // Act
      const result = cn(mockInput1, undefined, null);

      // Assert
      expect(clsx).toHaveBeenCalledWith([mockInput1, undefined, null]);
      expect(twMerge).toHaveBeenCalledWith("class1");
      expect(result).toBe("class1");
    });

    it("should handle conditional class names", () => {
      // Arrange
      const mockInput1: MockClassValue = {
        className: "class1",
        condition: true,
      } as any;
      const mockInput2: MockClassValue = {
        className: "class2",
        condition: false,
      } as any;
      (clsx as jest.Mock).mockReturnValue("class1");
      (twMerge as jest.Mock).mockReturnValue("class1");

      // Act
      const result = cn(mockInput1, mockInput2);

      // Assert
      expect(clsx).toHaveBeenCalledWith([mockInput1, mockInput2]);
      expect(twMerge).toHaveBeenCalledWith("class1");
      expect(result).toBe("class1");
    });
  });
});

// End of unit tests for: cn
