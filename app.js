var windowWidth = $(window).width();
var windowHeight = $(window).height();
var lastSearch = "";
var url = ["https://en.wikipedia.org/w/api.php?action=opensearch&search=", "&format=json&callback=?"];

$(document).ready(function(){

var searchFunc = function(){
	var search = $('#namanyay-search-box').val();
	if(search !== ""){
		url = url[0] + search + url[1];
		$.ajax({
			url: url,
			type: "GET",
			async: false,
			dataType: "json",
			success: function(data, status, jqXHR){	
				if(lastSearch !== search){
					$("#output").empty();
					if(data[1].length == 0){
						$('#heading').animate({'margin-left': 20}, 500, function(){
							$('#form').animate({'margin-top': -33,'margin-left': 190}, 500, function(){
								$("#output").append("<div class='post'><h1>Sorry, nothing was found for your request</h1></div>");
								lastSearch = search;
							});
						});
					} else{
						$('#heading').animate({'margin-left': 20}, 500, function(){
							$('#form').animate({'margin-top': -33, 'margin-left': $('#heading').width()+30}, 500, function(){
								for(var i = 0; i < data[1].length; i++) {
									$("#output").append("<div><div class='post'><a href="+data[3][i]+"><h2>" + data[1][i]+ "</h2>" + "<p>" + data[2][i] + "</p></a></div></div>");
									lastSearch = search;
								}
							});
						});
					}
				}
		}});
	}
}

$('#heading').css('margin-left', windowWidth/2-90);
$('#form').css('margin-left', windowWidth/2-131);

	$('#namanyay-search-btn').click(function(){
		searchFunc();
	});


	$(window).keypress(function(e){
  		if(e.keyCode === 13){
			searchFunc();
		}
	});

});

	