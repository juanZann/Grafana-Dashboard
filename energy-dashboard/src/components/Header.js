// src/components/Header.js
import React from 'react';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';

const Header = () => {
  return (
    <StyledHeader>
      <img src="/eficia-logo.png" alt="Eficia Logo" style={{ width: '100px', marginBottom: '20px' }} />
      <Typography variant="h4">Place Management System</Typography>
    </StyledHeader>
  );
};

const StyledHeader = styled('div')({
  textAlign: 'center',
  padding: '20px',
});

export default Header;

