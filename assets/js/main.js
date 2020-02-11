$(document).ready(function() {
	
	/* calculator */
	$('form.form .input.cost').on('change textInput input', function () {
        var val = this.value;
        if (val !== oldVal) {
            oldVal = val;
			$("#target-1").hide();
			$("#target-1-val").html('$');

			$("#target-2").hide();
			$("#target-2-val").html('$');
			$('section.calculator .calculator-main .main-form .form-calculate .calculate-button').show();
        }
    });
	$('form.form select.input').change(function() {
		$("#target-1").hide();
		$("#target-1-val").html('$');
		$("#target-2").hide();
		$("#target-2-val").html('$');
		$('section.calculator .calculator-main .main-form .form-calculate .calculate-button').show();
	});
	
	function getParameterByName(name, url) {
	    if (!url) url = window.location.href;
	    name = name.replace(/[\[\]]/g, '\\$&');
	    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}
	
	function genParams(){
		var returned = "";
		if(getParameterByName('utm_source')){
			returned += "&rp_source=" + getParameterByName('utm_source');
		}
		if(getParameterByName('utm_medium')){
			returned += "&rp_medium=" + getParameterByName('utm_medium');
		}
		if(getParameterByName('utm_campaign')){
			returned += "&rp_campaign=" + getParameterByName('utm_campaign');
		}
		if(getParameterByName('utm_term')){
			returned += "&rp_term=" + getParameterByName('utm_term');
		}
		if(getParameterByName('utm_content')){
			returned += "&rp_content=" + getParameterByName('utm_content');
		}
		if(getParameterByName('gclid')){
			returned += "&rp_source=google&rp_medium=cpc";
		}
		return returned;
	}
	
	function genParamsCallback(){
		var returned = "";
		if(getParameterByName('utm_source')){
			returned += "&rp_source=" + getParameterByName('utm_source');
		}
		if(getParameterByName('utm_medium')){
			returned += "&rp_medium=" + getParameterByName('utm_medium');
		}
		if(getParameterByName('utm_campaign')){
			returned += "&rp_campaign=" + getParameterByName('utm_campaign');
		}
		if(getParameterByName('utm_term')){
			returned += "&rp_term=" + getParameterByName('utm_term');
		}
		if(getParameterByName('gclid')){
			returned += "&rp_source=google&rp_medium=cpc";
		}
		return returned;
	}

	// Form Validation - Mobile/Desktop Modal.

	$(document).on('click touch', '.calculate-button', function (event) {
		event.preventDefault();
		$("body").addClass("open-calcmodal");
		$("#carouselMobileControls").attr("data-interval", "false");
		$("#validate-cost-desktop").addClass("validation-hide");
		$("#validate-borrow-cost").addClass("validation-hide");
		$("#validate-borrow-cost-mobile").addClass("validation-hide");
		$("#validate-borrow-cost-mobile-2").addClass("validation-hide");
		$("#validate-afford-cost").addClass("validation-hide");
		$("#validate-afford-cost-mobile").addClass("validation-hide");
		$("#validate-afford-cost-mobile-2").addClass("validation-hide");
		
		function numberWithCommas(number) {
		    var parts = number.toString().split(".");
		    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		    return parts.join(".");
		}

		function numberWithCommasTwo(number) {
                            var parts = number.toString().split(".");
                            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            // parts[1] = parts[1]+("0".repeat(parts[1].length));
                            // console.log(parts+"\n");
                            if(parts.length > 1){
                                if(parts[parts.length -1].length != 2){
                                    parts[parts.length -1] = parts[parts.length -1] + ("0".repeat(parts[parts.length -1].length));
                                }
                            }
                            else{
                                parts.push("00");
                            }
                            return parts.join(".");
                        }
		
		if(event.target.name == "borrow"){
			// the car i want costs...
			// console.log("hello");
			if(event.target.id=="recalculate-btn-desktop"){
				var costArray = $('#cost-of-car-desktop').val().split(",");
				var principle1 = parseInt(costArray[0]+costArray[1]);
				var payments1 = $('#payments-desktop').val();
				var term1 = $('#term-desktop').val();
				var rpVariant = "&rp_variant=2";
			}

			if(event.target.id=="recalculate-btn-borrow-mobile"){
				var costArray = $('#cost-of-car-mobile').val().split(",");
				var principle1 = parseInt(costArray[0]+costArray[1]);
				var termArray = $('#term-mobile').val().split(" ");
				var term1 = parseInt(termArray[0]);
				var rpVariant = "&rp_variant=2";
				// Check term range..
				if(term1 <= 12 || term1 < 24){
					var term1Final=12;
				}
				if(term1 >= 24 && term1 < 36){
					var term1Final=24;
				}
				if(term1 >= 36 && term1 < 48){
					var term1Final=36;
				}
				if(term1>=48){
					var term1Final=48;
				}
				// console.log(term1 <= 12);

				// Check options checked.
				if($("#w-bor-mob").is(':checked')){
					var payments1=$("#w-bor-mob").val();
				}
				else if($("#f-bor-mob").is(':checked')){
					var payments1=$("#f-bor-mob").val();
				}
				else if($("#m-bor-mob").is(':checked')){
					var payments1=$("#m-bor-mob").val();
				}
				// console.log(principle1+"\n");
				// console.log(term1+"\n");
				// console.log(payments1+"\n");
			}
			
			if(principle1 == "" || principle1 < 2000 || principle1 > 500000 || Number.isNaN(principle1)){
				// alert("Please enter a value between $2,000 and $500,000.");
				$("#validate-cost-desktop").removeClass("validation-hide");
				$("#validate-borrow-cost-mobile").removeClass("validation-hide");
				$("#validate-cost-desktop").html("Please enter a value between $2,000 and $500,000.");
				$("#validate-borrow-cost-mobile").html("Please enter a value between $2,000 and $500,000.");
				$("#form-modal-target-1").html("I want to borrow");
				$("#target-repayment-text").html("This will cost about");
				$("#cost-of-car-mobile-3").val(numberWithCommas(principle1));
				$("#cost-of-car-3").val(numberWithCommas(principle1));
				$("#cost-of-car-1").val(numberWithCommas(principle1));
				$("#cost-of-car-desktop").val(numberWithCommas(principle1));
				$("#target-borrow-principle").html('Calculating...');
				$("#target-borrow-payment").html(" ");
				$("#target-borrow-fullTermAmountPayable").html('Calculating...');
				return;
			}
			else{
				$("#validate-cost-desktop").addClass("validation-hide");
				$("#validate-borrow-cost-mobile").addClass("validation-hide");
			}
			
			// $(this).hide();
			
			var humanText;
			if(payments1 == "W"){
				$("#w-bor-mob").attr("checked", "checked");
				humanText = "week";
			}
			if(payments1 == "F"){
				$("#f-bor-mob").attr("checked", "checked");
				humanText = "fortnight";
			}
			if(payments1 == "M"){
				$("#m-bor-mob").attr("checked", "checked");
				humanText = "month";
			}

			$("#recalculate-btn-desktop").attr("name", "borrow");
			$("#form-modal-target-1").html("I want to borrow");
			$(".nav-link .active").html("I want to borrow");
			$("#cost-of-car-desktop").val(numberWithCommas(principle1));
			$("#term-desktop").val(term1);
			$("#payments-desktop").val(payments1);


			$("#home-tab-mobile").addClass("active").attr("aria-selected", "true");
			$("#profile-tab-mobile").removeClass("active").attr("aria-selected", "false");
			$("#borrow-mobile").addClass("show").addClass("active");
			$("#afford-mobile").removeClass("active").removeClass("active");
			$("#cost-of-car-mobile").val(numberWithCommas(principle1));
			$("#term-mobile").val(term1Final+" months");
			$("#payments-mobile").val(payments1);

			$("#target-repayment-text").html("This will cost about");
			$("#target-borrow-principle").html('Calculating...');
			$("#target-borrow-payment").html('');
			$("#target-borrow-fullTermAmountPayable").html('Calculating...');
			
			$.get("/calculate.php?loanTerm="+term1+"&principle="+principle1+"&paymentFrequency="+payments1, function(data) {
				// console.log(data.toString());
				var returnedData = data.split('|');
				// console.log(returnedData);
				//Set values for modal form.
				var rpVariant= "&rp_variant="+$(".calculate-button").attr("data-variant");

				$("#target-borrow-principle").html('$' + numberWithCommasTwo(returnedData[0]) + '');
				$("#target-borrow-payment").html('per ' + humanText);
				$("#target-borrow-fullTermAmountPayable").html('$' + numberWithCommasTwo(returnedData[1])+'');
				//$("#target-1-terms").html('Full term amount payable of ' + returnedData[1] + '. Based on an example annual fixed interest rate of 13.75%, with an establishment fee of $367 and a monthly maintenance fee of $8.20. Estimate only.');
				// $("#target-1-terms").html('Example annual fixed interest rate of 12.95%. Actual rate may be higher or lower. Example includes an establishment fee of $376 and monthly maintenance fee of $8.50. Fees vary by MTF Finance location. Full term amount payable of ' + returnedData[1] + '. Estimate only, not an offer of finance. Terms, conditions and lending criteria apply. For information about contract terms, interest rates and fees see <a target="_blank" href="https://www.mtf.co.nz/pdf/Current_Cost_of_Borrowings.pdf">MTF Finance cost of borrowing</a>.');
				$("#apply-btn-calculator-modal").attr('href', 'https://apply.mtf.co.nz/?purchaseprice='+principle1+'&term='+term1+'&paymentfrequency='+payments1+'&mbiterm=0' + rpVariant + genParams());
				// $("#target-1").show();
			});
		} if(event.target.name == "afford"){
			// i can afford to pay...
			if(event.target.id=="recalculate-btn-desktop"){
				var costArray = $('#cost-of-car-desktop').val().split(",");
				var principle2 = parseInt(costArray[0]+costArray[1]);
				var payments2 = $('#payments-desktop').val();
				var term2 = $('#term-desktop').val();
			}

			if(event.target.id=="recalculate-btn-afford-mobile"){
				var costArray = $('#cost-of-car-mobile-2').val().split(",");
				var principle2 = parseInt(costArray[0]+costArray[1]);
				var termArray = $('#term-mobile-2').val().split(" ");
				var term2 = parseInt(termArray[0]);
				// console.log(term2);
				// Check term range..
				if(term2 <= 12 || term2 < 24){
					var term2Final=12;
				}
				if(term2 >= 24 && term2 < 36){
					var term2Final=24;
				}
				if(term2 >= 36 && term2 < 48){
					var term2Final=36;
				}
				if(term2>=48){
					var term2Final=48;
				}
				// console.log(term2 <= 12 || term2 < 24);

				// Check options checked.
				if($("#w-aff-mob").is(':checked')){
					var payments2=$("#w-aff-mob").val();
				}
				if($("#f-aff-mob").is(':checked')){
					var payments2=$("#f-aff-mob").val();
				}
				if($("#m-aff-mob").is(':checked')){
					var payments2=$("#m-aff-mob").val();
				}
			}
			
			if(principle2 == "" || principle2 < 21 || principle2 > 3923 || Number.isNaN(principle2)){
				// alert("Please enter a value between $21 and $3,923.");
				$("#validate-cost-desktop").removeClass("validation-hide");
				$("#validate-afford-cost-mobile").removeClass("validation-hide");
				$("#validate-cost-desktop").html("Please enter a value between $21 and $3,923.");
				$("#validate-afford-cost-mobile").html("Please enter a value between $21 and $3,923.");
				$("#cost-of-car-mobile-4").val(numberWithCommas(principle2));
				$("#i-can-afford-4").val(numberWithCommas(principle2));
				$("#i-can-afford-2").val(numberWithCommas(principle2));
				$("#cost-of-car-desktop").val(pnumberWithCommas(rinciple2));
				$("#form-modal-target-1").html("I can afford");
				$("#target-repayment-text").html("You could borrow");
				$("#target-borrow-principle").html('$');
				$("#target-borrow-payment").html(" ");
				$("#target-borrow-fullTermAmountPayable").html('$');
				return;
			}
			else{
				$("#validate-cost-desktop").addClass("validation-hide");
				$("#validate-afford-cost-mobile").addClass("validation-hide");
			}

			if(payments2 == "W"){
				$("#w-aff-mob").attr("checked", "checked");
			}
			if(payments2 == "F"){
				$("#f-aff-mob").attr("checked", "checked");
			}
			if(payments2 == "M"){
				$("#m-aff-mob").attr("checked", "checked");
			}
			$("#profile-tab-mobile").addClass("active").attr("aria-selected", "true");
			$("#home-tab-mobile").removeClass("active").attr("aria-selected", "false");

			$("#recalculate-btn-desktop").attr("name", "afford");
			$("#form-modal-target-1").html("I can afford");
			$("#cost-of-car-desktop").val(numberWithCommas(principle2));
			$("#term-desktop").val(term2);
			$("#payments-desktop").val(payments2);

			$("#afford-mobile").addClass("show").addClass("active");
			$("#borrow-mobile").removeClass("active").removeClass("active");
			$("#cost-of-car-mobile-2").val(numberWithCommas(principle2));
			$("#term-mobile-2").val(term2Final+" months");
			$("#payments-mobile-2").val(payments2);

			$("#target-repayment-text").html("You could borrow");
			$("#target-borrow-principle").html('Calculating...');
			$("#target-borrow-payment").html(" ");
			$("#target-borrow-fullTermAmountPayable").html('Calculating...');
			
			// $(this).hide();
			// console.log("hello");
			$.get("/calculate.php?afford=1&loanTerm="+term2+"&principle="+principle2+"&paymentFrequency="+payments2, function(data) {
				// console.log(data);
				var returnedData = data.split('|');
				// console.log(returnedData);
				//Change modal form values.
				var rpVariant= "&rp_variant="+$(".calculate-button").attr("data-variant");
				
				$("#target-borrow-principle").html('$' + numberWithCommasTwo(returnedData[0]) + '');
				$("#target-borrow-payment").html(" ");
				if(returnedData[0] >= 10000){
					$("#target-borrow-principle").css('margin-left', '0px');
				}
				if(returnedData[0] >= 100000){
					$("#target-borrow-principle").css('margin-left', '0px');
				}
				$("#target-borrow-fullTermAmountPayable").html('$' + numberWithCommasTwo(returnedData[1])+'');
				$("#apply-btn-calculator-modal").attr('href', 'https://apply.mtf.co.nz/?purchaseprice='+principle2+'&term='+term2+'&paymentfrequency='+payments2+'&mbiterm=0' + rpVariant + genParams());
			});
		}
	});

// Form Validation - Mobile/Desktop Form.	
	$(document).on('click touch', '.form-calculate', function (event) {
		event.preventDefault();
		$("body").addClass("open-calcmodal");
		$("#carouselMobileControls").attr("data-interval", "false");
		$("#validate-cost-desktop").addClass("validation-hide");
		$("#validate-borrow-cost-mobile").addClass("validation-hide");
		$("#validate-afford-cost-mobile").addClass("validation-hide");
		
		function numberWithCommas(number) {
		    var parts = number.toString().split(".");
		    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		    return parts.join(".");
		}

		function numberWithCommasTwo(number) {
                            var parts = number.toString().split(".");
                            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            if(parts.length > 1){
                                if(parts[parts.length -1].length != 2){
                                    parts[parts.length -1] = parts[parts.length -1] + ("0".repeat(parts[parts.length -1].length));
                                }
                            }
                            else{
                                parts.push("00");
                            }
                            return parts.join(".");
                        }
		
		if((event.target.name == "borrow") || (event.target.name == "borrow-v2")){
			// the car i want costs...
			// console.log("hello");
			if(event.target.name=="borrow"){
				var costArray = $('#cost-of-car-1').val().split(",");
				var principle1 = parseInt(costArray[0]+costArray[1]);
				var payments1 = $('#payments-1').val();
				var term1 = $('#term-1').val();
				var rpVariant = "&rp_variant=v2";
			}
			if(event.target.name=="borrow-v2"){
				if(event.target.id=="calculate-btn-costs-v2"){
					var costArray = $('#cost-of-car-3').val().split(",");
					var principle1 = parseInt(costArray[0]+costArray[1]);
					var payments1 = $('#payments-3').val();
					var term1 = $('#term-3').val();
					var rpVariant = "&rp_variant=v3";
				}

				if(event.target.id=="calculate-btn-costs-mobile-v2"){
					var costArray = $('#cost-of-car-mobile-3').val().split(",");
					var principle1 = parseInt(costArray[0]+costArray[1]);
					var termArray = $('#term-mobile-3').val().split(" ");
					var term1 = parseInt(termArray[0]);
					var rpVariant = "&rp_variant=v3";
					// Check term range..
					if(term1 <= 12 || term1 < 24){
						var term1Final=12;
					}
					if(term1 >= 24 && term1 < 36){
						var term1Final=24;
					}
					if(term1 >= 36 && term1 < 48){
						var term1Final=36;
					}
					if(term1>=48){
						var term1Final=48;
					}
					// console.log(term1 <= 12);

					// Check options checked.
					if($("#w-bor-mob-2").is(':checked')){
						var payments1=$("#w-bor-mob-2").val();
					}
					else if($("#f-bor-mob-2").is(':checked')){
						var payments1=$("#f-bor-mob-2").val();
					}
					else if($("#m-bor-mob-2").is(':checked')){
						var payments1=$("#m-bor-mob-2").val();
					}
					// console.log(principle1+"\n");
					// console.log(term1+"\n");
					// console.log(payments1+"\n");
				}
			}
			// console.log(principle1);
			if(principle1 == "" || principle1 < 2000 || principle1 > 500000 || Number.isNaN(principle1)){
				// alert("Please enter a value between $2,000 and $500,000.");
				$("#validate-borrow-cost").removeClass("validation-hide");
				// $(".v3-form .dropdown-v3, .v3-form .amount-input").css("width", "16%");
				$("#validate-borrow-cost-mobile-2").removeClass("validation-hide");
				$("#validate-borrow-cost").html("Please enter a value between $2,000 and $500,000.");
				$("#validate-borrow-cost-mobile-2").html("Please enter a value between $2,000 and $500,000.");
				$("#form-modal-target-1").html("I want to borrow");
				$('.modal-calculator').addClass('hidden');
				$('.modal-calculator').css('display', 'none');
				$(".landing-content").css("display", 'block');
                $("body").removeClass("open-calcmodal");
				return;
			}
			else{
				$("#validate-borrow-cost").addClass("validation-hide");
				$("#validate-borrow-cost-mobile-2").addClass("validation-hide");
			}
			
			// $(this).hide();
			
			var humanText;
			if(payments1 == "W"){
				$("#w-bor-mob").attr("checked", "checked");
				$("#w-bor-mob-2").attr("checked", "checked");
				humanText = "week";
			}
			if(payments1 == "F"){
				$("#f-bor-mob").attr("checked", "checked");
				$("#f-bor-mob-2").attr("checked", "checked");
				humanText = "fortnight";
			}
			if(payments1 == "M"){
				$("#m-bor-mob").attr("checked", "checked");
				$("#m-bor-mob-2").attr("checked", "checked");
				humanText = "month";
			}


			$("#recalculate-btn-desktop").attr("name", "borrow");
			$("#form-modal-target-1").html("I want to borrow");
			$("#home-tab-mobile").html("I want to borrow");
			$("#cost-of-car-desktop").val(numberWithCommas(principle1));
			$("#term-desktop").val(term1);
			$("#payments-desktop").val(payments1);

			$("#home-tab-mobile").addClass("active").attr("aria-selected", "true");
			$("#profile-tab-mobile").removeClass("active").attr("aria-selected", "false");
			$("#cost-of-car-mobile").val(numberWithCommas(principle1));
			$("#term-mobile").val(term1+" months");
			$("#payments-mobile").val(payments1);
			$("#borrow-mobile").addClass("show").addClass("active");
			$("#afford-mobile").removeClass("active").removeClass("show");

			$("#target-repayment-text").html("This will cost about");
			$("#target-borrow-principle").html('Calculating...');
			$("#target-borrow-payment").html('');
			$("#target-borrow-fullTermAmountPayable").html('Calculating...');
			
			$.get("/calculate.php?loanTerm="+term1+"&principle="+principle1+"&paymentFrequency="+payments1, function(data) {
				// console.log(data.toString());
				var returnedData = data.split('|');
				// console.log(returnedData);
				//Set values for modal form.

				$("#target-borrow-principle").html('$' + numberWithCommasTwo(returnedData[0]) + '');
				$("#target-borrow-payment").html('per ' + humanText);
				$("#target-borrow-fullTermAmountPayable").html('$' + numberWithCommasTwo(returnedData[1])+'');
				//$("#target-1-terms").html('Full term amount payable of ' + returnedData[1] + '. Based on an example annual fixed interest rate of 13.75%, with an establishment fee of $367 and a monthly maintenance fee of $8.20. Estimate only.');
				// $("#target-1-terms").html('Example annual fixed interest rate of 12.95%. Actual rate may be higher or lower. Example includes an establishment fee of $376 and monthly maintenance fee of $8.50. Fees vary by MTF Finance location. Full term amount payable of ' + returnedData[1] + '. Estimate only, not an offer of finance. Terms, conditions and lending criteria apply. For information about contract terms, interest rates and fees see <a target="_blank" href="https://www.mtf.co.nz/pdf/Current_Cost_of_Borrowings.pdf">MTF Finance cost of borrowing</a>.');
				$("#apply-btn-calculator-modal").attr('href', 'https://apply.mtf.co.nz/?purchaseprice='+principle1+'&term='+term1+'&paymentfrequency='+payments1+'&mbiterm=0'+ rpVariant + genParams());
				// $("#target-1").show();
			});
		} if((event.target.name == "afford") || (event.target.name == "afford-v2")){
			// i can afford to pay...
			if(event.target.name=="afford"){
				var costArray = $('#i-can-afford-2').val().split(",");
				var principle2 = parseInt(costArray[0]+costArray[1]);
				var payments2 = $('#payments-2').val();
				var term2 = $('#term-2').val();
				var rpVariant = "&rp_variant=v2";
			}
			if(event.target.name=="afford-v2"){
				if(event.target.id=="calculate-btn-afford-v2"){
					var costArray = $('#i-can-afford-4').val().split(",");
					var principle2 = parseInt(costArray[0]+costArray[1]);
					var payments2 = $('#payments-4').val();
					var term2 = $('#term-4').val();
					var rpVariant = "&rp_variant=v3";
				}

				if(event.target.id=="calculate-btn-afford-mobile-v2"){
					var costArray = $('#cost-of-car-mobile-4').val().split(",");
					var principle2 = parseInt(costArray[0]+costArray[1]);
					var termArray = $('#term-mobile-4').val().split(" ");
					var term2 = parseInt(termArray[0]);
					var rpVariant = "&rp_variant=v3";
					// Check term range..
					if(term2 <= 12 || term2 < 24){
						var term2Final=12;
					}
					if(term2 >= 24 && term2 < 36){
						var term2Final=24;
					}
					if(term2 >= 36 && term2 < 48){
						var term2Final=36;
					}
					if(term2>=48){
						var term2Final=48;
					}
					// console.log(term1 <= 12);

					// Check options checked.
					if($("#w-aff-mob-2").is(':checked')){
						var payments2=$("#w-aff-mob-2").val();
					}
					else if($("#f-aff-mob-2").is(':checked')){
						var payments2=$("#f-aff-mob-2").val();
					}
					else if($("#m-aff-mob-2").is(':checked')){
						var payments2=$("#m-aff-mob-2").val();
					}
					// console.log(principle1+"\n");
					// console.log(term1+"\n");
					// console.log(payments1+"\n");
				}
			}
			
			if(principle2 == "" || principle2 < 21 || principle2 > 3923 || Number.isNaN(principle2)){
				// alert("Please enter a value between $21 and $3,923.");
				$("#validate-afford-cost").removeClass("validation-hide");
				$("#validate-afford-cost-mobile-2").removeClass("validation-hide");
				$("#validate-afford-cost").html("Please enter a value between $21 and $3,923.");
				$("#validate-afford-cost-mobile-2").html("Please enter a value between $21 and $3,923.");
				$("#form-modal-target-1").html("I can afford");
				$('.modal-calculator').addClass('hidden');
				$('.modal-calculator').css('display', 'none');
				$(".landing-content").css("display", 'block');
                $("body").removeClass("open-calcmodal");
				return;
			}
			else{
				$("#validate-afford-cost").addClass("validation-hide");
				$("#validate-afford-cost-mobile-2").addClass("validation-hide");
			}

			if(payments2 == "W"){
				$("#w-aff-mob").attr("checked", "checked");
				$("#w-aff-mob-2").attr("checked", "checked");
			}
			if(payments2 == "F"){
				$("#f-aff-mob").attr("checked", "checked");
				$("#f-aff-mob-2").attr("checked", "checked");
			}
			if(payments2 == "M"){
				$("#m-aff-mob").attr("checked", "checked");
				$("#m-aff-mob-2").attr("checked", "checked");
			}


			$("#recalculate-btn-desktop").attr("name", "afford");
			$("#form-modal-target-1").html("I can afford");
			$("#cost-of-car-desktop").val(numberWithCommas(principle2));
			$("#term-desktop").val(term2);
			$("#payments-desktop").val(payments2);


			$("#profile-tab-mobile").addClass("active").attr("aria-selected", "true");
			$("#home-tab-mobile").removeClass("active").attr("aria-selected", "false");
			$("#cost-of-car-mobile-2").val(numberWithCommas(principle2));
			$("#term-mobile-2").val(term2+" months");
			$("#afford-mobile").addClass("show").addClass("active");
			$("#borrow-mobile").removeClass("active").removeClass("show");

			$("#target-repayment-text").html("You could borrow");
			$("#target-borrow-principle").html('Calculating...');
			$("#target-borrow-fullTermAmountPayable").html('Calculating...');
			$("#target-borrow-payment").html(" ");
			
			// $(this).hide();
			// console.log("hello");
			$.get("/calculate.php?afford=1&loanTerm="+term2+"&principle="+principle2+"&paymentFrequency="+payments2, function(data) {
				// console.log(data);
				var returnedData = data.split('|');
				// console.log(returnedData);
				//Change modal form values.

				$("#target-borrow-principle").html('$' + numberWithCommasTwo(returnedData[0]) + '');
				$("#target-borrow-fullTermAmountPayable").html('$' + numberWithCommasTwo(returnedData[1])+'');
				if(returnedData[0] >= 10000){
					$("#target-borrow-principle").css('margin-left', '0px');
				}
				if(returnedData[0] >= 100000){
					$("#target-borrow-principle").css('margin-left', '0px');
				}				
				$("#target-borrow-payment").html(" ");
				$("#apply-btn-calculator-modal").attr('href', 'https://apply.mtf.co.nz/?purchaseprice='+principle2+'&term='+term2+'&paymentfrequency='+payments2+'&mbiterm=0' + rpVariant + genParams());
			});
		}
	});
    
    /* FAQ Buttons */
    $(document).on('click touch', 'section.faq .faq-main .main-item', function(e) {
        e.stopPropagation();
		
		if(!$(this).hasClass('active')){			
			$('section.faq .faq-main .main-item').removeClass('active');		
			$('section.faq .faq-main .main-answer').slideUp('fast');
			$(this).addClass('active');
			$(this).children('.main-answer').slideDown('fast');
		} else {
			$('section.faq .faq-main .main-item').removeClass('active');		
			$('section.faq .faq-main .main-answer').slideUp('fast');
		}
    });
    
	
    /* View Button */
    $(document).on('click touch', '[data-button="view"]', function(e) {
        e.stopPropagation();
        
        $('.main-item.active [data-button="view"]').not(this).closest('.main-item').removeClass('active').find('.details-list').stop().slideUp(400);
        $(this).closest('.main-item').toggleClass('active').find('.details-list').stop().slideToggle(400);
    });
});
