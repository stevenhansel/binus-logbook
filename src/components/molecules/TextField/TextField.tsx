import clsx from 'clsx';
import { Box, Typography } from 'components/atoms';
import { TypographyVariantMap } from 'components/theme/typography';

interface Props {
  value?: any;
  defaultValue?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type?: 'text' | 'email' | 'password';
  label?: string;
  className?: string;
  placeholder?: string;
  autoCorrect?: boolean;
  autoComplete?: boolean;
}

export default function TextField(props: Props) {
  const {
    className,
    onChange,
    value = '',
    defaultValue,
    type = 'text',
    label,
    placeholder,
    autoCorrect,
    autoComplete,
  } = props;

  return (
    <Box>
      {label ? <Typography className="mb-0.5">{label}</Typography> : null}

      <input
        className={clsx(
          'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
          TypographyVariantMap.body1,
          className,
        )}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        autoCorrect={autoCorrect ? 'on' : 'off'}
        autoComplete={autoComplete ? 'on' : 'off'}
      />
    </Box>
  );
}
