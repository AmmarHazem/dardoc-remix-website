import { Link, useLocation } from "@remix-run/react";
import { FC, HTMLAttributeAnchorTarget, MouseEventHandler, RefObject } from "react";

const VLink: FC<VLinkProps> = ({ children, linkRef, onClick, style, to, target, rel }) => {
  const { pathname } = useLocation();

  return (
    <Link
      rel={rel}
      target={target}
      ref={linkRef}
      style={style}
      to={pathname.startsWith("/v1/") ? `/v1${to}` : to}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

interface VLinkProps {
  to: string;
  linkRef?: RefObject<HTMLAnchorElement>;
  style?: React.CSSProperties;
  rel?: string;
  children: React.ReactNode;
  target?: HTMLAttributeAnchorTarget;
  onClick?: MouseEventHandler | undefined;
}

export default VLink;
