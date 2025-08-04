import { afterEach, beforeEach, Mock, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

beforeEach(() => {
  globalThis.URL.createObjectURL = vi.fn(() => 'blob:http://localhost/url');
});

afterEach(() => {
  (globalThis.URL.createObjectURL as Mock).mockRestore();
  cleanup();
});
