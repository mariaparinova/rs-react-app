import { describe, expect, test } from 'vitest';
import { formatSearchInput } from './formatSearchInput.ts';

describe('trimString', () => {
  describe('trimming spaces', () => {
    test('checks trimming spaces at the string beginning (case: 1 space)', () => {
      // ACT
      const result = formatSearchInput(' hello');

      // ASSERT
      expect(result).toBe('hello');
    });

    test('checks trimming spaces at the string beginning (case: 2 spaces)', () => {
      // ACT
      const result = formatSearchInput('  hello');

      // ASSERT
      expect(result).toBe('hello');
    });

    test('checks trimming spaces at the string ending (case: 1 space)', () => {
      // ACT
      const result = formatSearchInput('hello ');

      // ASSERT
      expect(result).toBe('hello');
    });

    test('checks trimming spaces at the string ending (case: 2 spaces)', () => {
      // ACT
      const result = formatSearchInput('hello  ');

      // ASSERT
      expect(result).toBe('hello');
    });

    test('checks trimming spaces at the string both ending (case: 1 space)', () => {
      // ACT
      const result = formatSearchInput(' hello ');

      // ASSERT
      expect(result).toBe('hello');
    });

    test('checks trimming spaces at the string both ending (case: 2 spaces)', () => {
      // ACT
      const result = formatSearchInput('  hello  ');

      // ASSERT
      expect(result).toBe('hello');
    });

    test('checks no trimming any char if string does not have spaces', () => {
      // ACT
      const result = formatSearchInput('hello');

      // ASSERT
      expect(result).toBe('hello');
    });
  });

  test('checks converting all characters in the string to lowercase', () => {
    // ACT
    const result = formatSearchInput('NAME');

    // ASSERT
    expect(result).toBe('name');
  });
});
