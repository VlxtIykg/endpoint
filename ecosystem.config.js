module.exports = {
  apps: [
    {
      name: "API",
      script: "npm",
      args: "start",
      exec_mode: "cluster",
      instances: "max",
      namespace: "pfl",
      autorestart: false,
      interpreter: "/home/kami/.nvm/versions/node/v20.10.0/bin/node",
    },
  ],
};
