import { mergeConfig, type UserConfig } from "vite";

export default (config: UserConfig) => {
  return mergeConfig(config, {
    server: {
      allowedHosts: ["localhost", "127.0.0.1", "backend.masalamoves.co.uk", "api.masalamoves.co.uk", "98.88.37.45"],
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  });
};
