import styles from './Skeleton.module.css';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={`${styles.skeleton} ${className || ''}`} />;
}

export function SkeletonText({ width = '100%' }: { width?: string }) {
  return (
    <div
      className={`${styles.skeleton} ${styles.skeletonText}`}
      style={{ width }}
    />
  );
}

export function SkeletonTitle() {
  return <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />;
}

export function SkeletonAvatar({ size = 48 }: { size?: number }) {
  return (
    <div
      className={`${styles.skeleton} ${styles.skeletonAvatar}`}
      style={{ width: size, height: size }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className={`${styles.skeleton} ${styles.skeletonCard}`}>
      <div className={styles.cardSkeleton}>
        <div className={styles.cardSkeletonHeader}>
          <SkeletonAvatar size={40} />
          <div style={{ flex: 1 }}>
            <SkeletonText width="40%" />
            <div style={{ height: 8 }} />
            <SkeletonText width="60%" />
          </div>
        </div>
        <div className={styles.cardSkeletonContent}>
          <SkeletonText width="100%" />
          <SkeletonText width="80%" />
          <SkeletonText width="60%" />
        </div>
        <div className={styles.cardSkeletonFooter}>
          <div className={`${styles.skeleton} ${styles.tagSkeleton}`} />
          <div className={`${styles.skeleton} ${styles.tagSkeleton}`} />
        </div>
      </div>
    </div>
  );
}

export function SkillCardSkeleton() {
  return <CardSkeleton />;
}

export function RoleCardSkeleton() {
  return <CardSkeleton />;
}

export function ContractCardSkeleton() {
  return <CardSkeleton />;
}

export function CommandCardSkeleton() {
  return <CardSkeleton />;
}