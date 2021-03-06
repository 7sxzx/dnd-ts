import styled from 'styled-components'
import mobileBackground from '../images/bg-mobile.jpg'
import background from '../images/stone-steps.jpg'

export const Main = styled.main`
  background-image: url(${mobileBackground});
  z-index: 1;
  position: relative;
  height: calc(100vh - 50px);
  padding: 15px;
  background-position: center;
  background-size: cover;

  @media (min-width: 800px) {
    background-color: #3c424e;
    background-blend-mode: overlay;
    background-image: url(${background});
  }
`
