import styled from "styled-components";

export const PropertyListStyled = styled.div`
  .card {
    border: none;
    cursor: pointer;

    .property-image {
      border-radius: 0;
    }

    .card-body {
      padding-left: 0;
      padding-right: 0;
    }

    .card-text {
      color: var(--text-dark);
      font-size: 1.2rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .address {
      color: var(--text-light);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .address-pin {
      color: var(--color-theme);
    }

    &::after {
      position: absolute;
      content: "";
      width: 100%;
      height: 3px;
      top: 100%;
      left: 0;
      background: var(--color-theme);
      transition: transform 0.5s;
      transform: scaleX(0);
      transform-origin: center;
    }

    &:hover::after {
      transform: scaleX(1);
    }
  }
`;
