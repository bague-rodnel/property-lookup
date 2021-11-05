import styled from "styled-components";

export const PropertyListStyled = styled.div`
  .card {
    border: none;
    cursor: pointer;

    .card-body {
      padding-left: 0;
      padding-right: 0;
    }

    .card-text {
      color: #222222;
      font-size: 1.2rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .address {
      color: #666;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .address-pin {
      color: #ff7300;
    }

    &::after {
      position: absolute;
      content: "";
      width: 100%;
      height: 3px;
      top: 100%;
      left: 0;
      background: #ff7000;
      transition: transform 0.5s;
      transform: scaleX(0);
      transform-origin: center;
    }

    &:hover::after {
      transform: scaleX(1);
    }
  }
`;
