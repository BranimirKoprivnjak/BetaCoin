// https://stackoverflow.com/questions/40382842/cant-import-css-scss-modules-typescript-says-cannot-find-module
// https://www.skovy.dev/blog/generating-typescript-definitions-for-css-modules-using-sass?seed=ekmv85
declare module '*.module.css' {
  const classes: { [className: string]: string };
  export default classes;
}
