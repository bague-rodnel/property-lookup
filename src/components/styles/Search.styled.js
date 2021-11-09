import styled from "styled-components";

export const SearchStyled = styled.div`
  header {
    height: 812px;
    max-height: 100vh;
    background: rgb(255, 115, 1);
    background: linear-gradient(
        49deg,
        rgba(255, 115, 1, 0.3) 0%,
        rgba(255, 180, 93, 0.1) 100%
      ),
      url(/images/houses.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    transition: height 0.5s ease-out;

    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;

    &.retract {
      height: 100px;
      background: linear-gradient(
          49deg,
          rgba(255, 115, 1, 0.9) 0%,
          rgba(255, 180, 93, 0.7) 100%
        ),
        url(/images/houses.png);

      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;

      h1 {
        display: none;
      }
    }

    h1 {
      color: white;
      font-size: 2.5rem;
      margin-bottom: 2rem;

      .big-text {
        font-size: 3.2rem;
      }
    }

    form {
      padding-left: 10px;
      padding-right: 10px;
      max-width: 620px;
      width: 100%;
      margin: 0 auto;
      transition: top 0.5s ease-out;

      .input-group {
        display: flex;
      }

      .search-box {
        flex: 1;

        border-width: 1px 0 0 1px;
        border-color: white;
        border-top-left-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
        padding-left: 0.5rem;

        &:active,
        &:focus {
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
  }

  .search-results {
    padding-top: 2rem;
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
