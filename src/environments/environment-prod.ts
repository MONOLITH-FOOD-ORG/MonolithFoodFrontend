export const environment = {
  PRODUCTION: true,
  ENV_NAME: 'production',
  API: 'https://monolithfood.globitokuki.site',
  OAUTH2_URL: 'http://35.188.150.59/oauth2/authorization',
  OAUTH2_URL_MICROSOFT: 'https://monolithfood.globitokuki.site/oauth2/authorization',

  rscAuth: '/auth',
  rscUsers: '/user',
  rscConfig: '/user/config',
  rscInfo: '/user/info',
  rscFoods: '/user/foods',
  rscIntakes: '/user/intakes',
  rscSubscriptions: '/user/subscriptions',
  rscFavorites: '/user/favorites',
  rscFitness: '/user/fitness',
};

export const roles = {
  rolesToSeeFavorites: ['ROLE_ADMIN', 'ROLE_VIP'],
};
