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
  // Uncomment and add more APIs as needed
  // {
  //   name: 'user-management',
  //   label: 'User Management API',
  //   path: 'user-management/user-management-api',
  //   showInNav: false,
  // },
];

export const generateScalarConfigs = (): PluginConfig[] => {
  return apiDefinitions.map((api): PluginConfig => [
    '@scalar/docusaurus',
    {
      id: `scalar-${api.name}`, // Unique ID for each plugin instance
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