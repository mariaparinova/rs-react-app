import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import {
  MAST_START_FROM_UPPERCASE,
  MUST_ACCEPT_TERMS,
  MUST_BE_NUMBER,
  MUST_BE_POSITIVE,
  MUST_CONTAIN_CHARACTERS,
  MUST_SELECT_COUNTRY,
  MUST_SELECT_GENDER,
  PASSWORDS_MUST_MATCH,
} from '../../../../constants/validation-messages.ts';
import { UncontrolledUserForm } from './UncontrolledUserForm.tsx';
import { InitUserFormData } from '../userFormSchema.ts';
import { Gender } from '../../../../types/user.ts';
import { Country } from '../../../../types/country.ts';

describe('<UncontrolledUserForm>', () => {
  test('has all required fields', () => {
    // ACT
    render(<UncontrolledUserForm submitHandler={() => {}} initFormData={undefined} />);

    // ASSERT
    const fieldName = screen.getByRole('textbox', { name: /name/i });
    const fieldAge = screen.getByRole('textbox', { name: /age/i });
    const fieldEmail = screen.getByRole('textbox', { name: /email/i });
    const fieldPassword = screen.getByLabelText(/^Password$/i);
    const fieldConfirmPassword = screen.getByLabelText(/^confirm password$/i);
    const fieldGender = screen.getByLabelText(/gender/i);
    const fieldCountry = screen.getByLabelText(/country/i);
    const fieldTC = screen.getByLabelText(/terms and conditions/i);
    const fieldUpload = screen.getByLabelText(/upload file/i);

    expect(fieldName).toBeInTheDocument();
    expect(fieldAge).toBeInTheDocument();
    expect(fieldEmail).toBeInTheDocument();
    expect(fieldPassword).toBeInTheDocument();
    expect(fieldConfirmPassword).toBeInTheDocument();
    expect(fieldGender).toBeInTheDocument();
    expect(fieldCountry).toBeInTheDocument();
    expect(fieldTC).toBeInTheDocument();
    expect(fieldUpload).toBeInTheDocument();
  });

  describe('checks validation errors', () => {
    describe('field "name"', () => {
      test('required', async () => {
        // ACT
        render(<UncontrolledUserForm submitHandler={() => {}} initFormData={undefined} />);
        await userEvent.click(screen.getByRole('button', { name: /submit/i }));

        // ASSERT
        await waitFor(() => {
          expect(screen.getByText(MAST_START_FROM_UPPERCASE)).toBeInTheDocument();
        });
      });

      test('must start from uppercase letter', async () => {
        // ACT
        render(<UncontrolledUserForm submitHandler={() => {}} initFormData={undefined} />);
        const input = screen.getByRole('textbox', { name: /name/i });
        await userEvent.type(input, 'a');
        await userEvent.click(screen.getByRole('button', { name: /submit/i }));

        // ASSERT
        await waitFor(() => {
          expect(screen.getByText(MAST_START_FROM_UPPERCASE)).toBeInTheDocument();
        });
      });
    });

    describe('field "age"', () => {
      test('required', async () => {
        // ACT
        render(<UncontrolledUserForm submitHandler={() => {}} initFormData={undefined} />);
        await userEvent.click(screen.getByRole('button', { name: /submit/i }));

        // ASSERT
        await waitFor(() => {
          expect(screen.getByText(MUST_BE_NUMBER)).toBeInTheDocument();
        });
      });

      test('must be a number', async () => {
        // ACT
        render(<UncontrolledUserForm submitHandler={() => {}} initFormData={undefined} />);
        const input = screen.getByRole('textbox', { name: /age/i });
        await userEvent.type(input, 'a');
        await userEvent.click(screen.getByRole('button', { name: /submit/i }));

        // ASSERT
        await waitFor(() => {
          expect(screen.getByText(MUST_BE_NUMBER)).toBeInTheDocument();
        });
      });

      test('must be positive', async () => {
        // ACT
        render(<UncontrolledUserForm submitHandler={() => {}} initFormData={undefined} />);
        const input = screen.getByRole('textbox', { name: /age/i });
        await userEvent.type(input, '-5');
        await userEvent.click(screen.getByRole('button', { name: /submit/i }));

        // ASSERT
        await waitFor(() => {
          expect(screen.getByText(MUST_BE_POSITIVE)).toBeInTheDocument();
        });
      });
    });

    describe('field "password"', () => {
      test('must be valid password', async () => {
        // ACT
        render(<UncontrolledUserForm submitHandler={() => {}} initFormData={undefined} />);
        const input = screen.getByLabelText(/^password$/i);
        await userEvent.type(input, 'a');
        await userEvent.click(screen.getByRole('button', { name: /submit/i }));

        // ASSERT
        await waitFor(() => {
          expect(screen.getByText(MUST_CONTAIN_CHARACTERS)).toBeInTheDocument();
        });
      });
    });

    describe('field "confirm password"', () => {
      test('must be the same as the password', async () => {
        // ACT
        render(<UncontrolledUserForm submitHandler={() => {}} initFormData={undefined} />);
        const inputPassword = screen.getByLabelText(/^password$/i);
        await userEvent.type(inputPassword, 'aA1!');

        const inputConfirm = screen.getByLabelText(/^confirm password$/i);
        await userEvent.type(inputConfirm, 'a');

        await userEvent.click(screen.getByRole('button', { name: /submit/i }));

        // ASSERT
        await waitFor(() => {
          expect(screen.getByText(PASSWORDS_MUST_MATCH)).toBeInTheDocument();
        });
      });
    });

    describe('field "gender"', () => {
      test('must be specified', async () => {
        // ACT
        render(<UncontrolledUserForm submitHandler={() => {}} initFormData={undefined} />);
        await userEvent.click(screen.getByRole('button', { name: /submit/i }));

        // ASSERT
        await waitFor(() => {
          expect(screen.getByText(MUST_SELECT_GENDER)).toBeInTheDocument();
        });
      });
    });

    describe('field "country"', () => {
      test('must be specified', async () => {
        // ACT
        render(<UncontrolledUserForm submitHandler={() => {}} initFormData={undefined} />);
        await userEvent.click(screen.getByRole('button', { name: /submit/i }));

        // ASSERT
        await waitFor(() => {
          expect(screen.getByText(MUST_SELECT_COUNTRY)).toBeInTheDocument();
        });
      });
    });

    describe('field "terms and conditions"', () => {
      test('must be specified', async () => {
        // ACT
        render(<UncontrolledUserForm submitHandler={() => {}} initFormData={undefined} />);
        await userEvent.click(screen.getByRole('button', { name: /submit/i }));
        // ASSERT
        await waitFor(() => {
          expect(screen.getByText(MUST_ACCEPT_TERMS)).toBeInTheDocument();
        });
      });
    });
  });

  test('calls onSubmit callback', async () => {
    // ARRANGE
    const handleSubmit = vi.fn();
    const initFormData: InitUserFormData = {
      name: 'John',
      age: 30,
      email: 'test@gmail.com',
      password: 'aA1!',
      confirmPassword: 'aA1!',
      gender: Gender.Male,
      country: Country.Poland,
    };

    // ACT
    render(<UncontrolledUserForm submitHandler={handleSubmit} initFormData={initFormData} />);

    const termsField = screen.getByLabelText(/terms and conditions/i);
    await userEvent.click(termsField);

    const fieldUploadField = screen.getByLabelText(/upload file/i);
    await userEvent.upload(fieldUploadField, new File(['hello'], 'hello.png', { type: 'image/png' }));

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);

    // ASSERT
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
