import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@/components/layouts/ui/Button';

import { PUBLIC_URL } from '@/config/url.config';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import styles from '../hero/Hero.module.scss';

export const metadata: Metadata = {
  title: 'Thanks for your purchase',
  ...NO_INDEX_PAGE
};

export default function ThanksPage() {
  return (
    <div className={styles.section}>
      <h1 className={styles.heading}>Thanks for your purchase</h1>
      <p className={styles.description}>
        Thank you for your order! We appreciate your trust and will do our best
        efforts to deliver your order as soon as possible
      </p>
      <Link href={PUBLIC_URL.home()}>
        <Button variant="default">
          Home
          <ArrowRight />
        </Button>
      </Link>
    </div>
  );
}
