import React from 'react';
import styled from 'styled-components';
import { Container, Typography } from '@material-ui/core';

const Wrapper = styled.header`
  background: ${({ theme }) => theme.primary.background};
  padding: ${({ theme }) => theme.spacing(2, 2)};
`;

const HeaderLink = styled.a`
  padding: ${({ theme }) => theme.spacing(1, 1)};
`;

const Header = () => {
  return (
    <Wrapper>
      <Container>
        <Typography variant="h6" align="center" component="h2">
          <HeaderLink
            href="https://github.com/frantallukas10/youtu-get"
            target="_blank"
          >
            github link
          </HeaderLink>
        </Typography>
        <Typography variant="h6" align="center" component="h2">
          <HeaderLink
            href="https://www.npmjs.com/package/youtu-get"
            target="_blank"
          >
            npm link
          </HeaderLink>
        </Typography>
      </Container>
    </Wrapper>
  );
};

export default Header;
