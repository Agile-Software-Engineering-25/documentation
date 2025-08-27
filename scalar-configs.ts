// scalar-configs.ts
import type { PluginConfig } from '@docusaurus/types';

interface ScalarConfig {
  id: string;
  label: string;
  route: string;
  showNavLink: boolean;
  configuration: {
    url: string;
  };
}

interface ApiDefinition {
  name: string;
  label: string;
  path: string;
  showInNav: boolean;
}

const apiDefinitions: ApiDefinition[] = [
  {
    name: 'notifications',
    label: 'Notifications API',
    path: 'examination-and-grade-management/notification-service-api',
    showInNav: false,
  },
  // {
  //   name: 'api-name',
  //   label: 'api-name API',
  //   path: 'path/where/api',
  //   showInNav: false,
  // },
];

export const generateScalarConfigs = (): PluginConfig[] => {
  return apiDefinitions.map((api): PluginConfig => [
    '@scalar/docusaurus',
    {
      id: `scalar-${api.name}`,
      label: api.label,
      route: `/documentation/service-definitions/${api.path}`,
      showNavLink: api.showInNav,
      configuration: {
        url: `/documentation/openapi/${api.name}.json`,
      },
    },
  ]);
};

export default generateScalarConfigs();