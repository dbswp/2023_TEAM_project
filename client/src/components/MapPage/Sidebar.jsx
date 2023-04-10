import React from "react";
import { BiMenu } from "react-icons/bi";
import styled from "styled-components";
styled;

const Container = styled.div`
  flex: 1;
  height: 100vh;
  width: 60px;
  background-color: orange;
`;

export default function Sidebar() {
  return (
    <Container>
      <Sidebar>
        <BiMenu />
      </Sidebar>
    </Container>
  );
}
