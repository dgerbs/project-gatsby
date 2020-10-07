import styled from 'styled-components';

const MenuItemStyles = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0 1.3rem;
  align-content: center;
  align-items: center;
  position: relative;
  .gatsby-image-wrapper {
    grid-row: span 2;
    height: 100%;
  }
  p {
    margin: 0;
  }
  button {
    font-size: 1.5rem;
    @media (max-width: 485px) {
      margin: 0 1rem 1rem 0;
    }
  }

  button + button {
    margin-left: 1rem;
    @media (max-width: 485px) {
        margin-left: 0;
      }
    }
  }

  .remove {
    background: none;
    color: var(--red);
    font-size: 3rem;
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: none;
    line-height: 1rem;
  }

  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

export default MenuItemStyles;
