import React from 'react';
import ResourceLinks from 'gatsby-theme-carbon/src/components/LeftNav/ResourceLinks';

const links = [
    {
      title: 'Configuration Editor',
      href: 'https://merative.github.io/acd-containers/configeditor/overview',
    },
    {
      title: 'API Reference',
      href: 'https://merative.github.io/acd-containers/apidocs/index.html',
    },
    {
      title: 'Github',
      href: 'https://github.com/merative/acd-containers',
    },
    {
      title: 'Change Log',
      href: 'https://github.com/merative/acd-containers/blob/master/CHANGELOG.md',
    }
];

// shouldOpenNewTabs: true if outbound links should open in a new tab
const CustomResources = () => <ResourceLinks shouldOpenNewTabs links={links} />;

export default CustomResources;
