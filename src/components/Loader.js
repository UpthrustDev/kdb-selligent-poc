// src/components/Loader.js

import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for rotation animation
const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

// Keyframes for dash animation
const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

// Styled component for loader container
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Styled component for spinner
const Spinner = styled.svg`
  animation: ${rotate} 2s linear infinite;
  width: 50px;
  height: 50px;
`;

// Styled component for circle path
const Path = styled.circle`
  stroke: #0071e9; /* Keytrade Bank Blue */
  stroke-linecap: round;
  animation: ${dash} 1.5s ease-in-out infinite;
  fill: none;
  stroke-width: 5;
`;

const Loader = () => (
  <LoaderContainer>
    <Spinner viewBox="0 0 50 50">
      <Path cx="25" cy="25" r="20" />
    </Spinner>
  </LoaderContainer>
);

export default Loader;
