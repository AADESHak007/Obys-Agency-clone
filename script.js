





// // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
// ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
// ScrollTrigger.refresh();

gsap.registerPlugin(ScrollTrigger);


// --- SETUP START ---
// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true }) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.defaults({ scroller: "#main" });
// --- SETUP END ---
// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


function gooeyAnimation() {
  Shery.imageEffect(".p3-image ", {
    style: 5,
    gooey: true,
    // debug:true,
    config:{"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7241195453907675},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.23,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.5,"range":[0,10]},"metaball":{"value":0.33,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0.01,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}}
  });
}
gooeyAnimation();
function loader() {
  gsap.from(".line1 h1", {
    y: 150,
    stagger: 0.25,
    duration: 2.8,
    delay: 0.3,
  });

  let count = 0;
  let countdown = document.querySelector("#line1-p2 h5");
  let timer = setInterval(function () {
    if (count < 100) {
      count++;
      countdown.innerHTML = count;
    } else {
      clearInterval(timer);
      console.log("end");
    }
  }, 30);

  let tl = gsap.timeline();
  tl.to("#loading", {
    opacity: 0,
    delay: 3.9,
    duration: 0.9,
  })
    .from("#page1", {
      delay: 0.1,
      y: 1600,
      duration: 0.5,
      ease: "power4",
    })
    .to("#loading", {
      display: "none",
    })
  tl.from("#nav", {
    opacity: 0,
    y:-100,
    stagger:0.4
  });
  tl.from(".m-line h2", {
    y: 150,
    opacity: 0,
    stagger: 0.2,
    duration: 0.6,
  });
}

// function cursor() {
//   document.addEventListener("mousemove", function (value) {
//     gsap.to("#cursor", {
//       left: value.x,
//       top: value.y,
//     });
//   });
// }

  Shery.makeMagnet("#nav-p2 h4", {
    //Parameters are optional.
  });
let img = document.querySelector("#p2-container img");
let container = document.querySelector("#p2-container ");
let video = document.querySelector("#p2-container video");
let play = document.querySelector("#p2-container #v-cursor");
container.addEventListener("mouseenter", function () {
  play.addEventListener("click", function () {
    img.style.opacity = 0;
    video.play();
  })
})
container.addEventListener("mouseleave", function () {
  video.pause();
  img.style.opacity = 1;
})

loader() ;
cursor();
