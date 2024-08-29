import { NavLink, useLocation } from "@remix-run/react";
import { FC, HTMLAttributeAnchorTarget, MouseEventHandler } from "react";

const VNavLink: FC<VNavLinkProps> = ({ className, children, target, onClick, onMouseEnter, rel, to }) => {
  const { pathname } = useLocation();

  return (
    <NavLink
      to={pathname.startsWith("/v1/") ? `/v1${to}` : to}
      rel={rel}
      target={target}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={className}
    >
      {children}
    </NavLink>
  );
};

interface VNavLinkProps {
  to: string;
  rel: string;
  target?: HTMLAttributeAnchorTarget;
  children: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler;
  onMouseEnter?: MouseEventHandler;
}

export default VNavLink;
