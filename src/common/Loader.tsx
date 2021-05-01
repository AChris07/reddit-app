/** @jsxRuntime classic */
/** @jsx jsx */
import React, { HTMLAttributes } from "react";
import { jsx, css, withTheme, Theme } from "@emotion/react";

const loaderCss = (isVisible: boolean, theme: Theme) => css`
  display: ${isVisible ? "inline-block" : "none"};
  position: relative;
  width: 80px;
  height: 80px;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${theme.colors.tertiary} transparent transparent transparent;

    &:nth-of-type(1) {
      animation-delay: -0.45s;
    }

    &:nth-of-type(2) {
      animation-delay: -0.3s;
    }

    &:nth-of-type(3) {
      animation-delay: -0.15s;
    }
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export interface Props extends HTMLAttributes<HTMLElement> {
  isVisible: boolean;
  theme: Theme;
}

export type Ref = HTMLDivElement;

const Loader = React.forwardRef<Ref, Props>(
  ({ isVisible, theme }: Props, ref) => (
    <div ref={ref}>
      <div css={loaderCss(isVisible, theme)}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
);

export default withTheme(Loader);
