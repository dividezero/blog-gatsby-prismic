import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import { Layout, Listing, Wrapper, Title } from '../components'
import website from '../../config/website'

const Hero = styled.header`
  background-color: ${props => props.theme.colors.greyLight};
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`

const HeroInner = styled(Wrapper)`
  position: absolute;
  padding-top: 13rem;
  padding-bottom: 13rem;
  overflow: hidden;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  h1,
  p,
  a {
    color: ${props => props.theme.colors.greyLight};
  }
  @media (max-width: ${props => props.theme.breakpoints.l}) {
    padding-top: 10rem;
    padding-bottom: 10rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    padding-top: 8rem;
    padding-bottom: 8rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
`

const HeroVideo = styled.video`
  position: relative;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: 0;
`

const HeroOverlay = styled.div`
  position: absolute;
  min-height: 100%;
  min-width: 100%;
  width: auto;
  height: auto;
  background-color: black;
  opacity: 0.5;
  z-index: 1;
`

const HeroText = styled.div`
  font-size: 1.7rem;
  line-height: 1.4;
  // margin-bottom: 2rem;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    font-size: 1.4rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    font-size: 1.25rem;
  }
`

const Social = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  margin-left: 0;
  font-family: 'Source Sans Pro', -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  li {
    display: inline;
    &:not([data-name='social-entry-0']) {
      margin-left: 2.5rem;
      @media (max-width: ${props => props.theme.breakpoints.s}) {
        margin-left: 1.75rem;
      }
    }
    a {
      font-style: normal;
      color: ${props => props.theme.colors.white};
      font-size: 1.333rem;
      font-weight: 600;
      &:hover,
      &:focus {
        color: ${props => props.theme.colors.primary};
        text-decoration: none;
      }
      @media (max-width: ${props => props.theme.breakpoints.s}) {
        font-size: 1.2rem;
      }
    }
  }
`

const ProjectListing = styled.ul`
  list-style-type: none;
  margin-left: 0;
  margin-top: 4rem;
  li {
    margin-bottom: 1.45rem;
    a {
      font-size: 2.369rem;
      font-style: normal;
      color: ${props => props.theme.colors.black};
      @media (max-width: ${props => props.theme.breakpoints.s}) {
        font-size: 1.777rem;
      }
    }
  }
`

const IndexWrapper = Wrapper.withComponent('main')

class Index extends Component {
  render() {
    const {
      data: { homepage, social, posts, projects },
    } = this.props
    return (
      <Layout>
        <Hero>
          <HeroVideo playsinline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
            <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4" />
          </HeroVideo>
          <HeroOverlay />
          <HeroInner>
            <h1>{homepage.data.title.text}</h1>
            <HeroText dangerouslySetInnerHTML={{ __html: homepage.data.content.html }} />
            <Social>
              {social.edges.map((s, index) => (
                <li data-name={`social-entry-${index}`} key={s.node.primary.label.text}>
                  <a href={s.node.primary.link.url}>{s.node.primary.label.text}</a>
                </li>
              ))}
            </Social>
          </HeroInner>
        </Hero>
        <IndexWrapper id={website.skipNavId} style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <Title style={{ marginTop: '4rem' }}>Recent posts</Title>
          <Listing posts={posts.edges} />
          <Title style={{ marginTop: '8rem' }}>Recent projects</Title>
          <ProjectListing>
            {projects.edges.map(project => (
              <li key={project.node.primary.label.text}>
                <a href={project.node.primary.link.url}>{project.node.primary.label.text}</a>
              </li>
            ))}
          </ProjectListing>
        </IndexWrapper>
      </Layout>
    )
  }
}

export default Index

Index.propTypes = {
  data: PropTypes.shape({
    posts: PropTypes.object.isRequired,
  }).isRequired,
}

export const pageQuery = graphql`
  query IndexQuery {
    homepage: prismicHomepage {
      data {
        title {
          text
        }
        content {
          html
        }
      }
    }
    social: allPrismicHeroLinksBodyLinkItem {
      edges {
        node {
          primary {
            label {
              text
            }
            link {
              url
            }
          }
        }
      }
    }
    posts: allPrismicPost(sort: { fields: [data___date], order: DESC }) {
      edges {
        node {
          uid
          data {
            title {
              text
            }
            date(formatString: "DD.MM.YYYY")
            categories {
              category {
                document {
                  data {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
    projects: allPrismicProjectsBodyLinkItem {
      edges {
        node {
          primary {
            label {
              text
            }
            link {
              url
            }
          }
        }
      }
    }
  }
`
