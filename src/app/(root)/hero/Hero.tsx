import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/layouts/ui/Button';

import { PUBLIC_URL } from '@/config/url.config';

import { SITE_DESCRIPTION } from '@/constants/seo.constants';

import styles from './Hero.module.scss';

export function Hero() {
  return (
    <div className={styles.section}>
      <h1 className={styles.heading}>
        Your shopping, your pleasure – <span>all in one place</span>
      </h1>
      <p className={styles.description}>{SITE_DESCRIPTION}</p>
      <Link href={PUBLIC_URL.explorer()}>
        <Button variant="default">
          Shopping
          <ArrowRight />
        </Button>
      </Link>
    </div>
  );
}
