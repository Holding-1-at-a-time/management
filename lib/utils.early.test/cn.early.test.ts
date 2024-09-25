
// Unit tests for: cn


import { cn } from '../utils';


describe('cn() cn method', () => {
  // Happy Path Tests
  describe('Happy Path', () => {
    it('should combine multiple class names into a single string', () => {
      const result = cn('class1', 'class2', 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    it('should handle conditional class names correctly', () => {
      const result = cn('class1', false && 'class2', true && 'class3');
      expect(result).toBe('class1 class3');
    });

    it('should merge Tailwind classes correctly', () => {
      const result = cn('bg-red-500', 'bg-blue-500');
      expect(result).toBe('bg-blue-500'); // Assuming twMerge merges these correctly
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should return an empty string when no arguments are provided', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('should handle null and undefined values gracefully', () => {
      const result = cn('class1', null, undefined, 'class2');
      expect(result).toBe('class1 class2');
    });

    it('should handle numeric values correctly', () => {
      const result = cn('class1', 0, 1, 'class2');
      expect(result).toBe('class1 1 class2'); // 0 is falsy, so it should be ignored
    });

    it('should handle arrays of class names', () => {
      const result = cn(['class1', 'class2'], 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    it('should handle objects with truthy and falsy values', () => {
      const result = cn({ class1: true, class2: false, class3: true });
      expect(result).toBe('class1 class3');
    });

    it('should handle mixed types of inputs', () => {
      const result = cn('class1', ['class2', { class3: true }], { class4: false });
      expect(result).toBe('class1 class2 class3');
    });
  });
});

// End of unit tests for: cn
