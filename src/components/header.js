class HeaderBuilder {
  constructor() {
    this.header = document.createElement('header');
    this.logo = null;
    this.navLinks = [];
  }

  // Set the logo for the header
  setLogo(logoContent) {
    this.logo = document.createElement('div');
    this.logo.innerHTML = logoContent;
    return this;
  }

  // Add a navigation link to the header
  addNavLink(text, url) {
    const link = document.createElement('a');
    link.textContent = text;
    link.href = url;
    this.navLinks.push(link);
    return this;
  }

  // Build and return the header element
  build() {
    // Add logo if it's set
    if (this.logo) {
      this.header.appendChild(this.logo);
    }

    // Add navigation links if they are set
    if (this.navLinks.length > 0) {
      const nav = document.createElement('nav');
      this.navLinks.forEach((link) => {
        nav.appendChild(link);
      });
      this.header.appendChild(nav);
    }

    return this.header;
  }
}
