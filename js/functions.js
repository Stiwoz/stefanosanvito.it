$(document).ready(function() {

                $(function () {
                    $('[data-toggle="tooltip"]').tooltip()
                });

			// Real-time Validation 
				// Name can't be blank
				$('#username').on('input', function() {
					var input=$(this);
					var is_name=input.val();
					if(is_name){
                        input.removeClass("invalid").addClass("valid");
                        $('#usernameerr').removeClass("error_show").addClass("error");
                    }
					else{
                        input.removeClass("valid").addClass("invalid");
                        $('#usernameerr').removeClass("error").addClass("error_show");
                    }
				});

                // Checking number of chars in Comment
                var maxChars = 500;
                $('#comment').on('input', function() {
                    var input=$(this);
                    var chars=input.val().length;
                    $('.charNumb').empty().text(maxChars - chars);
                    if(chars <= maxChars && chars !== 0){
                        input.removeClass("invalid").addClass("valid");
                        $('.charNumb').removeClass("errorChars");
                        $('#commenterr').removeClass("error_show").addClass("error");
                    }
                    else{
                        input.removeClass("valid").addClass("invalid");
                        $('.charNumb').addClass("errorChars");
                        $('#commenterr').removeClass("error").addClass("error_show");
                    }
                 });

                // Email must be an email
				$('#email').on('input', function() {
					var input=$(this);
					var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
					var is_email=re.test(input.val());
					if(is_email){
                        input.removeClass("invalid").addClass("valid");
                        $('#emailerr').removeClass("error_show").addClass("error");
                    }
					else{
                        input.removeClass("valid").addClass("invalid");
                        $('#emailerr').removeClass("error").addClass("error_show");
                    }
				});

                // Acconsento must be checked
                $("input:radio[name='privacy']").change(function () {
                    if ($("input:radio[name='privacy'][value='yes']").is(":checked")) { 
                        $('#privacyerr').removeClass("error_show").addClass("error");
                        $("input:radio[name=privacy]").removeClass("invalid").addClass("valid");
                    }
                    else { 
                        $('#privacyerr').removeClass("error").addClass("error_show");
                        $("input[name='privacy']").removeClass("valid").addClass("invalid");
                    }
                });
		
		//	After Form Submitted Validation
			$("#submit").click(function(event){
                event.preventDefault();
				var form_data=$("#commForm").serializeArray();
				var error_free=true;
                var respCaptcha = grecaptcha.getResponse();
				for (var input in form_data){
					if(form_data[input]['name']=="g-recaptcha-response"){
                        if(!respCaptcha) {
                            error_free = false;
                            $(form_data[input]['name']).removeClass("valid").addClass("invalid");
                        }else {
                            $(form_data[input]['name']).removeClass("invalid").addClass("valid");
                        }
                    } else {
                        var valid = $(form_data[input]['name']).hasClass("valid");
                        var error_element = $("#"+form_data[input]['name'] + "err");
                        if (!valid) {
                            error_element.removeClass("error").addClass("error_show");
                            error_free = false;
                        }
                        else {
                            error_element.removeClass("error_show").addClass("error");
                            error_free = true;
                        }
                        alert(error_free + " " + form_data[input]['name']);
                    }
				}
                if(!error_free)
                    swal("Errore", "Form non correttamente compilato", "error");
				if (error_free) {
                    swal({
                        title: "Confermare l'inserimento?",
                        text: "Premere Conferma per continuare",
                        type: "info",
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: "Conferma",
                        cancelButtonText: "Annulla",
                        closeOnConfirm: false,
                        closeOnCancel: false,
                        showLoaderOnConfirm: true
                    }).then(function(isConfirm) {
                        if (isConfirm) {
                            if (isConfirm === true) {
                                setTimeout(function(){swal("Commento Registrato");}, 2000);
                                $('#commForm').submit();
                            } else if (isConfirm === false) {
                                swal("Registrazione Annullata", "Commento non registrato", "error");
                            }
                            else {
                                // Esc, close button or outside click
                                // isConfirm is undefined
                            }
                        }
                    });
				}
			});
            $("button.button-cancel").click(function(event){
                event.preventDefault();
                $('.error_show').removeClass("error_show").addClass("error");
                $('.error_chars').removeClass("error_chars");
                $('.charNumb').empty().text(maxChars);
                $('.invalid').removeClass("invalid");
                $('.valid').removeClass("valid");
                $('#anon').addClass("valid");
                grecaptcha.reset();
                document.commForm.reset();
            });
});
/*
function deleteRow(n) {
    $.ajax({
        type: 'GET',
        url: 'deleteRow.php?n='+n,
        success: function()
                  {
                    swal({title: "Utente Eliminato",
                            text: "Premere OK per continuare",
                            type: "success",
                            confirmButtonColor: "rgb(5,112,232)",
                            confirmButtonText: "OK",
                            closeOnConfirm: false,
                        }, function(){$(location).attr('href','../pages/login.php');});
                  }
       });
}
function editRow(n) {
    swal({title: "Modifica Dati",
          html: "<div class='container'><table class='table-form-popup'><tr><td><label for='name'>Nome:</label></td><td><input type='text' id='name' name='name' placeholder='Nome'/></td><td></td></tr><tr><td></td><td><span id='errname' class='error'>Campo Obbligatorio<br/></span></td></tr><tr><td><label for='surname'>Cognome:</label></td><td><input type='text' id='surname' name='surname' placeholder='Cognome'/></td><td></td></tr><tr><td></td><td><span id='errsurname' class='error'>Campo Obbligatorio<br/></span></td></tr><tr><td><label for='email'>E-Mail:</label></td><td><input type='text' id='email' name='email' placeholder='indirizzo@email.com'/></td><td></td></tr><tr><td></td><td><span id='erremail' class='error'>Inserire un indirizzo valido<br/></span></td></tr><tr><td><label for='date'>Data di Nascita:</label></td><td><input type='date' id='date' name='date' max='2018-01-01' min='1899-12-31'/></td><td></td></tr><tr><td></td><td><span id='errdate' class='error'>Inserire una data valida<br/></span></td></tr></table></div>",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "rgb(5,112,232)",
          cancelButtonColor: "rgb(188,211,236)",
          confirmButtonText: "Conferma",
          cancelButtonText: "Annula",
          closeOnConfirm: false,
          closeOnCancel: false,
          showLoaderOnConfirm: true
                        },
                      function(isConfirm){
                                if (isConfirm) {
                                    var name = $("#editname").val();
                                    var surname = $("#editsurname").val();
                                    var email = $("#editemail").val();
                                    var date = $("#editdate").val();
                                    setTimeout(function(){swal("Utente Registrato");}, 2000);
                                    $.ajax({
                                            type: 'GET',
                                            url: 'editRow.php?ID='+n+'&name='+name+'&surname='+surname+'&email='+email+'&date='+date,
                                            success: function() {
                                                $(location).attr('href','../pages/login.php');
                                            }
                                    });

                                } else {
                                    swal("Modifica Annullata", "Utente non modificato", "error");
                                }
                        });

}
*/