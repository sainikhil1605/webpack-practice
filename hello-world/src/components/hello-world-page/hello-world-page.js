import HelloWorldButton from "../hello-world-button/hello-world-button";
import Heading from "../heading/heading";

class HelloWorldPage {
  render() {
    const helloWorlButton = new HelloWorldButton();
    const heading = new Heading();
    helloWorlButton.render();
    heading.render("hello world");
  }
}
export default HelloWorldPage;
