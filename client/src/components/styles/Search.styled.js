import styled from "styled-components";

export const SearchStyled = styled.div`
  form {
    margin: 1.6rem 0 3rem;
  }

  .input-group {
    width: clamp(240px, 66vw, 480px);
    margin: 0 auto;
    display: flex;
  }

  .searchBox {
    flex: 1;

    border-width: 1px 0 0 1px;
    border-color: white;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    padding-left: 0.5rem;
  }

  .searchBox:active,
  .searchBox:focus {
    border: 1px solid var(--color-theme);
    outline: none;
  }

  .btn-primary {
    background: var(--color-theme);
    outline: none;
    border: 1px solid var(--color-theme);
  }

  .btn-primary:active,
  .btn-primary:focus {
    outline: none;
    box-shadow: none;
  }

  .btn-primary:active {
    transform: scale(0.98);
  }

  .best-match-header {
    margin-bottom: 1rem;

    display: flex;
    align-items: center;
    gap: 0.5rem;

    .logo {
      width: 64px;
      height: 64px;
    }
  }

  .user-card {
    margin-bottom: 1rem;

    display: flex;
    align-items: center;
    gap: 0.5rem;

    .avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .header {
        display: flex;
        align-items: center;

        .fullname {
          font-size: 1.2rem;
          font-weight: 500;
          margin-bottom: 0;
          color: var(--text-dark);
        }
        .follow {
          margin-left: 0.25rem;
          color: var(--color-theme);
        }
      }

      p {
        color: var(--text-light);
        margin-bottom: 0;
      }
    }
  }
`;
