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
  margin-bottom: 1em;
  text-align: center;
`;

export const AppListColumn = styled.section`
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${(props) => {
    const {
      theme: { colors },
    } = props;
    return `${colors.tertiary} ${colors.backgroundSecondary}`;
  }};

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.backgroundSecondary};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.tertiary};
    border-radius: 20px;
  }
`;

export const AppDetailSection = styled.section``;
