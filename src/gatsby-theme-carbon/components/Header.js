import React from 'react';
import Header from 'gatsby-theme-carbon/src/components/Header';

require('./languages/prism-powershell')


const CustomHeader = props => (

  <Header {...props}>
    IBM® Annotator for Clinical Data
  </Header>

);

export default CustomHeader;
