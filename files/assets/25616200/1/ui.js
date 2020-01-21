/*jshint esversion: 6, asi: true, laxbreak: true*/
const Ui = pc.createScript("ui");

Ui.attributes.add("css", {
  type: "asset",
  assetType: "css",
  title: "CSS Asset",
  array: true
});
Ui.attributes.add("html", {
  type: "asset",
  assetType: "html",
  title: "HTML Asset"
});

Ui.prototype.initialize = function() {
  const body = document.getElementsByTagName("body")[0];
  const head = document.getElementsByTagName("head")[0];
  const style = `<style>${this.css.map(({resource}) => resource).join("\r\n")}</style>`;
  body.insertAdjacentHTML("afterbegin", this.html.resource);
  head.insertAdjacentHTML("afterbegin", style);
};