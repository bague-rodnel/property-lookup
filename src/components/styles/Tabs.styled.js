import styled from "styled-components";

export const TabsStyled = styled.div`
  .react-tabs__tab {
    border: none;

    &::after {
      position: absolute;
      content: "";
      width: 100%;
      height: 3px;
      bottom: 100%;
      left: 0;
      background: var(--color-theme);
      transition: transform 0.3s;
      transform: scaleX(0);
      transform-origin: center;
    }

    &:focus {
      box-shadow: none;
      border-color: var(--color-theme);
    }

    &.react-tabs__tab--selected .heading {
      color: var(--text-dark);
    }

    &.react-tabs__tab--selected::after {
      transform: scaleX(1);
    }
  }
`;
