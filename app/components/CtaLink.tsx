import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import ActionArrow from "./ActionArrow";
import styles from "./CtaLink.module.css";

type CtaLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "inverse";
  direction?: "up-right" | "right" | "left";
  icon?: ReactNode;
  description?: string;
  stretch?: boolean;
};

export default function CtaLink({
  variant = "primary",
  direction,
  icon,
  description,
  stretch = false,
  className,
  children,
  ...props
}: CtaLinkProps) {
  const arrow = direction ?? (typeof props.href === "string" && props.href.startsWith("https://") ? "up-right" : "right");
  const arrowIcon = <span className={styles.arrow}><ActionArrow direction={arrow} /></span>;

  return (
    <Link
      {...props}
      data-cta={variant}
      className={[styles.cta, stretch && styles.stretch, className].filter(Boolean).join(" ")}
    >
      {arrow === "left" && arrowIcon}
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      <span className={styles.copy}>
        <span>{children}</span>
        {description && <span className={styles.description}>{description}</span>}
      </span>
      {arrow !== "left" && arrowIcon}
    </Link>
  );
}
