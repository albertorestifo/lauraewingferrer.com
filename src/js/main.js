import Video from "./Video";
import Image from "./Image";

function onClickVideo(event) {
  event.stopPropagation();
  event.preventDefault();

  let target = event.target;
  while (!target.href) {
    target = target.parentNode;
  }

  // Create the modal with the video
  const video = new Video(target.href);

  video.show();
}

function onClickThumbnail(event) {
  event.stopPropagation();
  event.preventDefault();

  let target = event.target;
  while (!target.href) {
    target = target.parentNode;
  }

  const image = new Image(target.href);

  image.show();
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    const videoLinks = document.querySelectorAll(".Story-video");
    for (const video of videoLinks) {
      video.addEventListener("click", onClickVideo, false);
    }

    const thumbnails = document.querySelectorAll(".js-thumbnail");
    for (const thumbnail of thumbnails) {
      thumbnail.addEventListener("click", onClickThumbnail, false);
    }
  },
  false
);
