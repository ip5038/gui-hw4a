// File: index.html 
// GUI Assignment: Create a multiplication table using the given input from user.
// Ishan Patel, Umass Lowell Computer Science,
// ishankumar_patel@student.uml.edu
// Copyright (c) 2021 by Ishan. All rights reserved. May be freely copied or excerpted for educational 
// purposes with credit to Ishan. 
// Updated on Nov 11, 2021 at 5:00pm

function submitPressed() {
    doCalculations();
}

// Create the table and set the table to the HTML element using id
function doCalculations() {
    // Get reference to the table from HTML 
    var tableDiv = document.getElementById('table-div');
    var multTable = document.getElementById('table-elm');
    multTable.innerHTML = "";

    //Create the first row that will be static when scrolling. 
    // This is not the acutal calculations. Just the range of number the user enters.
    var firstTr = multTable.insertRow();
    for(var i = minColVal; i <= maxColVal; i++) {
        // Top left block is empty
        if(i == minColVal) {
            var th = document.createElement('th');
            th.innerHTML = ' ';
            firstTr.appendChild(th);
        }
        var th = document.createElement('th');
        th.innerHTML = i;
        firstTr.appendChild(th);
    }
    // Do the calculaiton for each box, create cell, and append each to the table
    for(var i = minRowVal; i <= maxRowVal; i++) {
        var tr = multTable.insertRow();
        for(var j = minColVal; j <= maxColVal; j++) {
            if(j == minColVal) {
                // Crate the first cell of each row. This is the first column that will be static when scrolling.
                // This is not the acutal calculations. Just the range of number the user enters.
                var th = document.createElement('th');
                th.innerHTML = i;
                tr.appendChild(th);
            }
            var td = tr.insertCell();
            td.appendChild(document.createTextNode(i * j));  
        }
    }
}

// Validate the data entered by the user in the fields
$(document).ready(function() {
    var fromValidation = $("#form-input").validate({
        // Rules for each field. Data is required, data must be within range of -50 and 50, and max must be greater than min
        //    min must be less than max
        rules: {
            minColVal: {
                required: true,
                isValidInput: true,
                isLessThanMaxCol: true,
                isGreaterThanMinCol: false
            },
            maxColVal: {
                required: true,
                isValidInput: true,
                isGreaterThanMinCol: true,
                isLessThanMaxCol: true
            },
            minRowVal: {
                required: true,
                isValidInput: true,
                isLessThanMaxRow: true
            },
            maxRowVal: {
                required: true,
                isValidInput: true,
                isGreaterThanMinRow: true
            }
        },
        // Custom message for each type of error so use can correct it
        messages: {
            minColVal: {
                required: "Input field cannot be empty!",
                isValidInput: "Enter a valid number between -50 and 50.",
                isLessThanMaxCol: "Min column value must be less than max column value."
            },
            maxColVal: {
                required: "Input field cannot be empty!",
                isValidInput: "Enter a valid number between -50 and 50.",
                isGreaterThanMinCol: "Max column value must be greater than min column value."
            },
            minRowVal: {
                required: "Input field cannot be empty!",
                isValidInput: "Enter a valid number between -50 and 50.",
                isLessThanMaxRow: "Min row value must be less than max row value."
            },
            maxRowVal: {
               required: "Input field cannot be empty!",
               isValidInput: "Enter a valid number between -50 and 50.",
               isGreaterThanMinRow: "Max row value must be greater than min row value."
            }
        },

        errorLabelContainer: ".errMessage"
    });
    
    // After user enter a value check if data is valid. If it is then enable "Submit" button
    //     If it is not then disable it
    $('input').on('keyup blur', function() {
        var validForm = $('#form-input').validate();
        var isFormValid = validForm.checkForm();

        if(isFormValid) { 
            $('#submitButton').prop('disabled', false);
        } else {
            $('#submitButton').prop('disabled', true);
        }
    });

    // Check if min column value is less than max column value
    jQuery.validator.addMethod("isLessThanMaxCol", function(value, element) {
        var isValid = true;
        maxColVal = parseInt(document.getElementById('maxColVal').value);
        minColVal = parseInt(document.getElementById('minColVal').value);

        if(minColVal >= maxColVal) { isValid = false; }

        return this.optional(element) || isValid;
    });

    // Check if max column value is greater than min column value
    jQuery.validator.addMethod("isGreaterThanMinCol", function(value, element) {
        var isValid = true;
        maxColVal = parseInt(document.getElementById('maxColVal').value);
        minColVal = parseInt(document.getElementById('minColVal').value);
        
        if(maxColVal <= minColVal) { isValid = false; }

        return this.optional(element) || isValid;
    });

    // Check if min row value is less than max row value
    jQuery.validator.addMethod("isLessThanMaxRow", function(value, element) {
        var isValid = true;
        maxRowVal = parseInt(document.getElementById('maxRowVal').value);
        minRowVal = parseInt(document.getElementById('minRowVal').value);
        
        if(minRowVal >= maxRowVal) { isValid = false; }

        return this.optional(element) || isValid;
    });

    // Check if max row value is greater than min row value
    jQuery.validator.addMethod("isGreaterThanMinRow", function(value, element) {
        var isValid = true;
        maxRowVal = parseInt(document.getElementById('maxRowVal').value);
        minRowVal = parseInt(document.getElementById('minRowVal').value);

        if(maxRowVal <= minRowVal) { isValid = false; }

        return this.optional(element) || isValid;
    });

    // Check if data entered is withing -50 and 50 range
    jQuery.validator.addMethod("isValidInput", function(value, element) {
        maxColVal = parseInt(document.getElementById('maxColVal').value);
        minColVal = parseInt(document.getElementById('minColVal').value);
        maxRowVal = parseInt(document.getElementById('maxRowVal').value);
        minRowVal = parseInt(document.getElementById('minRowVal').value);

        var isValid = true;
        var elmId = element.id;
        
        if(elmId == 'maxColVal') {
            if(value > 50 || value < -50) {
                isValid = false;
            }
        }
        if(elmId == 'minColVal') {
            if(value > 50 || value < -50) {
                isValid = false;
            }
        }
        if(elmId == 'maxRowVal') {
            if(value > 50 || value < -50) {
                isValid = false;
            }
        }
        if(elmId == 'minRowVal') {
            if(value > 50 || value < -50) {
                isValid = false;
            }
        }

        return this.optional(element) || isValid;
    });
});