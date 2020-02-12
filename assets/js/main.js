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

function checkHTML(txt){
	// $('#unclosed-tags-source').numberfy();
	// var stringCounter=0;
	// var openTagQueue;
	// var closeTagQueue;
	// var openString;

	// while(stringCounter != $(txt).length){
	// 	console.log(stringCounter);
	// 	$(txt).each(function(){
	// 		console.log('');
	// 	});
	// 	stringCounter++;
	// }
}

	// Form Validation - Tag Checker

	$(document).on('click touch', '#tag-check-btn', function (event) {
		event.preventDefault();   
		// $("#tag-check-results").addClass("validation-hide");
		// var fileData=$("#txt-file-input").prop('files');
		var textData=$("#txt-type-input").val();
		// console.log(fileData[0]);
		// console.log(textData.split(''));
		var holderOpenArray = new Array();
		var holderCloseArray = new Array();
		var openingTagsArray = new Array();
		var closingTagsArray = new Array();
		var lines = textData.split('\n');
		for (var x = 0; x < lines.length; x++){
			var openingTagsArray = lines[x].match(/<\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)>/g);
			var closingTagsArray = lines[x].match(/<(\/{1})\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)>/g);
			closingTagsArray.reverse();//So that the indices for the opening and closing tags are the same.
			// console.log(closingTagsArray);
			if (openingTagsArray.length>0) {
				for (var i = 0; i < openingTagsArray.length; i++) {
					// console.log(openingTagsArray[i]);
					var openingTagSubstring=openingTagsArray[i].substr(1, openingTagsArray[i].length-2);
					var closingTagSubstring=closingTagsArray[i].substr(2, closingTagsArray[i].length-3);
					// console.log(openingTagSubstring);
					// console.log(closingTagSubstring);
					// console.log(openingTagSubstring == closingTagSubstring);
					if (openingTagSubstring == closingTagSubstring) {
						// If the tags are symmetrical and close each other, pop from their arrays.
						holderOpenArray.push(openingTagsArray.shift());
						holderCloseArray.push(closingTagsArray.shift());
					}
					if (openingTagSubstring != closingTagSubstring){
						var expectedClosingTag="<\/"+openingTagSubstring+">";
						$("#tag-validation").removeClass("validation-hide");
						$("#tag-validation").addClass("validation-error");
						$("#tag-validation").html("Expected "+expectedClosingTag+" found "+closingTagSubstring+".");
						break;
					}
				}
			}
		}
                
		if((holderCloseArray.length + holderOpenArray.length) % 2 == 0 && ((holderCloseArray.length + holderOpenArray.length) != 0)){
			$("#tag-validation").removeClass("validation-hide");
			$("#tag-validation").addClass("validation-correct");
			$("#tag-validation").html("Correctly tagged paragraph");
		}
		
		// $.get(fileData[0].name, function(data) {
			// console.log(data.toString());
			// var returnedData = data.split('|');
			// console.log(data);
			//Set values for modal form.
			
			// $("#tag-validation").html(returnedData[0]);
			// $("#target-borrow-payment").html('per ' + humanText);
			// $("#target-borrow-fullTermAmountPayable").html('$' + numberWithCommasTwo(returnedData[1])+'');
			// $("#apply-btn-calculator-modal").attr('href', 'https://apply.mtf.co.nz/?purchaseprice='+principle1+'&term='+term1+'&paymentfrequency='+payments1+'&mbiterm=0' + rpVariant + genParams());
		// });
	});
});
