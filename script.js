$(document).ready(function () {
  let cols = $(".container").width() / 50;
  let rows = $(".container").height() / 50;

  let activity = "click";
  let curColorClass = "lime";
  let prevClass = "";

  function changeColor(id) {
    // add border color change here
    $(id).removeClass();
    $(id).addClass("box");
    $(id).addClass(curColorClass);
  }

  function paint(e) {
    let boxId = `#${e.target.id}`;
    changeColor(boxId);
    $(boxId).addClass("ticked");
  }

  function showTerms() {
    $(".modal").addClass("opened");
    $("#agree").on("click", function () {
      $(".modal").removeClass("opened");
    });
  }

  // grid setup
  for (var count = 0; count <= cols * rows - 1; count++) {
    $(".container").append(`<div class="box" id="b-${count}"></div>`);
  }

  // hover effect
  $(".box")
    .on("mouseenter", function (event) {
      if ($(`#${event.target.id}`).hasClass("ticked")) {
        // if the box was initially ticked,
        // store the previous color in a variable
        prevClass = this.className;
      }
      // perform change color depending on current chosen color
      changeColor(`#${event.target.id}`);
    })
    .on("mouseleave", function (event) {
      if (!$(`#${event.target.id}`).hasClass("ticked")) {
        // check whether in the act of hovering,
        // the color was actually changed.
        // as the listener for a click/paint action
        // already marks a box with ticked
        // if not, perform these:
        $(`#${event.target.id}`).removeClass();
        $(`#${event.target.id}`).addClass("box");
        if (prevClass != "") {
          // then, checking if this variable is not empty
          // if yes, then revert it back to the initial color
          $(`#${event.target.id}`).addClass("ticked");
          $(`#${event.target.id}`).addClass(prevClass);
        }
      }
      // regardless, this variable must be empty again for next use
      prevClass = "";
    });

  $(".box").on(activity, paint);

  // toggle between hover and click
  $(document).keypress(function (event) {
    if (event.key === "h") {
      if (activity === "click") {
        activity = "mouseover";

        $("#activity").html("painting");
        $(".box").on("mouseover", paint);
        $(".box").off("click", paint);
      } else {
        activity = "click";

        $("#activity").html("clicking");
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

  setTimeout(showTerms, 400);
});
