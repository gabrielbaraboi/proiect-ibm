import styled from "styled-components";

export const Box = styled.div`
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
  color: #4a4a4a;
  display: block;
  padding: 1.25rem;
`

export const Label = styled.div`
  color: #363636;
  display: block;
  font-size: 1rem;
  font-weight: 500;
  padding: 6px 0 3px 0;
`

export const Control = styled.div`
  box-sizing: border-box;
  clear: both;
  font-size: 1rem;
  position: relative;
  text-align: inherit;
`

export const Field = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`