const isTestEnv = false;

export const hueUrl = () => {
  let url =
    "https://iwanthue-8giqcn01f7f89132-1301838709.ap-shanghai.app.tcloudbase.com/";
  if (isTestEnv) {
    url = "iwanthue_build/index.thml";
  }
  return url;
};
