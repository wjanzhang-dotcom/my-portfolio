/** @type {import('tailwindcss').Config} */
export default {
  // 这行代码的意思是：去 src 文件夹下，扫描所有代码文件里的样式类名
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [],
}