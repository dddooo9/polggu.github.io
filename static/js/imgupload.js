function previewImage(targetObj, View_area) {
	var preview = document.getElementById(View_area);
	var ua = window.navigator.userAgent;

	if (ua.indexOf("MSIE") > -1) {
		targetObj.select();
		try {
			var src = document.selection.createRange().text;
			var ie_preview_error = document.getElementById("ie_preview_error_" + View_area);


			if (ie_preview_error) {
				preview.removeChild(ie_preview_error);
			}

			var img = document.getElementById(View_area);

			img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+src+"', sizingMethod='scale')";
		} catch (e) {
			if (!document.getElementById("ie_preview_error_" + View_area)) {
				var info = document.createElement("<p>");
				info.id = "ie_preview_error_" + View_area;
				info.innerHTML = e.name;
				preview.insertBefore(info, null);
			}
		}

	} else {
		var files = targetObj.files;
		for ( var i = 0; i < files.length; i++) {
			var file = files[i];
			var imageType = /image.*/;
			if (!file.type.match(imageType))
				continue;
			var prevImg = document.getElementById("prev_" + View_area);
			if (prevImg) {
				preview.removeChild(prevImg);
			}
			var img = document.createElement("img"); 
			img.id = "prev_" + View_area;
			img.classList.add("obj");
			img.file = file;
			img.style.width = '300px'; 
			img.style.height = '300px';
			preview.appendChild(img);
			if (window.FileReader) {
				var reader = new FileReader();
				reader.onloadend = (function(aImg) {
					return function(e) {
						aImg.src = e.target.result;
					};
				})(img);
				reader.readAsDataURL(file);
			} else {
				if (!document.getElementById("sfr_preview_error_"
						+ View_area)) {
					var info = document.createElement("p");
					info.id = "sfr_preview_error_" + View_area;
					info.innerHTML = "not supported FileReader";
					preview.insertBefore(info, null);
				}
			}
		}
	}
}

function PrintDiv(div){
	div = div[0]
	html2canvas(div).then(function(canvas){
		var myImage = canvas.toDataURL();
		downloadURI(myImage,"polggu.png")
	});
}
function downloadURI(uri, name){
	var link = document.createElement("a")
	link.download=name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
}


function printName()  {
	const name = document.getElementById('name').value;
	document.getElementById("result").innerText = name;
  }

  function toggleImg1() {
	document.getElementById("img1").src = "../static/img/sample1.jpg";
	document.getElementById("img2").src = "../static/img/sample1.jpg";
  }
  function toggleImg2() {
	document.getElementById("img1").src = "../static/img/sample2.jpg";
	document.getElementById("img2").src = "../static/img/sample2.jpg";
  }