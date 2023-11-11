import NavigationBar from "./components/navigation-bar/NavigationBar";

const navigationItems = [
  {
    url: "/hello-world",
    title: "Hello World",
  },
  {
    url: "/kiwi",
    title: "Kiwi",
  },
];
const navigationBar = new NavigationBar();
navigationBar.render(navigationItems);
const url = window.location.pathname;
if (url === "/hello-world") {
  import("HelloWorldApp/HelloWorldButton").then((HelloWorldButtonModule) => {
    const HelloWorldButton = HelloWorldButtonModule.default;
    const helloWorldButton = new HelloWorldButton();
    helloWorldButton.render();
  });
} else if (url === "/kiwi") {
  import("KiwiApp/KiwiPage").then((KiwiPageModule) => {
    const KiwiPage = KiwiPageModule.default;
    const kiwiPage = new KiwiPage();
    kiwiPage.render();
  });
}
