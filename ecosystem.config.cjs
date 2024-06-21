module.exports = {
  apps: [
    {
      name: 'invest-africa',
      script: 'dist/src/index.js',
      env: {
        PORT: 9000,
      },
    },
  ],
};
