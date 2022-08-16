const isTestEnv = false;

export const hueUrl = () => {
  let url = "https://iwanthue.vercel.app";
  if (isTestEnv) {
    url = "iwanthue_build/index.thml";
  }
  return url;
};
