import { Button as Component } from "flowbite-react";

type ButtonProps = {
  className: string;
  color?: string;
  size?: string;
  title: string;
  isProcessing: boolean;
  children?: React.ReactNode;
  onClick: () => void;
};

export const Button = ({
  className,
  color,
  size,
  title,
  isProcessing,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <Component
      isProcessing={isProcessing}
      color={color}
      size={size}
      onClick={onClick}
      className={className}
    >
      {title}
      {children}
    </Component>
  );
};
