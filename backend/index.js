const strapi = require("@strapi/strapi");

let instance;

module.exports = async (req, res) => {
  if (!instance) {
    console.log("Starting Strapi...");
    instance = await strapi({ distDir: "./dist" }).start();
    console.log("Strapi started successfully");
  }

  // Handle the request
  instance.server.koaApp.callback()(req, res);
};
