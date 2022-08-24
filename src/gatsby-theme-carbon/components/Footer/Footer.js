import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { Row, Grid, Column } from 'gatsby-theme-carbon/src/components/Grid';
import {
  footer,
  grid,
  nav,
  listItem,
  content,
} from 'gatsby-theme-carbon/src/components/Footer/Footer.module.scss';

const Footer = ({ Content, links, Logo }) => {
  const { firstCol, secondCol } = links;
  const { site } = useStaticQuery(graphql`
    query SHADOW_BUILD_TIME_QUERY {
      site {
        buildTime(formatString: "DD MMMM YYYY")
      }
    }
  `);
  return (
    <footer className={footer}>
      <Grid className={grid}>
        <Row>
          <Column colLg={2} colMd={2}>
            <ul className={nav}>
              {firstCol &&
                firstCol.map((link, i) => (
                  <li key={i} className={listItem}>
                    <a href={link.href} aria-label={link.linkText}>
                      {link.linkText}
                    </a>
                  </li>
                ))}
            </ul>
          </Column>
          <Column colLg={2} colMd={2}>
            <ul className={nav}>
              {secondCol &&
                secondCol.map((link, i) => (
                  <li key={i} className={listItem}>
                    <a href={link.href} aria-label={link.linkText}>
                      {link.linkText}
                    </a>
                  </li>
                ))}
            </ul>
          </Column>
          <Column
            className={content}
            colLg={4}
            colMd={4}
            colSm={3}
            offsetLg={2}>
            <Content buildTime={site.buildTime} />
          </Column>
        </Row>
      </Grid>
    </footer>
  );
};

const DefaultContent = ({ buildTime }) => (
  <>
    <p>
      Last updated: {buildTime}
    </p>
  </>
);

Footer.defaultProps = {
  links: {
    firstCol: [ ],
    secondCol: [ ],
  },
  Content: DefaultContent,
};

Footer.propTypes = {
  /**
   * Specify the first and second columns of your links
   */
  links: PropTypes.exact({
    firstCol: PropTypes.arrayOf(
      PropTypes.shape({
        href: PropTypes.string,
        linkText: PropTypes.string,
      })
    ),
    secondCol: PropTypes.arrayOf(
      PropTypes.shape({
        href: PropTypes.string,
        linkText: PropTypes.string,
      })
    ),
  }),

  /**
   * Specify the first and second columns of your links
   */
  Content: PropTypes.elementType,

  /**
   * Provide a logo to be rendered in the bottom left corner
   */
  Logo: PropTypes.elementType,
};

export default Footer;
