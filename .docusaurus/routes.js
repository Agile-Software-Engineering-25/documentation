import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/documentation/__docusaurus/debug',
    component: ComponentCreator('/documentation/__docusaurus/debug', 'c3b'),
    exact: true
  },
  {
    path: '/documentation/__docusaurus/debug/config',
    component: ComponentCreator('/documentation/__docusaurus/debug/config', 'e83'),
    exact: true
  },
  {
    path: '/documentation/__docusaurus/debug/content',
    component: ComponentCreator('/documentation/__docusaurus/debug/content', '8fc'),
    exact: true
  },
  {
    path: '/documentation/__docusaurus/debug/globalData',
    component: ComponentCreator('/documentation/__docusaurus/debug/globalData', 'f7c'),
    exact: true
  },
  {
    path: '/documentation/__docusaurus/debug/metadata',
    component: ComponentCreator('/documentation/__docusaurus/debug/metadata', 'dc0'),
    exact: true
  },
  {
    path: '/documentation/__docusaurus/debug/registry',
    component: ComponentCreator('/documentation/__docusaurus/debug/registry', '352'),
    exact: true
  },
  {
    path: '/documentation/__docusaurus/debug/routes',
    component: ComponentCreator('/documentation/__docusaurus/debug/routes', '7c8'),
    exact: true
  },
  {
    path: '/documentation/markdown-page',
    component: ComponentCreator('/documentation/markdown-page', '1c7'),
    exact: true
  },
  {
    path: '/documentation/docs',
    component: ComponentCreator('/documentation/docs', '9cb'),
    routes: [
      {
        path: '/documentation/docs',
        component: ComponentCreator('/documentation/docs', '26f'),
        routes: [
          {
            path: '/documentation/docs',
            component: ComponentCreator('/documentation/docs', '67c'),
            routes: [
              {
                path: '/documentation/docs/application-tests/integration-tests',
                component: ComponentCreator('/documentation/docs/application-tests/integration-tests', 'd35'),
                exact: true,
                sidebar: "requirementsSidebar"
              },
              {
                path: '/documentation/docs/application-tests/intro',
                component: ComponentCreator('/documentation/docs/application-tests/intro', '50d'),
                exact: true,
                sidebar: "requirementsSidebar"
              },
              {
                path: '/documentation/docs/category/application-testing',
                component: ComponentCreator('/documentation/docs/category/application-testing', 'b38'),
                exact: true,
                sidebar: "documentationSidebar"
              },
              {
                path: '/documentation/docs/category/application-testing-1',
                component: ComponentCreator('/documentation/docs/category/application-testing-1', '72b'),
                exact: true,
                sidebar: "requirementsSidebar"
              },
              {
                path: '/documentation/docs/category/example---basics',
                component: ComponentCreator('/documentation/docs/category/example---basics', '823'),
                exact: true,
                sidebar: "documentationSidebar"
              },
              {
                path: '/documentation/docs/category/example---basics-1',
                component: ComponentCreator('/documentation/docs/category/example---basics-1', 'e0d'),
                exact: true,
                sidebar: "requirementsSidebar"
              },
              {
                path: '/documentation/docs/category/example---extras',
                component: ComponentCreator('/documentation/docs/category/example---extras', 'ba7'),
                exact: true,
                sidebar: "documentationSidebar"
              },
              {
                path: '/documentation/docs/category/example---extras-1',
                component: ComponentCreator('/documentation/docs/category/example---extras-1', '11c'),
                exact: true,
                sidebar: "requirementsSidebar"
              },
              {
                path: '/documentation/docs/intro',
                component: ComponentCreator('/documentation/docs/intro', '0eb'),
                exact: true,
                sidebar: "requirementsSidebar"
              },
              {
                path: '/documentation/docs/roadmap',
                component: ComponentCreator('/documentation/docs/roadmap', '104'),
                exact: true,
                sidebar: "requirementsSidebar"
              },
              {
                path: '/documentation/docs/tutorial-basics/congratulations',
                component: ComponentCreator('/documentation/docs/tutorial-basics/congratulations', '9b7'),
                exact: true,
                sidebar: "requirementsSidebar"
              },
              {
                path: '/documentation/docs/tutorial-basics/create-a-blog-post',
                component: ComponentCreator('/documentation/docs/tutorial-basics/create-a-blog-post', 'a2f'),
                exact: true,
                sidebar: "requirementsSidebar"
              },
              {
                path: '/documentation/docs/tutorial-basics/create-a-document',
                component: ComponentCreator('/documentation/docs/tutorial-basics/create-a-document', '08f'),
                exact: true,
                sidebar: "requirementsSidebar"
              },
              {
                path: '/documentation/docs/tutorial-basics/create-a-page',
                component: ComponentCreator('/documentation/docs/tutorial-basics/create-a-page', '153'),
                exact: true,
                sidebar: "requirementsSidebar"
              },
              {
                path: '/documentation/docs/tutorial-basics/deploy-your-site',
                component: ComponentCreator('/documentation/docs/tutorial-basics/deploy-your-site', 'fed'),
                exact: true,
                sidebar: "requirementsSidebar"
              },
              {
                path: '/documentation/docs/tutorial-basics/markdown-features',
                component: ComponentCreator('/documentation/docs/tutorial-basics/markdown-features', '2a7'),
                exact: true,
                sidebar: "requirementsSidebar"
              },
              {
                path: '/documentation/docs/tutorial-extras/manage-docs-versions',
                component: ComponentCreator('/documentation/docs/tutorial-extras/manage-docs-versions', '4b3'),
                exact: true,
                sidebar: "requirementsSidebar"
              },
              {
                path: '/documentation/docs/tutorial-extras/translate-your-site',
                component: ComponentCreator('/documentation/docs/tutorial-extras/translate-your-site', '7af'),
                exact: true,
                sidebar: "requirementsSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/documentation/requirements',
    component: ComponentCreator('/documentation/requirements', '569'),
    routes: [
      {
        path: '/documentation/requirements',
        component: ComponentCreator('/documentation/requirements', '053'),
        routes: [
          {
            path: '/documentation/requirements',
            component: ComponentCreator('/documentation/requirements', '3eb'),
            routes: [
              {
                path: '/documentation/requirements/intro',
                component: ComponentCreator('/documentation/requirements/intro', '219'),
                exact: true,
                sidebar: "requirementsSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/documentation/',
    component: ComponentCreator('/documentation/', '4a1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
