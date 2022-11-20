import React from 'react';

interface Props {
  children?: React.ReactNode;
  className?: string;
}

export default function Box(props: Props) {
  const { children, className } = props;

  return <div className={className}>{children}</div>;
}
