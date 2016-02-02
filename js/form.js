var formModule = (function () {
    var my = {},
        sidebar = 0;

    function addClassCard() {
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

    function bindUIActions() {

        $(document).on('click','a.add',function() {
            addClassCard();

            // Clone
            $('#class' + $('#classlist>li').length + '_units').val($('#class' + $(this).closest('li').index() + '_units').val());
            if($('#class' + $('#classlist>li').length + '_units').val() !== '') $('#class' + $('#classlist>li').length + '_units').next().addClass('active');
            $('#class' + $('#classlist>li').length + '_gpa').val($('#class' + $(this).closest('li').index() + '_gpa').val());
            if($('#class' + $('#classlist>li').length + '_gpa').val() !== '') $('#class' + $('#classlist>li').length + '_gpa').next().addClass('active');


            $('#classlist li').last().velocity( { translateX: '-100px'}, { duration: 0 });
            $('#classlist li').last().velocity( { opacity: '1', translateX: '0'}, { duration: 800, delay: 0, easing: [60, 10] });
        });

        $(document).on('click','a.remove',function() {
            $(this).closest('li').remove();
            renameClassCards();
            Materialize.showStaggeredList('#classlist');
        });

        $('#current_semester_checkbox').change(function() {
            if(this.checked) {
                $('#classes').removeClass('hidden');
                if($('#classlist>li').length === 0) { addClass(); }
                Materialize.showStaggeredList('#classlist');
            } else {
                $('#classes').addClass('hidden');
            }
        });

        $('form').validate({
            submitHandler: function(form) {
                sidebar++;
                mathModule.passInput($('form').serializeArray(), sidebar);
            },
            invalidHandler: function(event, validator) {
                console.log(event + ' ' + validator);
            },
            errorPlacement: function(error, element) {
                error.appendTo( element.parent("td").next("td") );
                element.prop('data-error', error);
                console.log("Error: " + error);
            }
        });

    }
    
    my.init = function () {
        bindUIActions();
    };

    return my;
})();