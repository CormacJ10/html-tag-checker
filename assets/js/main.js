$(document).ready(function() {
// 	function handleFileSelect(){
// 		if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
// 			alert('The File APIs are not fully supported in this browser.');
// 			return;
// 	}
// 	var input = document.getElementById('fileinput');
// 	if (!input) {
// 		alert("Um, couldn't find the fileinput element.");
// 	}
// 	else if (!input.files) {
// 	  alert("This browser doesn't seem to support the `files` property of file inputs.");
// 	}
// 	else if (!input.files[0]) {
// 	  alert("Please select a file before clicking 'Load'");               
// 	}
// 	else {
// 	  var file = input.files[0];
// 	  var fr = new FileReader();
// 	  fr.onload = receivedText;
// 	  //fr.readAsText(file);
// 	  fr.readAsDataURL(file);
// 	}
// }

// 	function receivedText() {
// 		document.getElementById('editor').appendChild(document.createTextNode(fr.result));
// 	} 

	// Form Validation - Tag Checker

	$(document).on('click touch', '#tag-check-btn', function (event) {
		event.preventDefault();   
		$("#tag-check-results").addClass("validation-hide");
		var fileData=$("#txt-file-input").prop('files');
		console.log(fileData[0]);
		
		$.get(fileData[0].name, function(data) {
			// console.log(data.toString());
			var returnedData = data.split('|');
			console.log(data);
			//Set values for modal form.
			
			$("#tag-validation").html(returnedData[0]);
			// $("#target-borrow-payment").html('per ' + humanText);
			// $("#target-borrow-fullTermAmountPayable").html('$' + numberWithCommasTwo(returnedData[1])+'');
			// $("#apply-btn-calculator-modal").attr('href', 'https://apply.mtf.co.nz/?purchaseprice='+principle1+'&term='+term1+'&paymentfrequency='+payments1+'&mbiterm=0' + rpVariant + genParams());
		});
	});
});
