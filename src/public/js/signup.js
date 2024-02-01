
(function ($) {
    "validateform";


    $('.inputcontent').each(function () {
        $(this).on('blur', function () {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })
    })


    $('.validate-form').on('submit',function(){
        var check = true;
        var input = $('.validate-input .inputcontent').filter(function() {
            return $(this).attr("lang") === localStorage["language"];
          });

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });



    $('.validate-form .inputcontent').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).val().trim() == '') {
            return false;
        }
        else {
            if ($(input).val().trim().length < 10) {
                $(input).attr("lang") == "en" ? $(input).parent().attr('data-validate', 'Min length: 10 characters') : $(input).parent().attr('data-validate', 'Tối thiểu: 10 kí tự');
                return false;
            }
            else if ($(input).val().trim().length > 30) {
                $(input).attr("lang") == "en" ? $(input).parent().attr('data-validate', 'Max length: 30 characters') : $(input).parent().attr('data-validate', 'Tối đa: 30 kí tự');
                return false;
            }
            else if ($(input).attr('name') == 'password') {
                if ($(input).val().trim().match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{10,30}$/) == null) {
                    $(input).attr("lang") == "en" ? $(input).parent().attr('data-validate', 'Must contain uppercase letters and digits') : $(input).parent().attr('data-validate', 'Bắt buộc chứa kí tự in hoa và số');
                    return false;
                }
            }
        }


    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }



})(jQuery);