$(document).ready(function () {
    // Use the search bar to search for a specific row in the table
    $("#search-box").on("keyup", function () {
        const value = $(this).val().toLowerCase();
        $("#contacts-table-body tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    // Show the add contact modal
    $("#add-contact").click(function () {
        $(".form-wrapper").css("display", "flex");
    });

    // Close the add contact modal
    $(".form-close-button").click(function () {
        $(".form-wrapper").css("display", "none");
    });

    // Add a new contact to the table
    // If one of the inputs is empty, show an error message
    $("#add-contact-button").click(function () {
        const name = $("#name").val();
        const surname = $("#surname").val();
        const number = $("#number").val();
        const address = $("#address").val();
        const newContact = `
        <tr>
            <td> <div class="icon">${name[0] + surname[0]}</div> </td>
            <td>${name}</td>
            <td>${surname}</td>
            <td>${number}</td>
            <td>${address}</td>
            <td> <button class="delete-button">X</button> </td>
        </tr>
    `;

        if (name === "" || surname === "" || number === "" || address === "") {
            $(".error-message").css("display", "block");
            // Animate the error message with shake animation
            $(".error-message").addClass("shake");
        } else {
            $("#contacts-table").prepend(newContact);
            $(".form-wrapper").css("display", "none");
        }
    });

    // Close the error message
    $(".form-close-button").click(function () {
        $(".error-message").css("display", "none");
    });
    $(".form-input").keyup(function () {
        $(".error-message").css("display", "none");
    });

    // Show the Delete modal
    $(document).on("click", ".delete-button", function () {
        $(".delete-wrapper").css("display", "flex");
        $(this).parents("tr").addClass("delete-row");
    });

    // Close the Delete modal
    $("#delete-close-button").click(function () {
        $(".delete-wrapper").css("display", "none");
    });
    $("#delete-cancel-button").click(function () {
        $(".delete-wrapper").css("display", "none");
    });

    // Delete the contact
    $("#delete-confirm-button").click(function () {
        $(".delete-row").remove();
        $(".delete-wrapper").css("display", "none");
    });

    // Pagination
    // Thanks to Code Tube, https://www.youtube.com/watch?v=yL4sn6ISPUI.
    // Code Tube's video helped me a lot to understand how to implement pagination in a table

    $("#max-rows").on("change", function () {
        $("#pagination").html("");
        let trnum = 0;
        let maxRows = parseInt($(this).val());
        let totalRows = $("#contacts-table-body tr").length;
        $("#contacts-table-body tr").each(function () {
            trnum++;
            if (trnum > maxRows) {
                $(this).hide();
            }
            if (trnum <= maxRows) {
                $(this).show();
            }
        })
        if (totalRows > maxRows) {
            let pagenum = Math.ceil(totalRows / maxRows);
            for (let i = 1; i <= pagenum;) {
                $("#pagination").append(`<li class="page-item" data-page="${i}"> <button class="pagination-button">${i++}</button></li>`).show();
            }
        }
        $("#pagination li:first-child").addClass("active");
        $("#pagination li").on("click", function () {
            let pageNum = $(this).attr("data-page");
            let trIndex = 0;
            $("#pagination li").removeClass("active");
            $(this).addClass("active");
            $("#contacts-table-body tr").each(function () {
                trIndex++;
                if (trIndex > (maxRows * pageNum) || trIndex <= ((maxRows * pageNum) - maxRows)) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });
        });
    });

    // show 5 rows by default
    $("#max-rows").val(5).change();

});