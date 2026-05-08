const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["@metraly/ui"],
  experimental: {
    mdxRs: true,
  },
};

export default nextConfig;
