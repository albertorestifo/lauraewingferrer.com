export default class Video {
  constructor(link) {
    // Bind event listeners
    this.handleClickDocument = this.handleClickDocument.bind(this);

    this.container = document.querySelector("#video-container");
    this.videoContainer = this.container.querySelector(".js-video-container");

    const [, videoId] = link.match(/v=([^&#]*)/);

    this.videoContainer.innerHTML = `
      <iframe
        width="560"
        height="315"
        src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0&amp;showinfo=0"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      ></iframe>
    `;

    document.addEventListener("click", this.handleClickDocument, false);
  }

  show() {
    this.container.style.display = "block";
  }

  hide() {
    this.container.style.display = "none";
    this.videoContainer.innerHTML = "";

    document.removeEventListener("click", this.handleClickDocument, false);
  }

  handleClickDocument(event) {
    if (!this.container.contains(event.target)) {
      this.hide();
    }
  }
}
