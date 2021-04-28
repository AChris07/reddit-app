import styled from "@emotion/styled";

export const AppContainer = styled.div`
  background-color: ${(props) => props.theme.colors.backgroundPrimary};
  color: ${(props) => props.theme.colors.primary};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const AppHeader = styled.header`
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  border: 1.5px solid ${(props) => props.theme.colors.secondary};
  padding: 1em 1.5em;
  text-align: center;
`;

export const AppListColumn = styled.section``;

export const AppDetailSection = styled.section``;
