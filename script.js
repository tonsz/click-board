$(document).ready(function () {
  let cols = $(".container").width() / 20;
  let rows = $(".container").height() / 20;

  for (var count = 0; count <= cols * rows - 1; count++) {
    $(".container").append(`<div class="box"></div>`);
  }
});
