const script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js';
document.body.appendChild(script);

$(document).ready(function() {
    console.log('jQuery is ready!');
});
// Add event listener to the Add Contact button
$('#add-contact').click(function() {
    // Get the name and phone number from the input fields
    var name = $('#name').val();
    var phone = $('#phone').val();
    // Add the contact to the list
    addContact(name, phone);
}
// Add a contact to the table
function addContact(name, phone) {
    // Create a new row
    var row = $('<tr></tr>');
    // Create a new cell for the name
    var nameCell = $('<td></td>');
    // Add the name to the cell
    nameCell.text(name);
    // Add the name cell to the row
    row.append(nameCell);
    // Create a new cell for the phone number
    var phoneCell = $('<td></td>');
    // Add the phone number to the cell
    phoneCell.text(phone);
    // Add the phone number cell to the row
    row.append(phoneCell);
    // Add the row to the table
    $('#contacts-table').append(row);
}

// Add event listener to the close button
$('#form-close-button').click(function() {
    // Hide the modal
    $('#form-wrapper').hide();
}