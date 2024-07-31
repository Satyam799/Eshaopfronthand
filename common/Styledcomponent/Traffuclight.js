import styled, { css } from "styled-components/native";

const Trafficlight = styled.View`
  height: 10px;
  width: 10px;
  padding: 10px;
  border-radius: 50px;

  ${(props) =>
    props.available &&
    css`
      background-color: #afec1a;
    `
  }
  ${(props) =>
    props.limited &&
    css`
      background-color: #dde033;
    `
  }
  ${(props) =>
    props.unavailable &&
    css`
      background-color: #ec241a;
    `
  }
`;

export default Trafficlight;
