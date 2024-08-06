// CustomInput.jsx
import React from 'react';

import styled from 'styled-components';

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    border-color: #5b9bd5;
    outline: none;
  }
`;

const CustomInput = (props) => {
  return <StyledInput {...props} />;
};

export default CustomInput;