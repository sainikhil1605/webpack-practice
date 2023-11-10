import HelloWorldButton from "./components/hello-world-button/hello-world-button";
import React from "react";
import Heading from "./components/heading/heading";
const helloWorlButton = new HelloWorldButton();
const heading = new Heading();
helloWorlButton.render();
heading.render("hello world");

if (process.env.NODE_ENV === "production") {
  console.log("Production mode");
} else if (process.env.NODE_ENV === "development") {
  console.log("Development mode");
}