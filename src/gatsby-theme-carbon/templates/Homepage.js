import React from 'react';
import { HomepageBanner } from 'gatsby-theme-carbon';
import HomepageTemplate from 'gatsby-theme-carbon/src/templates/Homepage';

import Carbon from '../../images/carbon.jpg';
import ACD from '../../images/ACD_Icon.svg';

const BannerText = () => <p><img src={ACD} alt="service icon"></img><h1>IBM® Annotator for Clinical Data</h1><text>IBM® Watson Annotator for Clinical Data is an AI-powered service on IBM Cloud that delivers meaningful insights from unstructured data, purpose-built for healthcare and life sciences domains. Annotator for Clinical Data extracts key clinical concepts from natural language text, such as conditions, medications, allergies, and procedures. These features are enriched with deep contextual insights, along with values for key clinical attributes, in order to provide a more complete view of the data at hand. Potential data sources include a variety of healthcare and life sciences sources, such as clinical notes, discharge summaries, clinical trial protocols, and literature data.</text></p>;

const customProps = {
  Banner: <HomepageBanner renderText={BannerText} image={Carbon} />,
  FirstCallout: <></>, 
  SecondCallout: <></>
};

// spreading the original props gives us props.children (mdx content)
function ShadowedHomepage(props) {
  return <HomepageTemplate {...props} {...customProps} />;
}

export default ShadowedHomepage;
