$(document).ready(function () {
    $('.form-control').not('.fakeinput').on('keyup blur', function (e) {
        $(this).closest('.form-group').removeClass('has-error');
        $(this).removeClass("invalid");
    });

    $('input[type="checkbox"],input[type="radio"]').on('click', function () {
        $(this).removeClass("invalid");
        $(this).closest('.form-group').removeClass('has-error');
        $(this).closest('.radio-fields').removeClass('invalid');
        $(this).closest('.check-field').removeClass('invalid');
    });

    // $('select').selectmenu();
    $('select').on('change selectmenuchange', function () {
        $(this).closest('.form-group').removeClass('has-error');
        $(this).closest('.form-group').removeClass('invalid');
    });
    $(".form-group .ui-selectmenu-button").on("focus", function () {
        $(this).closest(".form-group").addClass("is-focused");
    });
    $(".form-group .ui-selectmenu-button").on("focusout", function () {
        $(this).closest(".form-group").removeClass("is-focused");
    });

    $(".form-control").focusin(function () {
        $(this).closest(".form-group").addClass("is-focused");
    });
    $(".form-control").focusout(function () {
        $(this).closest(".form-group").removeClass("is-focused");
    });

    $.validator.addMethod("onlyNumberic", function (value, element) {
        return this.optional(element) || value.match(/^[0-9]+$/);
    }, "Accept Only Alphabets!");
    $.validator.addMethod("pan", function (value, element) {
        return this.optional(element) || /^[a-zA-Z]{3}[Pp][a-zA-Z][0-9]{4}[a-zA-Z]$/.test(value) && value.length == 10;
    }, "* Invalid PAN No");
    $.validator.addMethod("onlyCharSpace", function (value, element) {
        return this.optional(element) || value.match(/^[a-zA-Z ]+$/);
    }, "Accept Only Alphabets!");
    $.validator.addMethod(
        "email",
        function (value, element) {
            return (
                this.optional(element) ||
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    value
                )
            );
        },
        "Enter valid email address"
    );

    // Character Input Only
    function CharsetKeyOnly(evt) {
        var k;
        document.all ? k = evt.keyCode : k = evt.which;
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || k == 0 || k == 9);
    }

    // numeric Input Only
    function numOnly(evt) {
        var k;
        document.all ? k = evt.keyCode : k = evt.which;
        return (k == 0 || k == 9 || k == 8 || k == 32 || (k >= 48 && k <= 57));
    }

    function alpha(event) {
        var value = String.fromCharCode(event.which);
        var pattern = new RegExp(/^[a-zA-Z0-9 .,-]+$/i);
        return pattern.test(value);
    }
    $("input.inrFormat").keypress(function () {
        var a = $(this).val().replaceAll(",", "");
        if (a.length < 1) $(this).val("");
        else {
            var b = (parseFloat(a), inrFormat(a));
            if (b.indexOf(".") > 0) {
                var c = b.split(".");
                b = c[0] + "." + c[1].substring(0, 2);
            }
            $(this).val(b);
        }
    });
    function inrFormat(a) {
        var b = a;
        b = b.toString();
        var c = "";
        b.indexOf(".") > 0 && (c = b.substring(b.indexOf("."), b.length)),
            (b = Math.floor(b)),
            (b = b.toString());
        var d = b.substring(b.length - 3),
            e = b.substring(0, b.length - 3);
        return (
            "" != e && (d = "," + d),
            e.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + d + c
        );
    }

    $("#StandaredCharteredForm").validate({
        ignore: [],
        errorClass: 'invalid',
        errorPlacement: function (error, element) {
            var errorText = error.text();
            if (element.closest('.form-group').find('.help-block').length < 1) {
                element.closest('.form-group').append('<span class="help-block">');
            }
            element.closest('.form-group').addClass('has-error');
            element.closest('.form-group').find('.help-block').html(errorText);
        },
        highlight: function (element, errorClass) {
            $(element).addClass(errorClass).parent().prev().children("select").addClass(errorClass);
            if ($(element).attr('type') == 'radio' || $(element).attr('type') == 'checkbox') {
                $(element).parent().parent().addClass(errorClass);
            }
        },
        rules: {
            FirstName: {
                required: true,
            },
            LastName: {
                required: true,
                onlyCharSpace: true,
            },
            Email: {
                required: true,
                email: true,
            },
            ResAddress: {
                required: true,
            },
            ResPIN: {
                required: true,
                onlyNumberic: true,
            },
            AnnIncome: {
                required: true,
            },
            occupation: {
                required: true,
            },
            industryType: {
                required: true,
            },
            WorkType: {
                required: true,
            },
            CompanyName: {
                required: true,
            },
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
});
