/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // output: 'export',
  // Optional: Add a trailing slash to all paths `/about` -> `/about/`
  // trailingSlash: true,
  // Optional: Change the output directory `out` -> `dist`
  output: {
    // Set the output directory for the export
    // Replace `/out` with your desired output directory
    path: '/out',
  },
}

module.exports = nextConfig
