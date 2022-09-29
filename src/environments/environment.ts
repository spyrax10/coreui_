// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  siteKey: '6Lc60BIiAAAAAGIDVzaxAAjAboebGS8E7XDuwm22'
};

export const Auth0 = {
  domain: 'dev-uu90k3ra.jp.auth0.com',
  audience: 'https://pos_auth0.com',
  clientId: '6i7yXc3eP5NoKPIljysQouDGSex6Az9z',
  client_secret: 'B70QlHhjQFRdXepf0GDFKW3D8mVCl_AoVR9qqwVNQseMTfuyDuOyPUFcBZv0QcXk',
  token_endpoint: 'https://dev-uu90k3ra.jp.auth0.com/oauth/token',
  grant_type: 'client_credentials',
  redirectUri: window.location.origin
  //redirectUrl: "https://dev-uu90k3ra.jp.auth0.com/authorize?http://localhost:4200"
  //redirectUri: "https://dev-uu90k3ra.jp.auth0.com/authorize?http://localhost:4200",
  //issuer: "https://dev-uu90k3ra.jp.auth0.com/",
  //app_id: "63352e3e8f667525d5d496f3"
  //userAPI: "https://localhost:44382/api/Useraccount/",
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
