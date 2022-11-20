import clsx from 'clsx';
import { SpinnerCircularFixed } from 'spinners-react';
import Typography from '../Typography';

interface Props {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

export default function Button(props: Props) {
  const { className, children, disabled, loading } = props;

  // TODO: handle loading abs position when button size changes
  return (
    <button
      className={clsx(
        'bg-black text-white rounded-md py-1 w-32 h-10 relative ease-in-out duration-300 hover:opacity-75 hover:cursor-pointer',
        className,
        {
          'opacity-50': disabled,
        },
      )}
    >
      {loading ? (
        <SpinnerCircularFixed
          className="absolute left-[17.5px]"
          size={20}
          thickness={200}
          speed={150}
          color="rgba(180, 60, 60, 1)"
          secondaryColor="rgba(0, 0, 0, 0.50)"
        />
      ) : null}

      <Typography center>{children}</Typography>
    </button>
  );
}
