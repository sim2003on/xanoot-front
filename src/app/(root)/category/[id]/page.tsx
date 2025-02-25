import type { Metadata } from 'next';

import { Catalog } from '@/components/layouts/ui/catalog/Catalog';

import { categoryService } from '@/services/category.service';
import { productService } from '@/services/product.service';

export const revalidate = 60;

// Вспомогательная функция для получения данных
async function getProducts(id: string) {
  const products = await productService.getByCategory(id);
  const category = await categoryService.getById(id);
  return { products, category };
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params; // Разрешаем Promise
  const { category, products } = await getProducts(id);

  return {
    title: category.title,
    description: category.description,
    openGraph: {
      images:
        products.length > 0 && products[0].images.length > 0
          ? [
              {
                url: products[0].images[0],
                width: 1000,
                height: 1000,
                alt: category.title
              }
            ]
          : []
    }
  };
}

export default async function CategoryPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // Разрешаем Promise
  const { category, products } = await getProducts(id);

  return (
    <div className="my-6">
      <Catalog
        title={category.title}
        description={category.description}
        products={products}
      />
    </div>
  );
}
