var DATABASE = "/" + window.location.href.split("/")[3];


function loadDocumentById() {
	var html = "<tr>" + 
					"<td> <b>Doc Id</b> </td>" +
					"<td> <b>Doc Rev</b> </td>" +
					"<td> <b>BeginDate</b> </td>" +
					"<td> <b>EndDate</b> </td>" +
					"<td> <b>Priority</b> </td>" +
					"<td> <b>Description </b></td>" +
					"<td> <b>Status</b> </td>" +
					"<td> <b>Action Edit</b> </td>" +
				"</tr>";
	var documentId = $('#todoId').val();
	$.ajax({
        type: "GET",
        dataType: 'jsonp',
        //url : '../../_all_docs?include_docs=true',
        url : 'https://mocrosoft.cloudant.com/todo_db/_design/todo/_view/todo_all',
        async : true,
        success : function(data){
            var arr = data.rows;
            $(arr).each(function(index, todo) {
            	if (documentId == todo.value._id) {
            		console.log("draw");
            		html += "<tr><td><input id='_id' type='text' class='form-control' value='" + todo.value._id + "' aria-describedby='basic-addon1'readonly></td>"
            		+ "<td><input id='_rev' type='text' class='form-control' value='" + todo.value._rev + "' aria-describedby='basic-addon1'readonly></td>"
            		+ "<td><input id='beginDate' type='text' class='form-control' value='" + todo.value.beginDate + "' aria-describedby='basic-addon1'></td>"
                    + "<td><input id='endDate' type='text' class='form-control' value='" + todo.value.endDate + "' aria-describedby='basic-addon1'></td>"
                    + "<td><input id='priority' type='text' class='form-control' value='" + todo.value.priority + "' aria-describedby='basic-addon1'></td>"
                    + "<td><input id='description' type='text' class='form-control' value='" + todo.value.description + "' aria-describedby='basic-addon1'></td>"
                    + "<td><input id='status' type='text' class='form-control' value='" + todo.value.status + "' aria-describedby='basic-addon1'></td>"
                    + '<td><button type="button" class="btn btn-success" onClick="editDoc()">Edit</button></td>';
            	}
            });
            html += '</tr></table>';
            $('#tableTodos').html(html);
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(errorThrown);
        }
    });
}


function editDoc() {
    var id = $("#_id").val();
    var rev = $("#_rev").val();
    var beginDate = $("#beginDate").val();
    var endDate = $("#endDate").val();
    var priority = $("#priority").val();
    var description = $("#description").val();
    var status = $("#status").val();
    console.log(priority);
    var doc = {};

    doc._id = id;
    doc._rev = rev;
    doc.beginDate = beginDate;
    doc.endDate = endDate;
    doc.priority = parseInt(priority);
    doc.description = description;
    doc.status = status;

    var json = JSON.stringify(doc);
    
    console.log(json);

    $.ajax({
        type : 'PUT',
        url : 'https://mocrosoft.cloudant.com/todo_db/' + id,
        dataType: 'jsonp',
        data : json,
        contentType : 'application/json',
        async : true,
        success : function(data){
        	console.log(data);
        	loadDocumentById();
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(errorThrown);
        }
    });
}