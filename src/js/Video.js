export default class Video {
  constructor(link) {
    // Bind event listeners
    this.handleClickDocument = this.handleClickDocument.bind(this);

    this.container = document.querySelector("#video-container");
    this.videoContainer = this.container.querySelector(".js-video-container");

    const [, videoId] = link.match(/v=([^&#]*)/);

    this.videoContainer.innerHTML = `
      <iframe
        width="100%"
        src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0&amp;showinfo=0"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
    `;

    document.addEventListener("click", this.handleClickDocument, false);
  }

  show() {
    document.body.classList.add("is-modal-open");
    this.container.classList.remove("is-hidden");
  }

  hide() {
    this.container.classList.add("is-hidden");
    this.videoContainer.innerHTML = "";
    document.body.classList.remove("is-modal-open");

    document.removeEventListener("click", this.handleClickDocument, false);
  }

  handleClickDocument(event) {
    if (
      event !== this.videoContainer ||
      !this.videoContainer.contains(event.target)
    ) {
      this.hide();
    }
  }
}
