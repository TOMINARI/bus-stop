var busPositions1  = new Array();
var busPositions2  = new Array();
var busPositions3  = new Array();
var busPositions4  = new Array();
var busPosition = null;
var busMarker = null;


//地図を作成する
function createMap(){
	//五箇山合掌の里をとりあえず中心地点にする
	var position = new google.maps.LatLng(36.425566,136.935733);

	//地図の作成
	var options = {
		zoom: 13,
		center: position,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('map'), options);

	var busstopicon = new google.maps.MarkerImage(
			'img/bus.png', null, null,
			new google.maps.Point( 8, 8 ),
			new google.maps.Size( 30, 30 )
		);
	//バス停マーカーの作成	
	csvToArray("data/busstop.csv", function(tmp) {
        tmp.shift();
        for (var i in tmp) {
            var row = tmp[i];
//        	console.dir(row);
            var position = new google.maps.LatLng(row[2], row[1]);
            var content = "<strong>" + row[0] + "</strong><br><a href=\"#\">このバス停を選択</a>";
            var marker = new google.maps.Marker({
            	position: position,
            	map: map,
        		icon: busstopicon,
            	title: row[0],
            	content: content
            });
            //infoWindow.open(map, marker);
            
            // クリックしたときに情報ウィンドウを表示するイベントを追加する
            google.maps.event.addListener(marker, 'click', function() {
            	showInfoWindow(this);
            });
        }
		
        var infoWindow = null;
        function showInfoWindow(obj) {
        	if(infoWindow) infoWindow.close();
        	infoWindow = new google.maps.InfoWindow({
        		content: obj.content
        	});
        	infoWindow.open(map, obj);
        }
	});
	
	//現在地のマーカーの作成
	//GPSの設定
	var geoOptions = {
		enableHighAccuracy: true,
		timeout: 60000,
		maximumAge: 0
	};

	var image = new google.maps.MarkerImage(
			'img/marker.png', null, null,
			new google.maps.Point( 8, 8 ),
			new google.maps.Size( 17, 17 )
		);
	var currMarker = new google.maps.Marker({
		position: new google.maps.LatLng(35, 135),
		map: map,
		icon: image,
		optimized: false,
		title: 'marker'
	});
	navigator.geolocation.getCurrentPosition(function(position) {
		var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//		map.setCenter(latlng);
		currMarker.setPosition(latlng);
//		poly.getPath().push(latlng);
	}, null, geoOptions);

	$('div.gmnoprint[title="marker"]').addClass('pulse');
	
	// バスを動かす
	var busMarkerImage1 = new google.maps.MarkerImage(
			'img/bus1.png', null, null,
			new google.maps.Point( 8, 8 ),
			new google.maps.Size( 32, 32 )
		);
	var busMarkerImage2 = new google.maps.MarkerImage(
			'img/bus2.png', null, null,
			new google.maps.Point( 8, 8 ),
			new google.maps.Size( 32, 32 )
		);
	var busMarkerImage3 = new google.maps.MarkerImage(
			'img/bus3.png', null, null,
			new google.maps.Point( 8, 8 ),
			new google.maps.Size( 32, 32 )
		);
	var busMarkerImage4 = new google.maps.MarkerImage(
			'img/bus1.png', null, null,
			new google.maps.Point( 8, 8 ),
			new google.maps.Size( 32, 32 )
		);
	var busMarker1 = new google.maps.Marker({
		position: new google.maps.LatLng(36.351914, 136.871636),
		map: map,
		icon: busMarkerImage1,
		optimized: false,
		title: 'bus'
	});
	var busMarker2 = new google.maps.Marker({
//		position: new google.maps.LatLng(36.351914, 136.871636),
		map: map,
		icon: busMarkerImage2,
		optimized: false,
		title: 'bus'
	});
	var busMarker3 = new google.maps.Marker({
//		position: new google.maps.LatLng(36.351914, 136.871636),
		map: map,
		icon: busMarkerImage3,
		optimized: false,
		title: 'bus'
	});
	var busMarker4 = new google.maps.Marker({
//		position: new google.maps.LatLng(36.351914, 136.871636),
		map: map,
		icon: busMarkerImage4,
		optimized: false,
		title: 'bus'
	});
	map.setCenter(busMarker1.position);
	
	
	csvToArray("data/keiro.csv", function(tmp) {
        for (var i in tmp) {
            var row = tmp[i];
//        	console.dir(row);
            busPosition = new google.maps.LatLng(row[1], row[0]);
            busPositions1.push(busPosition);
            busPositions2.push(busPosition);
            busPositions3.push(busPosition);
            busPositions4.push(busPosition);
        }
	});
//	console.dir(busPositions);
//	console.dir(busPositions.length);
	console.dir(busPositions1);
	console.dir(busPositions2);
	console.dir(busPositions3);
	console.dir(busPositions4);
	
	setTimeout(moveBus, 3000, new Array(busPositions1, busMarker1));
	setTimeout(moveBus, 8000, new Array(busPositions2, busMarker2));
	setTimeout(moveBus, 12000, new Array(busPositions3, busMarker3));
	setTimeout(moveBus, 15000, new Array(busPositions4, busMarker4));
	
	function moveBus(args) {
		var busPositions = args[0];
		var busMarker = args[1];
		console.dir(busPositions);
		console.dir(busPositions.length);
		var busPosition = busPositions.shift();
		console.dir(busPosition);
		if(busPosition !== undefined) {
			setTimeout(moveBus, 500, args);			
		}
		busMarker.setPosition(busPosition);
	}
	
}


function csvToArray(filename, cb) {
    $.get(filename, function(csvdata) {
      //CSVのパース
       csvdata = csvdata.replace(/\r/gm, "");
      var line = csvdata.split("\n"),
          ret = [];
      for (var i in line) {
        //空行はスルーする。
        if (line[i].length == 0) continue;

        var row = line[i].split(",");
        ret.push(row);
      }
      cb(ret);
    });
}


function wait_request(form){
	ret = confirm("バスに「乗ります！」を送信しますか？");
	if(ret == true){
		window.alert("送信しました。バス内投票を開始します！");
//		document.getElementById('firstBox').style.display="none";
//		document.getElementById('secondBox').style.display="";
//		document.getElementById('thirdBox').style.display="";
		window.location.href = 'thanks.html';
	}
}

function kakunin(btnNo){
	if(btnNo == 1){
		window.alert("何かしらアクションがある予定です!ありがとうの場合");
	}else{
		window.alert("何かしらアクションがある予定です！残念の場合");
	}
}