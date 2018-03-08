import Video from "./Video";

function onClickVideo(event) {
  event.stopPropagation();
  event.preventDefault();

  // Create the modal with the video
  const video = new Video(event.target.href);

  video.show();
}

function onClickThumbnail(event) {
  event.stopPropagation();
  event.preventDefault();

  const url = event.target.href || event.target.parentNode.href;

  // Create the modal with the image
  console.log(url);
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
