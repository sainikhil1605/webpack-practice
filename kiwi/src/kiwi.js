import Heading from "./components/heading/heading";
import KiwiImage from "./components/kiwi-image/kiwi-image";
const heading = new Heading();
heading.render("kiwi");

const kiwiImage = new KiwiImage();
kiwiImage.render();

// Path: hello-world/src/hello-world.js
// Import the button component from kiwi app dynamically
// import("HelloWorldApp/HelloWorldButton").then((HelloWorldButtonModule) => {
//   const HelloWorldButton = HelloWorldButtonModule.default;
//   const helloWorldButton = new HelloWorldButton();
//   helloWorldButton.render();
// });
