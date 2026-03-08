import { ReactNode } from 'react';
import { FormErrorMessage } from '@/components/FormErrorMessage';
import { getErrorMessage } from '@/utils/get-error-message';
import clsx from 'clsx';

export type FormFieldProps = {
  className?: string;
  label: string;
  Input: ReactNode;
  error?: unknown;
}

export function FormField({ className, label, Input, error }: FormFieldProps) {
  return (
    <div className={clsx('space-y-1', className)}>
      <label className="flex gap-2 items-center border-b bg-neutral-100 p-2 focus-within:border-blue-500 rounded-t">
        <div className="text-sm font-bold">{label}</div>
        {Input}
      </label>
      {Boolean(error) && (
        <FormErrorMessage>
          {getErrorMessage(error)}
        </FormErrorMessage>
      )}
    </div>
  )
}