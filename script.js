const script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js';
document.body.appendChild(script);



// Use the search bar to search for a specific row in the table
$("#search-box").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#contacts-table tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});


// Show the modal
$("#add-contact").click(function() {
    $(".form-wrapper").css("display", "flex");
});

// Close the modal
$(".form-close-button").click(function() {
    $(".form-wrapper").css("display", "none");
});

// Add a new contact to the table
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

    $("#contacts-table").prepend(newContact);
    $(".form-wrapper").css("display", "none");
});