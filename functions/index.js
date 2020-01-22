const functions = require("firebase-functions");
// @ts-ignore
const { Nuxt } = require("nuxt");
const express = require("express");

const app = express();

const config = {
  dev: false,
  debug: true,
  publicPath: "/"
};

const nuxt = new Nuxt(config);

let isReady = false;
const readyPromise = nuxt
  .ready()
  .then(() => {
    isReady = true;
    return isReady;
  })
  .catch(() => {
    process.exit(1);
  });

async function handleRequest(req, res) {
  if (!isReady) {
    await readyPromise;
  }
  res.set("Cache-Control", "public, max-age=600, s-maxage=1600");
  return await nuxt.render(req, res);
}

app.get("*", handleRequest);
app.use(handleRequest);
exports.nuxtssr = functions.https.onRequest(app);
