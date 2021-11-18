$(document).ready(function () {

	//메뉴클릭시 활성상태유지
	$("nav a").click(function () {
		$(this).addClass("act").siblings().removeClass("act");
	});


	//타이핑효과
	const typing = "Creative Challenger\n Web publisher Shin se hyun";
	//alert(type);
	//console.log(type.length); //output_  22
	let i = 0;
	let txt = "";

	function type() {
		if (i < typing.length) {
			txt += typing[i];
			document.getElementById("typing").innerText = txt;
			i++;
			setTimeout(type, 100);
		}
	}
	type();

	/////////////////////////////
	//이벤트디자인 썸네일클릭시 팝업(큰이미지)
	$("#event>div>div").click(function () {
		//썸네일이미지에서 주소와 alt를 get
		const src1 = $(this).children("img").attr("src");
		const src2 = src1.replace(".jpg", "_big.jpg");
		const alt = $(this).children("img").attr("alt");
		$("#popup h3").text(alt);
		$("#popup img").attr({
			"src": src2,
			"alt": alt
		});
		$("#popup").fadeIn();
	});
	//팝업(큰이미지)--닫기	
	$("#popup img").click(function () {
		$("#popup").fadeOut();
	});


	//슬라이드 메뉴
	if ($(window).width() < 600) {
		$("header button").click(function () {
			if ($(this).text() == "X") {
				$(this).html("&#x2630");
				$("nav").slideUp();
			} else {

				$(this).text("X");

				$("nav").slideDown();
			}

		});
		$("nav>div a").click(function () {
			$("header button").html("&#x2630");
			$("nav").slideUp();
		});
	}

	//리사이즈 새로고침
	//if (matchMedia("screen and (max-width: 600px)").matches) {
		//console.log("mobile");
	//} 
	//window.onresize = function () {
		//document.location.reload();
	//};
//리사이즈 새로고침2
var areaHeight= $("pdf img").height();
$("pdf img").css("pdf img",areaHeight);
$(window).resize(function(){
	location.reload();
});

}); //////////end
