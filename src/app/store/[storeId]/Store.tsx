'use client';

import { Heading } from '@/components/layouts/ui/Heading';

import { MainStatistics } from './statistics/main-statistics/MainStatistics';
import { MiddleStatistics } from './statistics/middle-statistics/MiddleStatistics';
import styles from './Store.module.scss';

export function Store() {
  return (
    <div className={styles.wrapper}>
      <Heading title="Statistics" />
      <MainStatistics />
      <MiddleStatistics />
    </div>
  );
}
