'use client'

import { useApi } from '@/api/QueryProvider';
import { useForm } from 'react-hook-form';
import { components } from '@pkg/api-contract/generated/openapi'
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getErrorMessage } from '@/utils/get-error-message';

export default function Home() {
  const api = useApi();
  const queryClient = useQueryClient();

  const organizationsQuery = api.useQuery('get', '/orgs');

  const createUserAction = api.useMutation('post', '/users', {
    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: api.queryOptions('get', '/users').queryKey,
      });
    }
  })
  const createUserForm = useForm<components['schemas']['CreateUserDto']>({
    defaultValues: {
      name: '',
      email: '',
      organizationId: '',
    },
  })
  useEffect(() => {
    createUserForm.reset();
  }, [createUserForm, createUserForm.formState.isSubmitted]);

  const createOrgAction = api.useMutation('post', '/orgs', {
    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: api.queryOptions('get', '/orgs').queryKey,
      });
    }
  })
  const createOrgForm = useForm<components['schemas']['CreateOrganizationDto']>({
    defaultValues: {
      name: '',
    },
  })
  useEffect(() => {
    createOrgForm.reset();
  }, [createOrgForm, createOrgForm.formState.isSubmitted]);

  return (
    <div className="space-y-4">
      <section className="p-4 border border-neutral-200 rounded-xl space-y-4">
        <h2 className="text-2xl font-bold">Create an organization</h2>
        {createOrgAction.isError && (
          <div className="text-red-500">{getErrorMessage(createOrgAction.error)}</div>
        )}
        <form
          className="space-y-4"
          onSubmit={createOrgForm.handleSubmit((body) => {
            return createOrgAction.mutateAsync({ body });
          })}
        >
          <label className="flex gap-2 items-center border-b bg-neutral-100 p-2 focus-within:border-blue-500 rounded-t">
            <div>Name</div>
            <input
              type="text"
              className="focus:outline-none w-full"
              {...createOrgForm.register('name')}
            />
          </label>
          <div className="flex justify-end">
            <button
              disabled={createOrgForm.formState.isSubmitting}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-neutral-400"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
      <section className="p-4 border border-neutral-200 rounded-xl space-y-4">
        <h2 className="text-2xl font-bold">Create a user</h2>
        {createUserAction.isError && (
          <div className="text-red-500">{getErrorMessage(createUserAction.error)}</div>
        )}
        <form
          className="space-y-4"
          onSubmit={createUserForm.handleSubmit((body) => {
            return createUserAction.mutateAsync({ body });
          })}
        >
          <label className="flex gap-2 items-center border-b bg-neutral-100 p-2 focus-within:border-blue-500 rounded-t">
            <div>Name</div>
            <input
              type="text"
              className="focus:outline-none w-full"
              {...createUserForm.register('name')}
            />
          </label>
          <label className="flex gap-2 items-center border-b bg-neutral-100 p-2 focus-within:border-blue-500 rounded-t">
            <div>Email</div>
            <input
              type="text"
              className="focus:outline-none w-full"
              {...createUserForm.register('email')}
            />
          </label>
          <label className="flex gap-2 items-center border-b bg-neutral-100 p-2 focus-within:border-blue-500 rounded-t">
            <div>Organization</div>
            <select
              className="focus:outline-none w-full"
              {...createUserForm.register('organizationId')}
            >
              <option value="" disabled>Select an organization</option>
              {organizationsQuery.data?.map((org) => (
                <option key={org.id} value={org.id}>{org.name}</option>
              ))}
            </select>
          </label>
          <div className="flex justify-end">
            <button
              disabled={createUserForm.formState.isSubmitting}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-neutral-400"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
