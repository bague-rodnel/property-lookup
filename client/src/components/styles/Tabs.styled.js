import styled from "styled-components";

export const TabsStyled = styled.div`
  .tab-list {
    border-bottom: 1px solid #ff7201;
    padding-left: 0;
  }

  .tab-list-item {
    list-style: none;
    margin-bottom: -1px;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    ${"" /* background: #e9ebec; */}
    color: #666;
    border-bottom: 1px solid #ff7201;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
  }

  .tab-list-active {
    border: solid #ff7201;
    border-width: 1px 1px 0 1px;
    border-bottom: 1px solid transparent;
    background: white;
    color: #333333;
  }

  .tab-list-item .tab-list__pill {
    background-color: #a8a8a8;

    color: white;
    font-size: 0.6rem;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tab-list__pill.pill-active {
    background-color: #ff7201;
  }
`;
