import path from "node:path";
import { fileURLToPath } from "node:url";
import svelteConfig from "./svelte.config.mjs";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  skipTrailingSlashRedirect: true,
  rewrites() {
    return [
      { source: "/ingest/static/:path*", destination: "https://us-assets.i.posthog.com/static/:path*" },
      { source: "/ingest/:path*", destination: "https://us.i.posthog.com/:path*" },
    ];
  },
  redirects() {
    return [
      { source: "/apply", destination: "/careers#apply", permanent: false },
      { source: "/schedule", destination: "https://calendly.com/rajnpatel05/landing-health-intro-meeting", permanent: false },
      { source: "/revenue", destination: "/resources/clinic-planning", permanent: true },
      { source: "/devices", destination: "/safesock", permanent: true },
      { source: "/integration", destination: "/getting-started", permanent: true },
      { source: "/about", destination: "/company", permanent: true },
      { source: "/team", destination: "/careers", permanent: true },
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
