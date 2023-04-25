import React from 'react';

const Button = ({ onClick, children }: React.ComponentProps<'button'>) => {
  return (
    <button onClick={onClick} type="button">
      {children}
    </button>
  );
};

export default Button;
