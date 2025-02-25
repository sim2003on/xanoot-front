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

import { useCreateCategory } from '@/hooks/queries/categories/useCreateCategory';
import { useDeleteCategory } from '@/hooks/queries/categories/useDeleteCategory';
import { useUpdateCategory } from '@/hooks/queries/categories/useUpdateCategory';

import { ICategory, ICategoryInput } from '@/shared/types/category.interface';

import styles from '../Store.module.scss';

interface ICategoryForm {
  category?: ICategory | null;
}

export function CategoryForm({ category }: ICategoryForm) {
  const { createCategory, isLoadingCreate } = useCreateCategory();
  const { updateCategory, isLoadingUpdate } = useUpdateCategory();
  const { deleteCategory, isLoadingDelete } = useDeleteCategory();

  const title = category ? 'Change data' : 'Create category';
  const description = category ? 'Change category data' : 'Add a new category';
  const action = category ? 'Save' : 'Create';

  const form = useForm<ICategoryInput>({
    mode: 'onChange',
    values: {
      title: category?.title || '',
      description: category?.description || ''
    }
  });

  const onSubmit: SubmitHandler<ICategoryInput> = data => {
    if (category) updateCategory(data);
    else createCategory(data);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Heading title={title} description={description} />
        {category && (
          <ConfirmModal handleClick={() => deleteCategory()}>
            <Button size="icon" variant="default" disabled={isLoadingDelete}>
              <Trash className="size-4" />
            </Button>
          </ConfirmModal>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={styles.fields}>
            <FormField
              control={form.control}
              name="title"
              rules={{
                required: 'Name is required'
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Category name"
                      disabled={isLoadingCreate || isLoadingUpdate}
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
            rules={{
              required: 'Description is required'
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Category description"
                    disabled={isLoadingCreate || isLoadingUpdate}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            variant="default"
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
}
