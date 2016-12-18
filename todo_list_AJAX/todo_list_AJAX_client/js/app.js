var connStr = "http://localhost:8080/api";
var TodoItem = function (_id, name, status) {
    this._id = _id;
    this.name = name;
    this.status = status;
}

function addItem(item) {

    var li = $('<li/>', {'id': item._id});
    var checkbox = $('<input/>', {
        'type': 'checkbox', 'change': function () {
            //check box
            var _id = $(this).parents("li").attr('id');
            var status;

            if ($(this).is(":checked")) {
                status = 1;
            } else {
                status = 0;
            }
            var checkbox = $(this);
            //update
            $.ajax({
                url: connStr + "/items/" + _id,
                type: "PUT",
                data: JSON.stringify(
                    {"status": status}
                ),
                contentType: "application/json",
                dataType: "json",
                success: function () {
                    if (status === 1) {
                        //Remove from uncompleted to completed tasks
                        var li = checkbox.parents("li");
                        $("#completed-tasks").append(li.clone(true, true));
                        checkbox.parents("li").remove();
                    } else {
                        //Remove from uncompleted to completed tasks
                        var li = checkbox.parents("li");
                        $("#incomplete-tasks").append(li.clone(true, true));
                        checkbox.parents("li").remove();
                    }
                }
            });
        }
    });
    if (item.status == 0) {
        checkbox.attr('checked', false);
    } else {
        checkbox.attr('checked', true);
    }
    checkbox.appendTo(li);
    $('<label/>', {
        'text': item.name, 'click': function () {
            $(this).parents("li").toggleClass("editMode")
            //set focus to the end of text
            $(this).next().focus();
        }
    }).appendTo(li);
    $('<input/>', {
        'type': 'text', 'value': item.name, 'blur': function () {
            var _id = $(this).parents("li").attr('id');
            var name = $(this).val();


            var input = $(this);
            //update
            $.ajax({
                url: connStr + "/items/" + _id,
                type: "PUT",
                data: JSON.stringify(
                    {"name": name}
                ),
                contentType: "application/json",
                dataType: "json",
                success: function () {
                    var text = input.val();
                    input.parents("li").toggleClass("editMode");
                    //Set text in label
                    input.prev().text(text);
                }
            });

        }
    }).appendTo(li);
    $('<button>', {'class': 'edit', 'text': 'Edit'}).appendTo(li);
    $('<button>', {
        'class': 'delete', 'text': 'Delete', 'click': function () {
            var _id = $(this).parents("li").attr('id');
            var deleteBtn = $(this);
            $.ajax({
                url: connStr + "/items/" + _id,
                type: "DELETE",
                success: function () {
                    deleteBtn.parents("li").remove();
                }
            });
        }
    }).appendTo(li);
    if (item.status == 0) {
        li.appendTo($('#incomplete-tasks'));
    } else {
        li.appendTo($('#completed-tasks'));
    }
}

$(document).ready(function () {

    //Get todo list from server
    $.get(connStr + '/items', function (data, status) {
        for (var i = 0; i < data.length; i++) {
            var item = new TodoItem(data[i]._id, data[i].name, data[i].status);
            addItem(item);
        }
    });


    $('#add-btn').click(function () {
        var task_text = $('#new-task')[0].value;
        $.post(connStr + '/items', {name: task_text, status: 0}, function (data, status) {
            var item = new TodoItem(data._id, task_text, 0);
            addItem(item);
        }, 'json');


    });

});
//Ajax animation
$(document).ajaxStart(function(){
    $('#loading').show();
}).ajaxStop(function(){
    $('#loading').hide();
});




