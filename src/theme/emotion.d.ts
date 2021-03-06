import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      backgroundPrimary: string;
      backgroundSecondary: string;
      backgroundTertiary: string;
      primary: string;
      secondary: string;
      tertiary: string;
    };
    typography: {
      mainFont: string;
    };
  }
}
