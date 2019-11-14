import React from 'react';
import styled from 'styled-components';
import { Container, Typography } from '@material-ui/core';

const Wrapper = styled.header`
  background: ${({ theme }) => theme.primary.background};
  padding: ${({ theme }) => theme.spacing(3, 4)};
`;

const HeaderLink = styled.a`
  font-weight: bold;
  padding: ${({ theme }) => theme.spacing(3, 4)};
`;

const Header = () => {
  return (
    <Wrapper>
      <Container>
        <Typography variant="h2" align="center" component="h2">
          <HeaderLink href="https://github.com/frantallukas10/youtu-get">
            youtu-get
          </HeaderLink>
        </Typography>
      </Container>
    </Wrapper>
  );
};

export default Header;
