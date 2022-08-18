const isTestEnv = false;

export const hueUrl = () => {
  let url =
    "https://iwanthue-3gxr4jyd858ecae2-1301838709.ap-shanghai.app.tcloudbase.com/";
  if (isTestEnv) {
    url =
      "http://localhost:63342/build/index.html?_ijt=631ehkv8c783498n1481ls54rr&_ij_reload=RELOAD_ON_SAVE";
  }
  return url;
};
