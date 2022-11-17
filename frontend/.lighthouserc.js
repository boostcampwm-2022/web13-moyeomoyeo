module.exports = {
    ci: {
      collect: {
        startServerCommand: 'npm run start',
        url: ['http://localhost:3000'],
        numberOfRuns: 5,
      },
      upload: {
        target: 'temporary-public-storage',
      },
    },
  };
  


