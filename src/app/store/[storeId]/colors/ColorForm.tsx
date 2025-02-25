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

import { useCreateColor } from '@/hooks/queries/colors/useCreateColor';
import { useDeleteColor } from '@/hooks/queries/colors/useDeleteColor';
import { useUpdateColor } from '@/hooks/queries/colors/useUpdateColor';

import { IColor, IColorInput } from '@/shared/types/color.interface';

import styles from '../Store.module.scss';

interface ColorFormProps {
  color?: IColor;
}

export function ColorForm({ color }: ColorFormProps) {
  const { createColor, isLoadingCreate } = useCreateColor();
  const { updateColor, isLoadingUpdate } = useUpdateColor();
  const { deleteColor, isLoadingDelete } = useDeleteColor();

  const title = color ? 'Change color' : 'Create color';
  const description = color ? 'Change color data' : 'Add new color';
  const action = color ? 'Save' : 'Create';

  const form = useForm<IColorInput>({
    mode: 'onChange',
    values: {
      name: color?.name || '',
      value: color?.value || ''
    }
  });

  const onSubmit: SubmitHandler<IColorInput> = data => {
    if (color) updateColor(data);
    else createColor(data);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Heading title={title} description={description} />
        {color && (
          <ConfirmModal handleClick={() => deleteColor()}>
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
              name="name"
              rules={{
                required: 'Name is required'
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Color name"
                      disabled={isLoadingCreate || isLoadingUpdate}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              rules={{
                required: 'Value is required'
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Color value"
                      disabled={isLoadingCreate || isLoadingUpdate}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
