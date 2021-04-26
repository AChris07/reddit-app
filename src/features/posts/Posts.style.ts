import styled from "@emotion/styled";

export const PostListContainer = styled.ul`
  list-style: none;
  background-color: ${(props) => props.theme.colors.backgroundPrimary};
  margin: 0;
  padding: 10px;
  text-align: center;
`;

export const PostElementContainer = styled.li`
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  color: ${(props) => props.theme.colors.primary};
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
`;

const PostElementSection = styled.section`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
`;

export const PostElementBody = styled(PostElementSection)`
  ::after {
    content: ">";
    position: absolute;
    right: 15px;
  }
`;
export const PostElementHeader = PostElementSection.withComponent("header");
export const PostElementFooter = styled(
  PostElementSection.withComponent("footer")
)`
  justify-content: space-around;
`;

export const PostAuthor = styled.h2`
  margin-left: 0.5em;
  margin-right: 1em;
`;

export const PostEntryDate = styled.h3`
  color: ${(props) => props.theme.colors.secondary};
`;

export const PostTitle = styled.h4`
  margin-left: 0.5em;
`;

export const PostCommentNumber = styled.span`
  color: ${(props) => props.theme.colors.tertiary};
`;