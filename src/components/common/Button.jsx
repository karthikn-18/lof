import clsx from 'clsx';
import { Link } from 'react-router-dom';

const Button = ({ to, children, variant = 'primary', className, ...props }) => {
  const buttonClasses = clsx('btn btn-primary custom-btn', {
    'btn-secondary': variant === 'secondary',
  }, className);

  if (to) {
    return (
      <Link to={to} className={buttonClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
