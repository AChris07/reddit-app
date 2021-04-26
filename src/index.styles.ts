import { Theme } from "@emotion/react";

export default (theme: Theme) => ({
  body: {
    color: theme.colors.primary,
    fontFamily: theme.typography.mainFont,
  },
});
