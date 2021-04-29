import { Theme } from "@emotion/react";

export default (theme: Theme) => ({
  body: {
    color: theme.colors.primary,
    fontFamily: theme.typography.mainFont,
    h1: {
      fontSize: "24px",
    },
    h2: {
      fontSize: "22px",
    },
    h3: {
      fontSize: "20px",
    },
    h4: {
      fontSize: "18px",
    },
  },
});
