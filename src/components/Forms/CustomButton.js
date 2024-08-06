// CustomInput.jsx
import React from "react"

import styled from "styled-components"

export const StyledButton = styled.button`
  background-color: #0095db;
  color: white;
  padding: 10px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #007bbd;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

const CustomButton = props => {
  return <StyledButton {...props} />
}

export default CustomButton
