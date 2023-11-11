import Heading from "../heading/heading";
import KiwiImage from "../kiwi-image/kiwi-image";

class KiwiPage {
  render() {
    const heading = new Heading();
    heading.render("kiwi");

    const kiwiImage = new KiwiImage();
    kiwiImage.render();
  }
}

// Path: hello-world/src/hello-world.js
// Import the button component from kiwi app dynamically
// import("HelloWorldApp/HelloWorldButton").then((HelloWorldButtonModule) => {
//   const HelloWorldButton = HelloWorldButtonModule.default;
//   const helloWorldButton = new HelloWorldButton();
//   helloWorldButton.render();
// });
export default KiwiPage;
