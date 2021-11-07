import styled from "styled-components";

export const SearchStyled = styled.div`
  form {
    width: 90%;
    max-width: 620px;
    margin: 1.6rem auto 3rem;

    .input-group {
      display: flex;
    }

    .searchBox {
      flex: 1;

      border-width: 1px 0 0 1px;
      border-color: white;
      border-top-left-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
      padding-left: 0.5rem;

      &:active,
      &:focus {
        border: 1px solid var(--color-theme);
        outline: none;
      }
    }

    .btn-primary {
      background: var(--color-theme);
      outline: none;
      border: 1px solid var(--color-theme);

      display: flex;
      gap: 0.2rem;
      align-items: center;

      &:active,
      &:focus {
        outline: none;
        box-shadow: none;
      }

      &:active {
        transform: scale(0.98);
      }
    }
  }

  .search-results {
    min-height: 100vh;
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

  .no-matches-msg {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
  }
`;
