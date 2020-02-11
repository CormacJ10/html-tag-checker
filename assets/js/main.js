$(document).ready(function() {

	// Form Validation - Mobile/Desktop Modal.

	$(document).on('click touch', '.calculate-button', function (event) {
		event.preventDefault();
		$("#tag-check-results").addClass("validation-hide");
		
		$.get("/calculate.php?loanTerm="+term1+"&principle="+principle1+"&paymentFrequency="+payments1, function(data) {
			// console.log(data.toString());
			var returnedData = data.split('|');
			// console.log(returnedData);
			//Set values for modal form.
			
			$("#target-borrow-principle").html('$' + numberWithCommasTwo(returnedData[0]) + '');
			$("#target-borrow-payment").html('per ' + humanText);
			$("#target-borrow-fullTermAmountPayable").html('$' + numberWithCommasTwo(returnedData[1])+'');
			$("#apply-btn-calculator-modal").attr('href', 'https://apply.mtf.co.nz/?purchaseprice='+principle1+'&term='+term1+'&paymentfrequency='+payments1+'&mbiterm=0' + rpVariant + genParams());
		});
	});
});
