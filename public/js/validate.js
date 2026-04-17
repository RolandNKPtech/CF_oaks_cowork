function validateEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
}
function validateText(text) {
    var re = /^[A-Za-z\s]+$/;
    return re.test(text);
}
function validatePhone(phone) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(phone);
}

function validateDate(date) {
    var re = /^(((0?[1-9]|1[012])\/(0?[1-9]|1\d|2[0-8])|(0?[13456789]|1[012])\/(29|30)|(0?[13578]|1[02])\/31)\/(19|[2-9]\d)\d{2}|0?2\/29\/((19|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([2468][048]|[3579][26])00)))$/gm;
    return re.test(date);
}

function validateDateInput(date) {
    var re = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/gm;
    return re.test(date);
}

function validateSelect(select) {
    if (select !== '') {
        return true;
    } else {
        return false;
    }
}

function validateMessage(text) {
    var re = /^[A-Za-z0-9!#$%^*()\-_=+;:'",.?\/~`\s]+$/;
    return re.test(text);
}

function invalid(element) {
    $(element).css('border', '3px solid red');
    $(element).css('color', 'red');

    var placeholder = $(element).attr('placeholder');
    var isPrompted = (placeholder.substr(-11) == 'is required');
    console.log(isPrompted);

    if (!isPrompted) {

        placeholder = placeholder + ' is required';
        $(element).attr('placeholder', placeholder);
        $(element).addClass('placeholderRed');
    }
}

function failedValidate(element) {
    $(element).addClass('has-error');
    $(element).on('change', function () {
        $(this).removeClass('has-error')
    })
}



function validate(form) {
    var email = $(form).find("input[name='form[email]']");
    var name = $(form).find("input[name='form[name]']");
    var phone = $(form).find("input[name='form[phone]']");
    var message = $(form).find("input[name='form[message]']");
    var doctor = $(form).find("select[name='form[doctor]']");

    var result = true;

    //check email
    if (!validateEmail($(email).val())) {
        console.log('email invalid');
        invalid(email);
        if (result === true) {
            result = false;
        }
    }
    //check name
    if (!validateText($(name).val())) {
        console.log('name invalid');
        invalid(name);
        if (result === true) {
            result = false;
        }
    }

    //check phone
    if (!validatePhone($(phone).val())) {
        console.log('phone invalid');
        invalid(phone);
        if (result === true) {
            result = false;
        }
    }

    //check message
    if (!validateText($(message).val())) {
        console.log('message invalid');
        invalid(message);
        if (result === true) {
            result = false;
        }
    }

    //check doctor
    if (!validateSelect($(doctor).val())) {
        console.log('doctor invalid');
        invalid(doctor);
        if (result === true) {
            result = false;
        }
    }


    return result;
}


function validateConsent(form) {
    var email = $(form).find("input[name='consent[email]']");
    var name = $(form).find("input[name='consent[name]']");
    var date = $(form).find("input[name='consent[date]']")

    var result = true;

    //check email
    if (!validateEmail($(email).val())) {
        console.log('email invalid');
        invalid(email);
        result = false;
    }
    //check name
    if (!validateText($(name).val())) {
        console.log('name invalid');
        invalid(name);
        result = false;
    }
    // check date
    if (!validateDateInput($(date).val())) {
        console.log('date invalid')
        invalid(name);
        result = false;
    }

    return result;
}



function validateSemaglutideConsult(form) {
    var name = $(form).find("input[name='semaglutide-consult[name]']");
    var phone = $(form).find("input[name='semaglutide-consult[phone]']");

    var result = true;

    //check name
    if (!validateText($(name).val())) {
        console.log('name invalid');
        invalid(name);
        result = false;
    }

    //check phone
    if (!validatePhone($(phone).val())) {
        console.log('phone invalid');
        invalid(phone);
        if (result === true) {
            result = false;
        }
    }

    return result;
}

function validateConsult(form) {
    var email = $(form).find("input[name='consult[email]']")
    var firstName = $(form).find("input[name='consult[firstName]']")
    var lastName = $(form).find("input[name='consult[lastName]']")
    var phone = $(form).find("input[name='consult[phone]']")
    var data = $(form).find("[name='consult[data]']")
    var pastExperience = $(form).find("[name='consult[pastExperience]']")
    var doctor = $(form).find("select[name='consult[doctor]']")
    var gender = $(form).find("select[name='consult[gender]']")
    var hear = $(form).find("select[name='consult[hear]']")
    var date = $(form).find("input[name='consult[dob]']")
    var hippa = $(form).find("input[name='consult[hippa]']")
    var frontPhoto = $(form).find("input[name='front_photo']")
    var leftPhoto = $(form).find("input[name='left_photo']")
    var rightPhoto = $(form).find("input[name='right_photo']")
    var result = true

    //check email
    if (!validateEmail($(email).val())) {
        console.log('email invalid')
        failedValidate(email)
        result = false
    }
    //check last name
    if (!validateText($(lastName).val())) {
        console.log('last name invalid')
        failedValidate(lastName)
        result = false
    }

    //check first name
    if (!validateText($(firstName).val())) {
        console.log('first name invalid')
        failedValidate(firstName)
        result = false
    }

    // check data
    if (!validateText($(data).val())) {
        console.log('data invalid')
        failedValidate(data)
        result = false
    }
    // consult[pastExperience]
    if (!validateText($(pastExperience).val())) {
        console.log('past experience invalid')
        failedValidate(pastExperience)
        result = false
    }

    //check phone
    if (!validatePhone($(phone).val())) {
        console.log('phone invalid')
        failedValidate(phone)
        result = false
    }

    //check front photo
    if (!$(frontPhoto).val()) {
        console.log('front photo invalid')
        $(frontPhoto).closest(".image-box").addClass('has-error').on('change', function () {
            $(this).removeClass('has-error')
        })
        result = false
    }


    //check left photo
    if (!$(leftPhoto).val()) {
        console.log('left photo invalid')
        $(leftPhoto).closest(".image-box").addClass('has-error').on('change', function () {
            $(this).removeClass('has-error')
        })
        result = false
    }

    //check right photo
    if (!$(rightPhoto).val()) {
        console.log('right photo invalid')
        $(rightPhoto).closest(".image-box").addClass('has-error').on('change', function () {
            $(this).removeClass('has-error')
        })
        result = false
    }

    if (!validateDate($(date).val())) {
        console.log('date invalid')
        failedValidate(date)
        result = false;
    }

    if (hippa.val() != undefined) {
        if (!hippa[0].checked) {
            console.log('hippa invalid')
            $(hippa).parent().css('color', '#eb7e7f')

            $($(hippa).parent()).on('change', function () {
                $(this).css('color', '#6e7177')
            })

            result = false;
        }
    }

    //check doctor
    if (!validateSelect($(doctor).val())) {
        console.log('doctor invalid')
        failedValidate(doctor)
        result = false
    }

    //check gender
    if (!validateSelect($(gender).val())) {
        console.log('gender invalid')
        failedValidate(gender)
        result = false
    }

    //check hear
    if (!validateSelect($(hear).val())) {
        console.log('hear invalid')
        failedValidate(hear)
        result = false
    }

    if (result) {
        $('p.has-error').hide()
    } else {
        $('p.has-error').show()
    }

    return result
}


function validateReview(form) {
    //var rating = $(form).find("input[name='rating']");
    //    var email = $(form).find("input[name='email']");
    //var name = $(form).find("input[name='forms[names]']");
    var procedure = $(form).find("select[name='forms[procedure]']");
    var message = $(form).find("textarea[name='forms[message]']");
    var doctor = $(form).find("select[name='forms[doctor]']");


    var result = true;

    //    if($(form).find("input[name='rating']:checked").length == 0){
    //        console.log('rating invalid');
    //        $(form).find("rating").css("border", "2px solid red");
    //        if (result === true) {
    //            result = false;
    //        }
    //    }

    //check phone
    if (!validateSelect($(procedure).val())) {
        console.log('procedure invalid');
        invalid(procedure);
        if (result === true) {
            result = false;
        }
    }

    //check doctor
    if (!validateSelect($(doctor).val())) {
        console.log('doctor invalid');
        invalid(doctor);
        if (result === true) {
            result = false;
        }
    }

    //check name
    if (!validateText($(name).val())) {
        console.log('name invalid');
        invalid(name);
        if (result === true) {
            result = false;
        }
    }

    //check message
    if (!validateMessage($(message).val())) {
        console.log('message invalid');
        invalid(message);
        if (result === true) {
            result = false;
        }
    }

    return result;
}


function validateMembership(form) {
    var email = $(form).find("input[name='membershipForm[email]']");
    var name = $(form).find("input[name='membershipForm[name]']");
    var phone = $(form).find("input[name='membershipForm[phone]']");
    var result = true;

    //check email
    if (!validateEmail($(email).val())) {
        console.log('email invalid');
        invalid(email);
        if (result === true) {
            result = false;
        }
    }
    //check name
    if (!validateText($(name).val())) {
        console.log('name invalid');
        invalid(name);
        if (result === true) {
            result = false;
        }
    }

    //check phone
    if (!validatePhone($(phone).val())) {
        console.log('phone invalid');
        invalid(phone);
        if (result === true) {
            result = false;
        }
    }

    return result;
}




function showRecaptcha(e) {
    e.preventDefault();
    //var form = e.currentTarget.parentElement;
    var form = $(e.currentTarget).parents('form')[0];
    var validation = validate(form);
    console.log(e.currentTarget);

    var formGroup = $(e.currentTarget).parents('.form-group')[0];

    if (validation === true) {
        $(formGroup).prepend('<div class="recaptcha"><div class="g-recaptcha"></div></div>');
        re = $('.g-recaptcha')[0];
        var loadCaptcha = function () {
            captchaContainer = grecaptcha.render(re, {
                'sitekey': '6LeQeGMUAAAAABN0r7V4DF-g3aLLFMQ0iWjy1CTM',
                'callback': 'submitHeaderForm'
            });
        };
        $(form).find('.submit-button').addClass('d-none');
    }

    loadCaptcha();

    return false;
}

function showReviewRecaptcha(e) {
    e.preventDefault();
    var form = e.currentTarget.parentElement;
    var validation = validateReview(form);
    console.log(e.currentTarget);

    if (validation === true) {
        $(form).append('<div class="recaptcha"><div class="g-recaptcha"></div></div>');
        re = $('.g-recaptcha')[0];
        var loadCaptcha = function () {
            captchaContainer = grecaptcha.render(re, {
                'sitekey': '6LeQeGMUAAAAABN0r7V4DF-g3aLLFMQ0iWjy1CTM',
                'callback': 'submitReviewForm'
            });
        };
        $(form).find('.submit-review-button').addClass('d-none');
        loadCaptcha();
    }

    return false;
}

function showConsultRecaptcha(e) {
    e.preventDefault();
    var form = e.currentTarget.parentElement;
    var validation = validateConsult(form);
    console.log(e.currentTarget);

    if (validation === true) {
        $(form).append('<div class="recaptcha"><div class="g-recaptcha"></div></div>');
        re = $('.g-recaptcha')[0];
        var loadCaptcha = function () {
            captchaContainer = grecaptcha.render(re, {
                'sitekey': '6LeQeGMUAAAAABN0r7V4DF-g3aLLFMQ0iWjy1CTM',
                'callback': 'submitConsultForm'
            });
        };
        $(form).find('.submit-consult-button').addClass('d-none');
        loadCaptcha();
    }

    return false;
}

function showMembershipRecaptcha(e) {
    e.preventDefault();
    var form = e.currentTarget.parentElement.parentElement;
    var validation = validateMembership(form);
    console.log(e.currentTarget);

    if (validation === true) {
        $(form).append('<div class="recaptcha"><div class="g-recaptcha"></div></div>');
        re = $('.g-recaptcha')[0];
        var loadCaptcha = function () {
            captchaContainer = grecaptcha.render(re, {
                'sitekey': '6LeQeGMUAAAAABN0r7V4DF-g3aLLFMQ0iWjy1CTM',
                'callback': 'submitMembershipForm'
            });
        };
        $(form).find('.submit-membership-button').addClass('d-none');
        loadCaptcha();
    }

    return false;
}

function showConsentRecaptcha(e) {
    e.preventDefault();
    var form = $(e.currentTarget).parents('form')[0];
    var validation = validateConsent(form);
    console.log(e.currentTarget);

    if (validation === true) {
        $('<div class="recaptcha"><div class="g-recaptcha"></div></div>').insertBefore(e.currentTarget);
        re = $('.g-recaptcha')[0];
        var loadCaptcha = function () {
            captchaContainer = grecaptcha.render(re, {
                'sitekey': '6LeQeGMUAAAAABN0r7V4DF-g3aLLFMQ0iWjy1CTM',
                'callback': 'submitConsultForm'
            });
        };
        $(form).find('.submit-consent-button').addClass('d-none');
        loadCaptcha();
    }

    return false;
}

function showSemaglutideConsultRecaptcha(e) {
    e.preventDefault();
    var form = $(e.currentTarget).parents('form')[0];
    var validation = validateSemaglutideConsult(form);
    console.log(e.currentTarget);

    if (validation === true) {
        $('<div class="recaptcha"><div class="g-recaptcha"></div></div>').insertBefore(e.currentTarget);
        re = $('.g-recaptcha')[0];
        var loadCaptcha = function () {
            captchaContainer = grecaptcha.render(re, {
                'sitekey': '6LeQeGMUAAAAABN0r7V4DF-g3aLLFMQ0iWjy1CTM',
                'callback': 'submitConsultForm'
            });
        };
        $(form).find('.submit-semaglutide-consult-button').addClass('d-none');
        loadCaptcha();
    }

    return false;
}

//
//function submitForm(){
//    $('form').submit();
//}
function submitHeaderForm() {
    re = $('.g-recaptcha')[0];
    var form = $(re).parents('form')[0];
    $(form).submit();
}
function submitReviewForm() {
    re = $('.g-recaptcha')[0];
    var form = $(re).parents('form')[0];
    $(form).submit();
}
function submitConsultForm() {
    setTimeout(function () {
        $('.recaptcha').hide()
        $('.loader-alert').show()
        re = $('.g-recaptcha')[0]
        var form = $(re).parents('form')[0]
        $(form).submit()
    }, 1000)
}
function submitMembershipForm() {
    re = $('.g-recaptcha')[0];
    var form = $(re).parents('form')[0];
    $(form).submit();
}

$('.submit-button').click(function (e) {
    showRecaptcha(e);
});

$('.submit-membership-button').click(function (e) {
    e.preventDefault();
    showMembershipRecaptcha(e);
});