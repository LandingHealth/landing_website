import path from "node:path";
import { fileURLToPath } from "node:url";
import svelteConfig from "./svelte.config.mjs";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  ...(process.env.GITHUB_PAGES === "true"
    ? { output: "export", images: { unoptimized: true } }
    : {}),
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svelte(?:\.js)?$/,
      use: {
        loader: "svelte-loader",
        options: {
          preprocess: svelteConfig.preprocess,
          hotReload: false,
          compilerOptions: {
            generate: isServer ? "server" : "client",
            css: "injected",
            warningFilter: (warning) => !warning.filename?.includes("node_modules"),
          },
        },
      },
    });

    config.module.rules.push({
      test: /node_modules\/svelte\/.*\.mjs$/,
      resolve: { fullySpecified: false },
    });

    config.ignoreWarnings = [
      ...(config.ignoreWarnings ?? []),
      { module: /svelte\/src\/internal\/server\/crypto\.js/ },
    ];

    config.resolve.extensions.push(".svelte");
    config.resolve.conditionNames.unshift("svelte");
    config.resolve.alias.$lib = path.join(projectRoot, "src/lib");

    return config;
  },
};

export default nextConfig;
