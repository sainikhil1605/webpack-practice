// Webpack doesn't know how to load css files, so we need to import them here and webpack need to be configured
import "./hello-world-button.scss";
class HelloWorldButton {
  // Most browsers dont support class properties so we need to use babel to transpile the code
  buttonCssClass = "hello-world-button";
  render() {
    const button = document.createElement("button");
    button.innerHTML = "Hello World";
    const body = document.querySelector("body");
    button.classList.add(this.buttonCssClass);
    button.onclick = function () {
      const p = document.createElement("p");
      p.innerHTML = "Hello World";
      p.classList.add("hello-world-text");
      body.appendChild(p);
    };
    body.appendChild(button);
  }
}
export default HelloWorldButton;
