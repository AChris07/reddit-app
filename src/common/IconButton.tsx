/** @jsxRuntime classic */
/** @jsx jsx */
import React, { HTMLAttributes } from "react";
import { jsx, css, withTheme, Theme } from "@emotion/react";

export interface Props extends HTMLAttributes<HTMLElement> {
  icon?: string;
  text?: React.ReactNode;
  theme: Theme;
}

const buttonCss = (theme: Theme) => css`
  background-color: ${theme.colors.backgroundSecondary};
  color: ${theme.colors.tertiary};
  border: none;
  border-radius: 5px;

  :hover {
    background-color: ${theme.colors.backgroundTertiary};
    color: ${theme.colors.tertiary};
  }
`;

function IconButton({ icon, text, theme, ...props }: Props) {
  const iconElement = icon && (
    <span className="icon">
      <i className={`fas ${icon}`} />
    </span>
  );
  const textElement = text && <span>{text}</span>;

  return (
    <button className="button" type="button" css={buttonCss(theme)} {...props}>
      {iconElement}
      {textElement}
    </button>
  );
}

export default withTheme(IconButton);
