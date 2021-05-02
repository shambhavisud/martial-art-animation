// var c = document.getElementById("my-canvas");
// var ctx = c.getContext("2d");

// let loadImage = (src, callback) => {
//   let img = document.createElement("img");
//   img.onload = () => callback(img);
//   img.src = src;
// };

// let imagePath = (frameNumber) => {
//   return "images/idle/" + frameNumber + ".png";
// };
// loadImage(imagePath(1), (img) => {
//   ctx.drawImage(img, 0, 0, 500, 500);
// });
// // let img = new Image();
// //let img = document.getElementById("img");
// img.onload = () => {};
// img.src = "images/idle.png";

let c = document.getElementById("my-canvas");
let ctx = c.getContext("2d");

let loadImage = (src, callback) => {
  let img = new Image();

  img.onload = () => callback(img);

  img.src = src;
};

let imagePath = (frameNumber, animation) => {
  return "images/" + animation + "/" + frameNumber + ".png";
};

let frames = {
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
  backward: [1, 2, 3, 4, 5, 6],
  forward: [1, 2, 3, 4, 5, 6],
  block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
};

let loadImages = (callback) => {
  // call back with an array of loaded images.
  let images = {
    idle: [],
    punch: [],
    kick: [],
    forward: [],
    backward: [],
    block: [],
  };
  let imagesToLoad = 0;
  ["idle", "kick", "punch", "forward", "backward", "block"].forEach(
    (animation) => {
      let animationFrame = frames[animation];
      imagesToLoad = imagesToLoad + animationFrame.length;

      animationFrame.forEach((frameNumber) => {
        let path = imagePath(frameNumber, animation);

        loadImage(path, (image) => {
          // do something with that image
          images[animation][frameNumber - 1] = image;
          imagesToLoad = imagesToLoad - 1;

          if (imagesToLoad === 0) {
            callback(images);
          }
        });
      });
    }
  );
};

let animate = (ctx, images, animation, callback) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      ctx.clearRect(0, 0, 500, 500);
      ctx.drawImage(image, 0, 0, 500, 500);
    }, index * 100);
  });
  setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
  let queuedAnimations = [];

  let aux = () => {
    let selectedAnimation = "";

    if (queuedAnimations.length === 0) {
      selectedAnimation = "idle";
    } else {
      selectedAnimation = queuedAnimations.shift();
    }

    animate(ctx, images, selectedAnimation, aux);
  };
  aux();

  document.getElementById("kick").onclick = () => {
    queuedAnimations.push("kick");
  };

  document.getElementById("punch").onclick = () => {
    queuedAnimations.push("punch");
  };

  document.getElementById("forward").onclick = () => {
    queuedAnimations.push("forward");
  };

  document.getElementById("backward").onclick = () => {
    queuedAnimations.push("backward");
  };

  document.getElementById("block").onclick = () => {
    queuedAnimations.push("block");
  };

  document.addEventListener("keyup", (event) => {
    const key = event.key;

    if (key === "ArrowLeft") {
      queuedAnimations.push("backward");
    } else if (key === "ArrowRight") {
      queuedAnimations.push("forward");
    } else if (key === " ") {
      queuedAnimations.push("block");
    } else if (key === "ArrowUp") {
      queuedAnimations.push("kick");
    } else if (key === "ArrowDown") {
      queuedAnimations.push("punch");
    }
  });
});
