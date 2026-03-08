import { UseFormReturn } from 'react-hook-form';
import { getErrorMessage } from '@/utils/get-error-message';

type FieldMapper = (path: string[]) => string;
type ApiZodError = {
  path: string[];
  message: string;
}
const defaultFieldMapper: FieldMapper = (path) => path.join('.');

export function apiErrorToForm(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>,
  fieldMapper: FieldMapper = defaultFieldMapper
) {
  return (error: unknown) => {
    if (error == null) return;
    form.setError('root', { message: getErrorMessage(error) });
    if (typeof error !== 'object' || error === null) return;
    if (!('errors' in error) || !Array.isArray(error.errors)) {
      return;
    }
    const errors = error.errors as ApiZodError[];
    for (const { path, message } of errors) {
      const field = fieldMapper(path);
      form.setError(field, { message });
    }
  }
}