import { SubmitEventHandler, PropsWithChildren } from 'react';
import { FormState } from 'react-hook-form';
import { FormErrorMessage } from '@/components/FormErrorMessage';
import { getErrorMessage } from '@/utils/get-error-message';

export type CardFormProps ={
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formState: Pick<FormState<any>, 'isSubmitting' | 'errors'>
  onSubmit: SubmitEventHandler;
}

export function CardForm({ children, title, formState, onSubmit }: PropsWithChildren<CardFormProps>) {
  return (
    <div className="p-4 border border-neutral-200 rounded-xl space-y-4">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        {formState.errors.root && (
          <FormErrorMessage>
            {getErrorMessage(formState.errors.root)}
          </FormErrorMessage>
        )}
      </div>
      <form
        className="space-y-4"
        onSubmit={onSubmit}
      >
        <div className="space-y-4">
          {children}
        </div>
        <div className="flex justify-end">
          <button
            disabled={formState.isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-neutral-400"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}