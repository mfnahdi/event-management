/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  ...nextConfig,
  css: {
    loaderOptions: {
      importLoaders: 1,
    },
    modules: true,
    // Corrected the 'import' property
    import: ['path/to/globals.css'],
  },
  // Merged the Tailwind CSS configuration into the same object
  plugins: [
    // Tailwind CSS
    'tailwindcss',
    // Autoprefixer
    'autoprefixer',
  ],
  // Tailwind CSS configuration
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
};
