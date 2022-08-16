const isTestEnv = false;

export const hueUrl = () => {
  let url = "https://iwanthue.vercel.app";
  if (isTestEnv) {
    url =
      "http://localhost:63343/iwanthue/index.php?_ijt=7ul6fuladumfpfloj6l79b01j7";
  }
  return url;
};
