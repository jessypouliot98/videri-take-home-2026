'use client'

import { useApi } from '@/api/QueryProvider';
import { useForm } from 'react-hook-form';
import { components } from '@pkg/api-contract/generated/openapi';
import { useQueryClient } from '@tanstack/react-query';
import { invalidateQueriesPredicate } from '@/api/utils/invalidate-queries-predicate';
import { apiErrorToForm } from '@/utils/form/api-error-to-form';
import { useFormResetOnSubmit } from '@/utils/form/use-form-reset-on-submit';
import { CardForm } from '@/components/CardForm';
import { FormField } from '@/components/FormField';

export default function Home() {
  const api = useApi();
  const queryClient = useQueryClient();

  const organizationsQuery = api.useQuery('get', '/orgs');

  const createUserForm = useForm<components['schemas']['CreateUserDto']>({
    defaultValues: {
      name: '',
      email: '',
      organizationId: '',
    },
  })
  const createUserAction = api.useMutation('post', '/users', {
    onError: apiErrorToForm(createUserForm),
    onSettled: () => {
      void queryClient.invalidateQueries({
        predicate: invalidateQueriesPredicate(api.queryOptions('get', '/users').queryKey),
      });
    }
  })
  useFormResetOnSubmit(createUserForm);

  const createOrgForm = useForm<components['schemas']['CreateOrganizationDto']>({
    defaultValues: {
      name: '',
    },
  })
  const createOrgAction = api.useMutation('post', '/orgs', {
    onError: apiErrorToForm(createOrgForm),
    onSettled: () => {
      void queryClient.invalidateQueries({
        predicate: invalidateQueriesPredicate(api.queryOptions('get', '/orgs').queryKey),
      });
    }
  })
  useFormResetOnSubmit(createOrgForm);

  const createAlertForm = useForm<components['schemas']['CreateAlertDto']>({
    defaultValues: {
      title: '',
    },
  })
  const createAlertAction = api.useMutation('post', '/alerts', {
    onError: apiErrorToForm(createAlertForm),
    onSettled: () => {
      void queryClient.invalidateQueries({
        predicate: invalidateQueriesPredicate(api.queryOptions('get', '/alerts').queryKey),
      });
    }
  })
  useFormResetOnSubmit(createAlertForm);

  return (
    <div className="space-y-4">

      <CardForm
        title="Create an organization"
        formState={createOrgForm.formState}
        onSubmit={createOrgForm.handleSubmit((body) => {
          return createOrgAction.mutateAsync({ body });
        })}
      >
        <FormField
          label="Name"
          Input={(
            <input
              type="text"
              className="focus:outline-none w-full"
              {...createOrgForm.register('name')}
            />
          )}
          error={createOrgForm.formState.errors.name}
        />
      </CardForm>

      <CardForm
        title="Create a user"
        formState={createUserForm.formState}
        onSubmit={createUserForm.handleSubmit((body) => {
          return createUserAction.mutateAsync({ body });
        })}
      >
        <FormField
          label="Name"
          Input={(
            <input
              type="text"
              className="focus:outline-none w-full"
              {...createUserForm.register('name')}
            />
          )}
          error={createUserForm.formState.errors.name}
        />
        <FormField
          label="Email"
          Input={(
            <input
              type="text"
              className="focus:outline-none w-full"
              {...createUserForm.register('email')}
            />
          )}
          error={createUserForm.formState.errors.email}
        />
        <FormField
          label="Organization"
          Input={(
            <select
              className="focus:outline-none w-full"
              {...createUserForm.register('organizationId')}
            >
              <option value="" disabled>Select an organization</option>
              {organizationsQuery.data?.map((org) => (
                <option key={org.id} value={org.id}>{org.name}</option>
              ))}
            </select>
          )}
          error={createUserForm.formState.errors.organizationId}
        />
      </CardForm>

      <CardForm
        title="Create a user"
        formState={createAlertForm.formState}
        onSubmit={createAlertForm.handleSubmit((body) => {
          return createAlertAction.mutateAsync({ body });
        })}
      >
        <FormField
          label="Title"
          Input={(
            <input
              type="text"
              className="focus:outline-none w-full"
              {...createAlertForm.register('title')}
            />
          )}
          error={createAlertForm.formState.errors.title}
        />
      </CardForm>
    </div>
  );
}
