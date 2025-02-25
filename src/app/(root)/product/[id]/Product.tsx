'use client';

import { useQuery } from '@tanstack/react-query';

import { Catalog } from '@/components/layouts/ui/catalog/Catalog';

import { productService } from '@/services/product.service';

import { IProduct } from '@/shared/types/product.interface';

import { ProdcutGallery } from './prodcut-gallery/ProdcutGallery';
import { ProductInfo } from './product-info/ProductInfo';
import { ProductReviews } from './product-reviews/ProductReviews';
import styles from './Product.module.scss';

interface ProductProps {
  initialProduct: IProduct;
  similarProducts: IProduct[];
  id?: string;
}

export function Product({
  initialProduct,
  similarProducts,
  id = ''
}: ProductProps) {
  const { data: product } = useQuery({
    queryKey: ['product', initialProduct.id],
    queryFn: () => productService.getById(id),
    initialData: initialProduct,
    enabled: !!id
  });

  return (
    <div className={styles.product_page}>
      <div className={styles.content}>
        <div className={styles.blocks}>
          <ProdcutGallery product={product} />
          <ProductInfo product={product} />
        </div>
      </div>
      <Catalog title="You may also like" products={similarProducts} />
      <ProductReviews product={product} />
    </div>
  );
}
