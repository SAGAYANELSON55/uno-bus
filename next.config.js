/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_URI:
      "mongodb+srv://user1:Intern123@cluster0.rfxlmgt.mongodb.net/onebus?retryWrites=true&w=majority",
    AUTH_SECRET: " Mx3r5hQHTZ3l7J+GkwzN5p0f7WD3fuP0asIHroKlP34=",
  },
};

module.exports = nextConfig;
