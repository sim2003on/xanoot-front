'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Button } from '@/components/layouts/ui/Button';
import { DataTable } from '@/components/layouts/ui/data-table/DataTable';
import DataTableLoading from '@/components/layouts/ui/data-table/DataTableLoading';
import { Heading } from '@/components/layouts/ui/Heading';

import { STORE_URL } from '@/config/url.config';

import { useGetProducts } from '@/hooks/queries/products/useGetProducts';

import { formatPrice } from '@/utils/string/format-price';

import styles from '../Store.module.scss';

import { IProductColumn, productColumns } from './ProductColumns';

export function Products() {
  const params = useParams<{ storeId: string }>();

  const { products, isLoading } = useGetProducts();

  const formattedProducts: IProductColumn[] = products
    ? products.map(product => ({
        id: product.id,
        title: product.title,
        price: formatPrice(product.price),
        category: product.category.title,
        color: product.color.value,
        storeId: 'dzeq ape esi'
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
              title={`Products (${products?.length})`}
              description="All products of your store"
            />
            <div className={styles.buttons}>
              <Link href={STORE_URL.productCreate(params.storeId)}>
                <Button variant="default">
                  <Plus />
                  Create
                </Button>
              </Link>
            </div>
          </div>
          <div className={styles.table}>
            <DataTable
              columns={productColumns}
              data={formattedProducts}
              filterKey="title"
            />
          </div>
        </>
      )}
    </div>
  );
}
