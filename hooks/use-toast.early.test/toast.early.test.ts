// Unit tests for: toast

import type { ToastActionElement, ToastProps } from "@/components/ui/toast";
import * as React from "react";
import { toast } from "../use-toast";

// Mock types
type MockToast = Omit<ToastProps, "id">;
interface MockState {
  toasts: MockToasterToast[];
}
type MockToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

// Mock implementations
const mockDispatch = jest.fn();
jest.mock("../path-to-toast-function", () => ({
  ...jest.requireActual("../path-to-toast-function"),
  dispatch: mockDispatch,
}));

describe("toast() toast method", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Happy path test
  it("should add a toast with a unique id and open state", () => {
    const mockProps: MockToast = {
      title: "Test Title",
      description: "Test Description",
    } as any;

    const result = toast(mockProps as any);

    expect(result.id).toBeDefined();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "ADD_TOAST",
      toast: expect.objectContaining({
        ...mockProps,
        id: result.id,
        open: true,
      }),
    });
  });

  // Edge case test: Ensure toast can be dismissed
  it("should dismiss a toast when onOpenChange is called with false", () => {
    const mockProps: MockToast = {
      title: "Test Title",
      description: "Test Description",
    } as any;

    const result = toast(mockProps as any);
    result.dismiss();

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "DISMISS_TOAST",
      toastId: result.id,
    });
  });

  // Edge case test: Ensure update function works
  it("should update a toast with new properties", () => {
    const mockProps: MockToast = {
      title: "Initial Title",
      description: "Initial Description",
    } as any;

    const result = toast(mockProps as any);
    const updatedProps: MockToasterToast = {
      title: "Updated Title",
      description: "Updated Description",
      id: result.id,
    } as any;

    result.update(updatedProps as any);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "UPDATE_TOAST",
      toast: updatedProps,
    });
  });

  // Edge case test: Handle maximum toast limit
  it("should respect the TOAST_LIMIT and not add more toasts", () => {
    const mockProps: MockToast = {
      title: "Test Title",
      description: "Test Description",
    } as any;

    // Simulate existing toasts
    const existingToast: MockToasterToast = {
      id: "1",
      title: "Existing Toast",
      description: "Existing Description",
    } as any;

    const mockState: MockState = {
      toasts: [existingToast],
    } as any;

    // Mock the memoryState to simulate the existing state
    jest.spyOn(global, "memoryState", "get").mockReturnValue(mockState as any);

    toast(mockProps as any);

    expect(mockDispatch).not.toHaveBeenCalledWith({
      type: "ADD_TOAST",
      toast: expect.objectContaining({
        ...mockProps,
        open: true,
      }),
    });
  });
});

// End of unit tests for: toast
