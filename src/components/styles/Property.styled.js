import styled from "styled-components";

export const PropertyStyled = styled.div`
  h1 {
    margin-bottom: 2rem;
    font-weight: 700;
  }

  ul {
    padding-left: 0;
    margin-bottom: 0.5rem;
  }

  .tablist {
    margin-bottom: 0;

    .heading {
      padding-top: 0.25rem;
      font-size: 14px;
      color: var(--text-light);
    }
  }

  .details {
    .specifics {
      margin-bottom: 1.5rem;

      .label {
        color: var(--text-light);
      }
    }

    .about-heading {
      font-size: 1.2rem;
    }

    .about-description {
      font-size: 0.9rem;
    }
  }

  .inclusions {
    .heading {
      font-size: 1.2rem;
      display: flex;
      gap: 0.2rem;
      align-items: center;
    }
  }

  .pricing {
    padding-top: 1rem;

    .price {
      font-family: var(--font-family-numbers);
    }

    .price + p {
      color: var(--text-light);
      margin-bottom: 0;
    }
    .btn {
      margin-top: 1.6rem;
      width: 100%;
      background-color: var(--color-theme);
      border: none;

      &:focus {
        box-shadow: none;
        outline: none;
        border: none;
      }
      &:active {
        transform: scale(0.99);
      }
    }
  }
`;
