import { UseFormReturn } from 'react-hook-form';
import { useEffect } from 'react';

/**
 * Reset should be done in a useEffect
 * as described here: https://react-hook-form.com/docs/useform/reset
 */
export function useFormResetOnSubmit(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { reset, formState }: UseFormReturn<any>
) {
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [reset, formState.isSubmitSuccessful]);
}