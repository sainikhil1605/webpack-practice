class NavigationBar {
  render(navigationItems) {
    const liitems = navigationItems.map((item) => {
      return `<li><a href="${item.url}">${item.title}</a></li>`;
    });
    const ul = document.createElement("ul");
    ul.innerHTML = liitems.join("");
    ul.classList.add("navigation-bar");
    document.querySelector("body").appendChild(ul);
  }
}

export default NavigationBar;
