export default class Video {
  constructor(link) {
    // Bind event listeners
    this.handleClickDocument = this.handleClickDocument.bind(this);

    this.container = document.querySelector("#image-container");
    this.imageContainer = this.container.querySelector(".js-image-container");

    this.imageContainer.innerHTML = `<img src="${link}" />`;

    document.addEventListener("click", this.handleClickDocument, false);
  }

  show() {
    document.body.classList.add("is-modal-open");
    this.container.classList.remove("is-hidden");
  }

  hide() {
    this.container.classList.add("is-hidden");
    this.imageContainer.innerHTML = "";
    document.body.classList.remove("is-modal-open");

    document.removeEventListener("click", this.handleClickDocument, false);
  }

  handleClickDocument(event) {
    if (
      event !== this.imageContainer ||
      !this.imageContainer.contains(event.target)
    ) {
      this.hide();
    }
  }
}
