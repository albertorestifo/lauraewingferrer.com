const modalContainer = document.getElementById(
  "modal-container"
) as HTMLDivElement;
const modalClose = document.getElementById("modal-close") as HTMLButtonElement;
const modalImage = document.getElementById("modal-image") as HTMLImageElement;

export default class Modal {
  private isOpen = false;

  constructor() {
    // Modal triggers
    const elements = document.querySelectorAll<HTMLAnchorElement>(
      ".js-gallery a"
    );

    // Add event listener to each of those
    elements.forEach((el) =>
      el.addEventListener("click", this.handleClickLink, true)
    );

    // Add event listener for closing the modal
    modalClose.addEventListener("click", this.handleClickClose, true);
    modalContainer.addEventListener("click", this.handleClickClose, true);
  }

  private handleClickLink = (event: MouseEvent) => {
    if (event.ctrlKey || event.metaKey) {
      // Let the user open the image in a new tab as desired
      return;
    }

    event.preventDefault();
    const target = event.target;

    if (target && target instanceof HTMLAnchorElement) {
      return this.open(target.href);
    }

    if (target && target instanceof HTMLImageElement) {
      this.open(target.src);
    }
  };

  private handleClickClose = (event: MouseEvent) => {
    if (!this.isOpen) return;

    event.preventDefault();
    this.close();
  };

  private open = (imageURL: string) => {
    this.isOpen = true;
    modalImage.setAttribute("src", imageURL);
    modalContainer.hidden = false;
    modalContainer.classList.remove("hidden");
  };

  private close = () => {
    this.isOpen = false;
    modalContainer.hidden = true;
    modalContainer.classList.add("hidden");
  };
}
