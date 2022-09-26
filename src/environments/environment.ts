// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  siteKey: '6Lc60BIiAAAAAGIDVzaxAAjAboebGS8E7XDuwm22'
};

export const Auth0 = {
  domain: "https://dev-uu90k3ra.jp.auth0.com/",
  audience: "http://localhost",
  clientId: "IyieS3u6azmc2f9dfUgtrZOykz6547cw",
  secret: "qUhRxeVXL_jm3D27NcaJLGWysESPoXgReepSTRsx0SkPJuwfPXxnkEmHBRvbhSBs",
  redirectUri: "https://dev-uu90k3ra.jp.auth0.com/authorize?http://localhost",
  issuer: "https://dev-uu90k3ra.jp.auth0.com/"
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
