import path from "node:path";
import { fileURLToPath } from "node:url";
import svelteConfig from "./svelte.config.mjs";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  redirects() {
    return [
      { source: "/apply", destination: "/company#apply", permanent: false },
      { source: "/schedule", destination: "https://calendly.com/rajnpatel05/landing-health-intro-meeting", permanent: false },
      { source: "/revenue", destination: "/product", permanent: true },
      { source: "/security", destination: "/product#security", permanent: true },
      { source: "/devices", destination: "/safesock", permanent: true },
      { source: "/integration", destination: "/getting-started", permanent: true },
      { source: "/referral", destination: "/getting-started#referral", permanent: true },
      { source: "/about", destination: "/company", permanent: true },
      { source: "/careers", destination: "/company#careers", permanent: true },
      { source: "/team", destination: "/company#careers", permanent: true },
    ];
  },
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
