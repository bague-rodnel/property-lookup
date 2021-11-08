import styled from "styled-components";

const size = 36;
export const MapStyled = styled.div`
  .the-place {
    width: ${size}px;
    height: ${size}px;
    background-size: cover;
    cursor: pointer;
    transform: translate(${-size / 2}px,${-size}px)}}

    p {
      position: absolute;
      top: 100%;
      font-weight: 500;
    }
  }
`;
