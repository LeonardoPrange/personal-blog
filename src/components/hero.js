import React, { useState, useEffect } from "react"
import styled, { css, keyframes } from "styled-components"
import { transparentize } from "polished"
import { Wrapper, Overlay, LinkButton } from "../components/style"
import BackgroundImage from "gatsby-background-image"

export const Hero = ({ hero }) => {
  const [text, setText] = useState('');

  const typeWriter = (text, i = 0) => {
    if (i < hero.textline?.length) {
      setText(text.slice(0, i + 1));
      setTimeout(() => {
        typeWriter(text, i + 1);
      }, 100);
    }
  };

  useEffect(() => {
    typeWriter(hero.textline);
  }, []);
  return (
    <HeroWrapper>
      <HeroBackground>
        {hero.overlay && <Overlay />}
        {hero.image && (
          <HeroImage fluid={hero.image.childImageSharp.fluid}></HeroImage>
        )}
      </HeroBackground>
      {(hero.headline || hero.textline || hero.ctas) && (
        <HeroContent large={hero.large}>
          <Wrapper>
            {hero.headline && <Headline>{hero.headline}</Headline>}
            {text && <Textline>{text}</Textline>}
            {hero.ctas && (
              <Actions>
                {Object.keys(hero.ctas).map(key => {
                  return (
                    <LinkButton
                      primary={hero.ctas[key].primary}
                      to={hero.ctas[key].link}
                    >
                      {hero.ctas[key].label}
                      {hero.ctas[key].arrow && <span>&nbsp;&nbsp;→</span>}
                    </LinkButton>
                  )
                })}
              </Actions>
            )}
          </Wrapper>
        </HeroContent>
      )}
    </HeroWrapper>
  )
}

const HeroWrapper = styled.div`
  position: relative;
  flex: 0 0 auto;
  top: 0;
  padding-top: ${props => props.theme.header.height};
  min-height: calc(
    ${props => props.theme.header.height} +
      ${props => props.theme.header.height}
  );

  ${props =>
    props.theme.hero.parallax &&
    css`
      transform-style: preserve-3d;
    `}
`

const HeroContent = styled.div`
  display: block;
  padding: 3rem 0;

  ${props =>
    props.large &&
    css`
      padding: 8rem 0;
    `}
`

const HeroBackground = styled.div`
  position: absolute !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: -${props => props.theme.hero.overlap};
  z-index: -1;
  background-color: ${props => transparentize(0.1, props.theme.color.primary)};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 0;

  ${Overlay} {
    z-index: 1;
  }

  ${props =>
    props.theme.hero.parallax &&
    css`
      transform-style: preserve-3d;
      transform: translateZ(-1px) scale(2) translateY(25%);
    `}
`

export const Headline = styled.h2`
  font-size: 2.6em;
  line-height: 1.2;
  color: ${props => props.theme.color.white};
  word-spacing: 1px;
  font-weight: 700;
  text-transform: none;
`
const blinkTextCursor = keyframes`
  from {border-right-color: ${props => props.theme.color.secondary};}
  to {border-right-color: transparent}
`;

export const Textline = styled.p`
  font-size: 1.3rem;
  line-height: 1.2;
  color: ${props => props.theme.color.secondary};
  word-spacing: 1px;
  font-weight: 500;
  text-transform: none;
  border-right: 2px solid ${props => props.theme.color.secondary};
  display: inline;
  padding-bottom: 0.3rem;
  animation: ${blinkTextCursor} 0.7s steps(44) infinite normal;
`

export const Actions = styled.div`
padding-top: 0.5rem;  
padding-bottom: 0.5rem;
  > * {
    margin-right: 1rem;
  }
`

export const HeroImage = styled(BackgroundImage)`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`
