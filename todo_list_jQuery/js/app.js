$(document).ready(function () {
    $('#add-btn').click(function () {
        var task_text = $('#new-task')[0].value;
        var li = $('<li/>', {});

        $('<input/>', {
            'type': 'checkbox', 'change': function () {
                if ($(this).is(":checked")) {
                    //Remove from uncompleted to completed tasks

                    var li = $(this).parents("li");
                    $("#completed-tasks").append(li.clone(true, true));
                    $(this).parents("li").remove();
                } else {
                    //Remove from uncompleted to completed tasks
                    var li = $(this).parents("li");
                    $("#incomplete-tasks").append(li.clone(true, true));
                    $(this).parents("li").remove();
                }
            }
        }).appendTo(li);
        $('<label/>', {
            'text': task_text, 'click': function () {
                $(this).parents("li").toggleClass("editMode")
                //set focus to the end of text
                $(this).next().focus();
            }
        }).appendTo(li);
        $('<input/>', {
            'type': 'text', 'value': task_text, 'blur': function () {
                var text = $(this).val();
                $(this).parents("li").toggleClass("editMode");
                //Set text in label
                $(this).prev().text(text);
            }
        }).appendTo(li);
        $('<button>', {'class': 'edit', 'text': 'Edit'}).appendTo(li);
        $('<button>', {
            'class': 'delete', 'text': 'Delete', 'click': function () {
                $(this).parents("li").remove();
            }
        }).appendTo(li);
        li.appendTo($('#incomplete-tasks'));
        //Reset text of new-task
        $('#new-task')[0].value = "";

    });

});





