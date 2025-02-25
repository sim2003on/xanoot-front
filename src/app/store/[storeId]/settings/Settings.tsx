'use client';

import { Trash } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/layouts/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/layouts/ui/form-elements/Form';
import { Input } from '@/components/layouts/ui/form-elements/Input';
import { Heading } from '@/components/layouts/ui/Heading';
import { ConfirmModal } from '@/components/layouts/ui/modals/ConfirmModal';
import { Textarea } from '@/components/layouts/ui/Textarea';

import { useDeleteStore } from '@/hooks/queries/stores/useDeleteStore';
import { useUpdateStore } from '@/hooks/queries/stores/useUpdateStore';

import { IStoreEdit } from '@/shared/types/store.interface';

import styles from '../Store.module.scss';

export function Settings() {
  const { store, updateStore, isLoadingUpdate } = useUpdateStore();
  const { deleteStore, isLoadingDelete } = useDeleteStore();

  const form = useForm<IStoreEdit>({
    mode: 'onChange',
    values: {
      title: store?.title || '',
      description: store?.description || ''
    }
  });

  const onSubmit: SubmitHandler<IStoreEdit> = data => {
    updateStore(data);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Heading title="Settings" description="Manage store settings" />
        <ConfirmModal handleClick={() => deleteStore()}>
          <Button size="icon" variant="outline" disabled={isLoadingDelete}>
            <Trash className="size-4" />
          </Button>
        </ConfirmModal>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={styles.fields}>
            <FormField
              control={form.control}
              name="title"
              rules={{
                required: 'Name required'
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name your store"
                      disabled={isLoadingUpdate}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description of the store"
                    disabled={isLoadingUpdate}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="default" disabled={isLoadingUpdate}>
            Save changes
          </Button>
        </form>
      </Form>
    </div>
  );
}
