import { PropsWithChildren, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Rating } from 'react-simple-star-rating';

import { useCreateReview } from '@/hooks/queries/reviews/useCreateReview';

import { IReviewInput } from '@/shared/types/review.interface';

import { Button } from '../Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../Dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../form-elements/Form';
import { Textarea } from '../Textarea';

interface ReviewModalProps {
  storeId: string;
}

export function ReviewModal({
  children,
  storeId
}: PropsWithChildren<ReviewModalProps>) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<IReviewInput>({
    mode: 'onChange'
  });

  const { createReview, isLoadingCreate } = useCreateReview(storeId);

  const onSubmit: SubmitHandler<IReviewInput> = data => {
    createReview(data);
    form.reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create review</DialogTitle>
          <DialogDescription>
            For creating a review, you need to specify a rating and text
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="rating"
              rules={{
                required: 'Rating is required'
              }}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Rating
                      onClick={field.onChange}
                      initialValue={field.value}
                      SVGstyle={{
                        display: 'inline-block'
                      }}
                      size={20}
                      transition
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="text"
              rules={{
                required: 'Text is required'
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Review text"
                      disabled={isLoadingCreate}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button variant="default" disabled={isLoadingCreate}>
                Add
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
