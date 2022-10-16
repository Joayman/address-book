const script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js';
document.body.appendChild(script);


// Use the search bar to search for a specific row in the table, if the row is found, it will be highlighted
$("#search-box").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#contacts-table-body tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});

// Sort the table by the column that is clicked
$(document).ready(function(){
    const comparer = (index, asc) => (a, b) => ((v1, v2) =>
        v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )($(a).children('td').eq(index).text(), $(b).children('td').eq(index).text()) * [1,-1][+!!asc];

    $("#contacts-table th").click(function(){
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc){rows = rows.reverse()}
        for (var i = 0; i < rows.length; i++){table.append(rows[i])}
        // add arrow to the column that is sorted
        $("#contacts-table th").removeClass("sorted");
        $(this).addClass("sorted");
    })
});


// Show the add contact modal
$("#add-contact").click(function() {
    $(".form-wrapper").css("display", "flex");
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

