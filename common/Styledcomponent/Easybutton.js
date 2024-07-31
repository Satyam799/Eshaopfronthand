import styled, { css } from "styled-components/native"; // Use styled-components/native for React Native

const Easybutton = styled.TouchableOpacity`
  flex-direction: row;
  border-radius: 3px;
  padding: 10px;
  margin: 5px;
  justify-content: center;
  background-color: transparent;

  ${(props)=>
    props.primary &&
    css`
      background-color:#5cb85c;
    `}

  ${(props)=>
    props.secondry &&
    css`
      background-color: #62b1f6;
    `}



    ${(props)=>
    props.dangerous &&
    css`
      background-color: #f40185;
    `}

    ${(props)=>
    props.large &&
    css`
      width:135px;
    `}

${(props)=>
    props.medium &&
    css`
      width:100px;
    `}

${(props)=>
    props.small &&
    css`
      width:40px;
    `}
`;

export default Easybutton;
