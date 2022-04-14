
M.Datepicker.init(document.querySelectorAll(".datepicker"), {
  format: "mm-dd-yyyy",
  showClearBtn: true,
  onClose: function() {
    var newDate = $(this.el).parent().find('.datepicker').val();
    $(this.el).parent().find('input[type!=hidden]').val(newDate);          
  }
});
$(".datepicker-prefix .prefix").click(function() {
  $(this)
    .parent()
    .find(".datepicker")
    .datepicker("open");
});
$(".datepicker-prefix")
  .find("input[type!=hidden]")
  .change(function() {
    if ($(this).val() != "") {
      var comps = $(this)
        .val()
        .split("-");
      // change code below to match your format needs
      var date = new Date(
        parseInt(comps[2]),
        parseInt(comps[1]) - 1,
        parseInt(comps[0])
      );
      $(this)
        .parent()
        .find(".datepicker")
        .datepicker("setDate", date);
    }
  });
