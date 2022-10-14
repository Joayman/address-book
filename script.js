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


// Show the modal
$("#add-contact").click(function() {
    $(".form-wrapper").css("display", "flex");
});

// Close the modal
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

// If the total number of contacts is 0, show the "No contacts" message

// Pagination if the total number of contacts is more than 10
// If the total number of contacts is less than 10, hide the pagination buttons

// If the user clicks on the "Next" button, show the next 10 contacts
// If the user clicks on the "Previous" button, show the previous 10 contacts
let currentPage = 1;
const totalPage = $("#contacts-table-body tr").length/10;

$("#next").click(function() {
    if (currentPage < totalPage) {
        currentPage++;
        showContacts(currentPage);
    }
});
$("#previous").click(function() {
    if (currentPage > 1) {
        currentPage--;
        showContacts(currentPage);
    }
});

// Tell a joke
$("#tell-joke").click(function() {
    const joke = "Why did the programmer quit his job? Because he didn't get arrays.";
    alert(joke);
}
