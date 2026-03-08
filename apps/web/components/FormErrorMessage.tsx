import { PropsWithChildren } from 'react';

export function FormErrorMessage({ children }: PropsWithChildren) {
  return (
    <p className="text-sm text-red-600">
      {children}
    </p>
  );
}