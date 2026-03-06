import { MouseEvent, AnchorHTMLAttributes } from 'react';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

const Anchor = ({ children, className = '', onClick, ...props }: Props) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onClick?.(e)
  }

  return (
    <a
      href='#'
      onClick={handleClick}
      className={`block ${className}`.trim()}
      {...props}
    >
      {children}
    </a>
  )
}

export default Anchor;
