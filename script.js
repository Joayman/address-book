const script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js';
document.body.appendChild(script);

$(document).ready(function() {

});

// Use the search bar to search for a specific row in the table, if the row is found, it will be highlighted
$("#search-box").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#contacts-table-body tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});

// Sort the table by the column that is clicked
$('th').click(function(){
    const table = $(this).parents('tbody').eq(0)
    const rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index())) //
    this.asc = !this.asc
    if (!this.asc){rows = rows.reverse()}
    for (var i = 0; i < rows.length; i++){table.append(rows[i])}
})
function comparer(index) {
    return function(a, b) {
        var valA = getCellValue(a, index), valB = getCellValue(b, index)
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
    }
}
function getCellValue(row, index){ return $(row).children('td').eq(index).text() }


// Show the add contact modal
$("#add-contact").click(function() {
    $(".form-wrapper").css("display", "flex");
    $(".form-container").addClass("fade-up");
});

// Close the add contact modal
$(".form-close-button").click(function() {
    $(".form-wrapper").css("display", "none");
});

// Add a new contact to the table
// If the new contact already exists, show an error message
$("#add-contact-button").click(function() {
    const name = $("#name").val();
    const surname = $("#surname").val();
    const number = $("#number").val();
    const address = $("#address").val();
    const newContact = `
        <tr>
            <td> <div class="icon">${name[0]+surname[0]}</div> </td>
            <td>${name}</td>
            <td>${surname}</td>
            <td>${number}</td>
            <td>${address}</td>
            <td> <button class="delete-button">X</button> </td>
        </tr>
    `;

    if (name === "" || surname === "" || number === "" || address === "") {
        $(".error-message").css("display", "block");
        // animate the error message with shake animation
        $(".error-message").addClass("shake");
    } else {
        $("#contacts-table").prepend(newContact);
        $(".form-wrapper").css("display", "none");
    }
});

// Close the error message
$(".form-close-button").click(function() {
    $(".error-message").css("display", "none");
});

$(".form-input").keyup(function() {
    $(".error-message").css("display", "none");
});


// Show the Delete modal
$(document).on("click", ".delete-button", function() {
    $(".delete-wrapper").css("display", "flex");
    $(this).parents("tr").addClass("delete-row");
});

// Close the Delete modal
$("#delete-close-button").click(function() {
    $(".delete-wrapper").css("display", "none");
});
$("#delete-cancel-button").click(function() {
    $(".delete-wrapper").css("display", "none");
});

// Delete the contact
$("#delete-confirm-button").click(function() {
    $(".delete-row").remove();
    $(".delete-wrapper").css("display", "none");
});

// Max rows per page
$("#max-rows").change(function() {
   let trnum = 0;
   const maxRows = parseInt($(this).val());
    const totalRows = $("#contacts-table-body tr").length;
    $("#total-rows").text(totalRows);
    $("#contacts-table-body tr").each(function() {
        trnum++;
        if (trnum > maxRows) {
            $(this).hide();
        }
        if (trnum <= maxRows) {
            $(this).show();
        }
    }
    );
    if (totalRows > maxRows) {
        const pagenum = Math.ceil(totalRows/maxRows);
        for (let i = 1; i <= pagenum;) {
            $("#pagination").append('<li data-page="'+i+'">\<span>'+ i++ +'<span class="sr-only">(current)</span></span>\</li>').show();
        }
    }
    $("#pagination li:first-child").addClass("active");
    $("#pagination li").on("click", function() {
        const pageNum = $(this).attr("data-page");
        const trIndex = 0;
        $("#pagination li").removeClass("active");
        $(this).addClass("active");
        $("#contacts-table-body tr").each(function() {
            trIndex++;
            if (trIndex > (maxRows*pageNum) || trIndex <= ((maxRows*pageNum)-maxRows)) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    }
    );
    $(function () {
        $('table tr:eq(0)').prepend('<th> ID </th>')
        var id = 0;
        $('table tr:gt(0)').each(function () {
            id++
            $(this).prepend('<td>' + id + '</td>');
        }
        );
    });
});