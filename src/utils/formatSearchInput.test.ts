import { describe, expect, test } from 'vitest';
import { formatSearchInput } from './formatSearchInput.ts';

describe('formatSearchInput should trim whitespace and convert to lowercase', () => {
  test.each`
    input          | expected   | description
    ${' hello'}    | ${'hello'} | ${'beginning (case: 1 space)'}
    ${'  hello'}   | ${'hello'} | ${'beginning (case: 2 spaces)'}
    ${'hello '}    | ${'hello'} | ${'ending (case: 1 space)'}
    ${'hello  '}   | ${'hello'} | ${'ending (case: 2 space)'}
    ${' hello '}   | ${'hello'} | ${'both ending (case: 1 space)'}
    ${'  hello  '} | ${'hello'} | ${'both ending (case: 2 spaces)'}
    ${'hello'}     | ${'hello'} | ${'if string does not have spaces'}
  `(`checks trimming spaces at the string $description`, () => {});
});

describe('trimString', () => {
  test('checks converting all characters in the string to lowercase', () => {
    // ACT
    const result = formatSearchInput('NAME');

    // ASSERT
    expect(result).toBe('name');
  });
});
