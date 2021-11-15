$(document).ready(function () {
  $("header li> a").on("focus mouseenter", function () {
    $("header li nav").stop().slideUp();
    $(this).next().stop().slideDown();
  });

  //하단 드롭다운 
  $("#partner").click(function () {
    $(this).next().slideDown();
  });
  //하단 마우스 벗어나면 올라감
  $("#partner + nav").mouseleave(function () {
    $(this).slideUp();
  });

  /////////////////////
  //모바일에서만 동작
  if ($(document).width() < 500) {
    $("header button.open").click(function () {
      $("header button.close").show();
      $(this).hide();
      $("header>nav").stop().animate({
        left: 0
      });
    });
    $("header>nav nav, header>nav a:not(.arr), .close").on("click mouseleave", function () {
      $("header button.close").hide();
      $("header button.open").show();
      $("header>nav").stop().animate({
        left: "-100vw"
      });
      $(this).stop().slideUp();
    });
    //모바일에서 메뉴 항목에서 주메뉴 오른쪽 화살표 클릭하면 서브메뉴 닫힘
    $("header a.arr").click(function(){
      $(this).next().slideToggle();
    });

  }
});
