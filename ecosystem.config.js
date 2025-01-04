module.exports = {
  apps: [
    {
      name: "ta_web",
      script: "pnpm run start",
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development",
        NEXT_PUBLIC_API_BASE_URL: "http://localhost:8080/api",
        NEXT_PUBLIC_URL_BASE: "http://localhost:3000",
        DATABASE_URL: "file:./dev.db",
      },
      env_production: {
        NODE_ENV: "production",
        NEXT_PUBLIC_API_BASE_URL: "http://localhost:8080/api",
        NEXT_PUBLIC_URL_BASE: "http://localhost:3000",
        DATABASE_URL: "file:./dev.db",
      },
    },
  ],
};
