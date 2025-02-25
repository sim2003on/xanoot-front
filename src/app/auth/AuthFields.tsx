'use client';

import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/layouts/ui/form-elements/Form';
import { Input } from '@/components/layouts/ui/form-elements/Input';

import { validEmail } from '@/shared/regex';
import { IAuthForm } from '@/shared/types/auth.interface';

interface AuthFieldsProps {
  form: UseFormReturn<IAuthForm, undefined>;
  isPending: boolean;
  isReg?: boolean;
}

export function AuthFields({
  form,
  isPending,
  isReg = false
}: AuthFieldsProps) {
  return (
    <>
      {isReg && (
        <FormField
          control={form.control}
          name="name"
          rules={{
            required: 'Name required'
          }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="John" disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name="email"
        rules={{
          required: 'Mail is required',
          pattern: {
            value: validEmail,
            message: 'Enter valid email'
          }
        }}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="jonh@examle.com"
                type="email"
                disabled={isPending}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        rules={{
          required: 'Password required',
          minLength: {
            value: 6,
            message: 'Minimum 6 characters'
          }
        }}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="******"
                type="password"
                disabled={isPending}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
