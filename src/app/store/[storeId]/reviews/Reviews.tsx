'use client';

import { DataTable } from '@/components/layouts/ui/data-table/DataTable';
import DataTableLoading from '@/components/layouts/ui/data-table/DataTableLoading';
import { Heading } from '@/components/layouts/ui/Heading';

import { useGetReviews } from '@/hooks/queries/reviews/useGetReviews';

import { formatDate } from '@/utils/date/format-date';

import styles from '../Store.module.scss';

import { IReviewColumn, reviewColumns } from './ReviewColumns';

export function Reviews() {
  const { reviews, isLoading } = useGetReviews();

  const formattedReviews: IReviewColumn[] = reviews
    ? reviews.map(review => ({
        id: review.id,
        createdAt: formatDate(review.createdAt),
        rating: Array.from({ length: review.rating })
          .map(() => '⭐️')
          .join(' '),
        username: 'dzeq ape esi review.user.name-n chi ashxatum'
      }))
    : [];

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <DataTableLoading />
      ) : (
        <>
          <div className={styles.header}>
            <Heading
              title={`Reviews (${reviews?.length})`}
              description="All reviews of your store"
            />
          </div>
          <div className={styles.table}>
            <DataTable columns={reviewColumns} data={formattedReviews} />
          </div>
        </>
      )}
    </div>
  );
}
