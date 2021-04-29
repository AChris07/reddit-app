/** @jsxRuntime classic */
/** @jsx jsx */
import React, { HTMLAttributes } from "react";
import { jsx, Theme } from "@emotion/react";

export interface Props extends HTMLAttributes<HTMLElement> {
  icon?: string;
  text?: React.ReactNode;
}

function IconButton({ icon, text, ...props }: Props) {
  const iconElement = icon && (
    <span className="icon">
      <i className={`fas ${icon}`} />
    </span>
  );
  const textElement = text && <span>{text}</span>;

  return (
    <button
      className="button"
      type="button"
      css={(theme: Theme) => ({
        backgroundColor: theme.colors.backgroundSecondary,
        color: theme.colors.tertiary,
        border: "none",
      })}
      {...props}
    >
      {iconElement}
      {textElement}
    </button>
  );
}

export default IconButton;
