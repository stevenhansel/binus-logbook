import clsx from 'clsx';
import { TypographyVariant, TypographyVariantMap } from 'components/theme/typography';

interface Props {
  children: React.ReactNode;
  className?: string;
  variant?: TypographyVariant;
  center?: boolean;
}

export default function Typography(props: Props) {
  const { children, className, variant = 'body1', center = false } = props;

  return (
    <p
      className={clsx(TypographyVariantMap[variant], className, {
        'text-center': center,
      })}
    >
      {children}
    </p>
  );
}
