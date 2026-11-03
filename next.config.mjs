import path from "node:path";
import { fileURLToPath } from "node:url";
import svelteConfig from "./svelte.config.mjs";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svelte(?:\.js)?$/,
      use: {
        loader: "svelte-loader",
        options: {
          preprocess: svelteConfig.preprocess,
          hotReload: false,
        },
      },
    });

    config.module.rules.push({
      test: /node_modules\/svelte\/.*\.mjs$/,
      resolve: { fullySpecified: false },
    });

    config.resolve.extensions.push(".svelte");
    config.resolve.conditionNames.unshift("svelte");
    config.resolve.alias.$lib = path.join(projectRoot, "src/lib");

    return config;
  },
};

export default nextConfig;
