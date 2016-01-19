var sidebar = 0;

function addClass() {
    var template = $('#class_card_template').html();
    var html = Mustache.to_html(template, { number: $('#classlist>li').length+1 });
    $('#classlist').append(html);
    if(sidebar) {
        $('#classlist li').removeClass('m6');
        $('.card .input-field').removeClass('s6');
        $('.card .input-field').addClass('s12');
    }
}

function renameClassCards() {
    var place = 1;
    $('#classlist > li').each(function () {
        $('.card-title', this).text('Class ' + place);
        var iPlace = 1;
        $('input', this).each(function () {
            if(iPlace == 1) {
                $(this).prop('id', 'class' + place + '_units');
                $(this).prop('name', 'class' + place + '_units');
            }
            else{
                $(this).prop('id', 'class' + place + '_gpa');
                $(this).prop('name', 'class' + place + '_gpa');
            }
            iPlace++;
        });
        iPlace = 1;
        $('label', this).each(function () {
            if(iPlace == 1)
                $(this).prop('for', 'class' + place + '_units');
            else
                $(this).prop('for', 'class' + place + '_gpa');
            iPlace++;
        });
        place++;
    });
}

function inputsValid() {
    return !($('form>div .input-field input.invalid').length !== 0 ||
                ($('#current_semester_checkbox').is(':checked') && $('#classes input.invalid').length !== 0) || 
                ($('form>div:first-of-type input').val() === undefined || $('form>div:nth-of-type(2) input').val() === undefined || $('form>div:nth-of-type(3) input').val() === undefined) ||
                ($('form>div:first-of-type input').val() === "" || $('form>div:nth-of-type(2) input').val() === "" || $('form>div:nth-of-type(3) input').val() === ""));
}

$(document).ready(function() {

    $(document).on('click','a.add',function() {
        addClass();

        // Clone
        $('#class' + $('#classlist>li').length + '_units').val($('#class' + $(this).closest('li').index() + '_units').val());
        if($('#class' + $('#classlist>li').length + '_units').val() !== '') $('#class' + $('#classlist>li').length + '_units').next().addClass('active');
        $('#class' + $('#classlist>li').length + '_gpa').val($('#class' + $(this).closest('li').index() + '_gpa').val());
        if($('#class' + $('#classlist>li').length + '_gpa').val() !== '') $('#class' + $('#classlist>li').length + '_gpa').next().addClass('active');


        $('#classlist li').last().velocity( { translateX: "-100px"}, { duration: 0 });
        $('#classlist li').last().velocity( { opacity: "1", translateX: "0"}, { duration: 800, delay: 0, easing: [60, 10] });
    });

    $(document).on('propertychange change click keyup input paste focusout','input',function() {
        if(!inputsValid()) {
            $('button').addClass('disabled');
        } else {
            $('button').removeClass('disabled');
        }
    });

    $(document).on('click','a.remove',function() {
        $(this).closest('li').remove();
        renameClassCards();
        Materialize.showStaggeredList('#classlist');
    });

    $(document).on('click','form button',function() {
        sidebar++;
        if(inputsValid()) {
            passInput($('form').serializeArray(), sidebar);
        } else {
            $('button').addClass('disabled');
        }
    });

    $('#current_semester_checkbox').change(function() {
        if(this.checked) {
            $('#classes').removeClass('hidden');
            if($('#classlist>li').length === 0) { addClass(); }
            Materialize.showStaggeredList('#classlist');
        } else {
            $('#classes').addClass('hidden');
        }
        if(this.checked && $('#classes input.invalid').length !== 0) {
            $('button').addClass('disabled');
        } else {
            $('button').removeClass('disabled');
        }
    });

}());