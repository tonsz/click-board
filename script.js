$(document).ready(function () {
  let cols = $(".container").width() / 20;
  let rows = $(".container").height() / 20;

  let colorClasses = ["lime", "apple", "mustard", "water"];
  let activity = "click";
  let curColorClass = "lime";
  let prevClass = "";

  // grid setup
  for (var count = 0; count <= cols * rows - 1; count++) {
    $(".container").append(`<div class="box" id="b-${count}"></div>`);
  }
  // hover effect

  $(".box")
    .on("mouseenter", function (event) {
      if ($(`#${event.target.id}`).hasClass("ticked")) {
        prevClass = this.className;
      }
      changeColor(`#${event.target.id}`);
    })
    .on("mouseleave", function (event) {
      if ($(`#${event.target.id}`).hasClass("ticked")) {
        // prevClass = "";
      } else {
        $(`#${event.target.id}`).removeClass();
        $(`#${event.target.id}`).addClass("box");

        $(`#${event.target.id}`).addClass(prevClass); // something wrong here, box is being included lol
      }
      // let boxId = `#${event.target.id}`;
      // if (!$(boxId).hasClass("ticked")) {
      //   $(boxId).removeClass(curColorClass);
      // }
    });

  function changeColor(id) {
    $(id).removeClass();
    $(id).addClass("box");
    $(id).addClass(curColorClass);
  }

  function paint(e) {
    let boxId = `#${e.target.id}`;
    changeColor(boxId);
    $(boxId).addClass("ticked");
  }

  $(".box").on(activity, paint);

  // toggle between hover and click
  $(document).keypress(function (event) {
    if (event.key === "h") {
      if (activity === "click") {
        activity = "mouseover";
        $(".box").on("mouseover", paint);
        $(".box").off("click", paint);
      } else {
        activity = "click";
        $(".box").off("mouseover", paint);
        $(".box").on("click", paint);
      }
    }
  });

  // color picker
  $(".color").on("click", function (event) {
    $(".color").removeClass("picked");
    $(`#${event.target.id}`).addClass("picked");
    curColorClass = event.target.id;
  });
});
