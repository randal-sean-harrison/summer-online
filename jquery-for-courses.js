 jQuery(document).ready(function() {

   var myVar;

     function showPage() {
       myVar = setTimeout(showPage, 3500);
     }

     showPage();

     function showPage() {


   // Hide the description text at start
   jQuery(".description-text").hide();

   // Remove everything that does not have the ZODO or PCSE attribute
   jQuery(".course-card").remove(":not(:contains('ZODO'))");
   // jQuery(".course-card").remove(":not(:contains('PCSE'))");

   // Remove these specific department level courses ---------------------------------------
   jQuery(".course-card").remove(":contains('CLGR 60001')");
   jQuery(".course-card").remove(":contains('ANTH 10203')");
   jQuery(".course-card").remove(":contains('ANTH 20201')");
   jQuery(".course-card").remove(":contains('ANTH 20203')");
   jQuery(".course-card").remove(":contains('DS 64301')");
   jQuery(".course-card").remove(":contains('DS 64305')");
   jQuery(".course-card").remove(":contains('DS 64620')");
   jQuery(".course-card").remove(":contains('ROIT 64050')");
   jQuery(".course-card").remove(":contains('ROIT 24231')");
   jQuery(".course-card").remove(":contains('ROIT 14101')");
   jQuery(".course-card").remove(":contains('ROIT 14102')");
   jQuery(".course-card").remove(":contains('EDU 70200')");
   jQuery(".course-card").remove(":contains('EDU 70202')");
   jQuery(".course-card").remove(":contains('ROIT 14101')");
   jQuery(".course-card").remove(":contains('ROIT 14102')");
   jQuery(".course-card").remove(":contains('ENGL 64050')");
   jQuery(".course-card").remove(":contains('EDU 70100')");
   jQuery(".course-card").remove(":contains('EDU 70110')");
   jQuery(".course-card").remove(":contains('EDU 70201')");
   jQuery(".course-card").remove(":contains('THEO 64216')");
   jQuery(".course-card").remove(":contains('THEO 64222')");

   // Remove if course is inactive
   jQuery(".course-card").remove(":contains('Sequence 99')");

   // Remove list items containing "education" and "italian" from dropdowns
   jQuery("option").remove(":contains('Education')");
   jQuery("option").remove(":contains('Italian')");

   countClasses();

   // Filter the page based on the typeahead search input ---------------------------------
   jQuery("#search-text").on("keyup", function() {

     jQuery("#csb-instructor").val("all");
     jQuery("#csb-course-name").val("all");
     jQuery("#csb-title").val("all");
     jQuery("#csb-credits").val("all");
     jQuery("#csb-attributes").val("all");

     /*
     Stores what the user types into the search bar as variable 'value'
     Function that filters through each course card and checks for word matching.
     If there is a successful match based on text, the specific course card will be left on screen.
     If not, it will be toggled off.
     */
     var value = jQuery(this).val().toLowerCase();
     jQuery(".course-card").filter(function() {
       jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(value) > -1)
     });

     countClasses();

   });

   /*
    * (NEW-MOBILE) Filter the page based on the typeahead search input
    * Dropdown menu id's are distinct from the desktop users. Will toggle
    * course cards based on proper word-match.
    */
   jQuery("#search-text2").on("keyup", function() {

     jQuery("#csb-instructor2").val("all");
     jQuery("#csb-course-name2").val("all");
     jQuery("#csb-title2").val("all");
     jQuery("#csb-credits2").val("all");
     jQuery("#csb-attributes2").val("all");


     var value2 = jQuery(this).val().toLowerCase();
     jQuery(".course-card").filter(function() {
       jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(value2) > -1)
     });

     countClasses();

   });

   // Clear the search button -----------------------------------------
   jQuery("#clear-search").on("click", function() {
     // clear the search text input
     jQuery("#search-text2").val("");

     // Reset all the dropdowns
     jQuery("#csb-instructor2").val("all");
     jQuery("#csb-course-name2").val("all");
     jQuery("#csb-title2").val("all");
     jQuery("#csb-credits2").val("all");
     jQuery("#csb-attributes2").val("all");

     // show all the cards
     jQuery(".course-card").fadeIn();

     // Show the number of courses displayed
     countClasses();

   });


   // Reset all the search Filters ---------------------------------
   jQuery("#reset-the-filters2").on("click", function() {

     // Reset the search field
     jQuery("#search-text2").val("");

     // Write all to all dropdowns
     jQuery("#csb-instructor2").val("all");
     jQuery("#csb-course-name2").val("all");
     jQuery("#csb-title2").val("all");
     jQuery("#csb-credits2").val("all");
     jQuery("#csb-attributes2").val("all");

     // show all the cards
     jQuery(".course-card").fadeIn();

     // Show the number of courses displayed
     countClasses();


   });

   // Get an array of all instructors
   var allInstructors2 = [];
   jQuery('.course-instructor > h5').each(function(i, e) {
     if (jQuery(e).text() != "") {
       allInstructors2.push(jQuery(e).text());
     }
   });
   // sort the array
   allInstructors2.sort();
   // Dedupe the array
   allInstructors2 = jQuery.unique(allInstructors2);
   // Add the instructors to the instructor ul element
   for (i = 0; i < allInstructors2.length; i++) {
     jQuery("#csb-instructor2").append("<option value='" + allInstructors2[i] + "'>" + allInstructors2[i] + "</option>");
   }

   // --------------------------------------------------------

   // Get an array of all credit hours
   var allCreditHours = [];
   jQuery('.cd-credits').each(function(i, e) {
     allCreditHours.push(jQuery(e).text());
   });
   // sort the array
   allCreditHours.sort();
   // Dedupe the array
   allCreditHours = jQuery.unique(allCreditHours);
   // Add the instructors to the instructor ul element
   for (i = 0; i < allCreditHours.length; i++) {
     jQuery("#csb-credits").append("<option value='" + allCreditHours[i] + "'>" + allCreditHours[i] + "</option>");
   }

   //(NEW-MOBILE) Get an array of all credit hours
   var allCreditHours = [];
   jQuery('.cd-credits span#sub-credits').each(function(i, e) {
     allCreditHours.push(jQuery(e).text());
   });
   // sort the array
   allCreditHours.sort();
   // Dedupe the array
   allCreditHours = jQuery.unique(allCreditHours);
   // Add the instructors to the instructor ul element
   for (i = 0; i < allCreditHours.length; i++) {
     jQuery("#csb-credits2").append("<option value='" + allCreditHours[i] + "'>" + allCreditHours[i] + "</option>");
   }

   // --------------------------------------------------------

   // Get an array of all disciplines
   var allCourseName = [];
   jQuery('.cd-department').each(function(i, e) {
     if (jQuery(e).text() != "") {
       allCourseName.push(jQuery(e).text());
     }
   });
   // sort the array
   allCourseName.sort();
   // Dedupe the array
   allCourseName = jQuery.unique(allCourseName);
   // Add the instructors to the instructor ul element
   for (i = 0; i < allCourseName.length; i++) {
     jQuery("#csb-course-name2").append("<option value='" + allCourseName[i] + "'>" + allCourseName[i] + "</option>");
   }


   // Get an array of course names ---------------------------------
   var allCourses = [];
   jQuery('.department-code').each(function(i, e) {
     if (jQuery(e).text() != "") {
       allCourses.push(jQuery(e).text());
     }
   });

   // sort the array
   allCourses.sort();

   // Dedupe the array
   allCourses = jQuery.unique(allCourses);

   // Add the instructors to the instructor ul element
   for (j = 0; j < allCourses.length; j++) {
     jQuery("#csb-title2").append("<option value='" + allCourses[j] + "'>" + allCourses[j] + "</option>");
   }

   // Get an array of attribute codes --------------------------------------------
   var allCodes = [];
   var simpleString = "";
   jQuery('.cd-attribute-codes').each(function(i, e) {

     if (jQuery(e).text() != "") {
       simpleString += jQuery(e).text() + ",";
     }

   });

   jQuery.each(simpleString.split(",").slice(0, -1), function(index, item) {
     allCodes.push(item);
   });

   // sort the array
   allCodes.sort();

   // Dedupe the array
   allCodes = jQuery.unique(allCodes);

   // Add the instructors to the instructor ul element
   for (j = 0; j < allCodes.length; j++) {
     jQuery("#csb-attributes").append("<option value='" + allCodes[j] + "'>" + allCodes[j] + "</option>");
   }

   // Add the instructors to the instructor ul element
   for (k = 0; k < allCodes.length; k++) {
     jQuery("#csb-attributes2").append("<option value='" + allCodes[k] + "'>" + allCodes[k] + "</option>");
   }



   // Filter on attribute codes -----------------------------------------
   jQuery("#csb-attributes").on("change", function() {

     // Clear the search text
     jQuery("#search-text").val("");
     jQuery("#search-text2").val("");
     // show all the cards
     jQuery(".course-card").fadeIn();

     // Reset all the dropdowns
     // jQuery("#csb-instructor").val("all");
     jQuery("#csb-course-name").val("all");
     jQuery("#csb-title").val("all");
     jQuery("#csb-credits").val("all");
     jQuery("#csb-instructor").val("all");

     var attributesValue = jQuery("#csb-attributes").val().toLowerCase();
     jQuery(".course-card").filter(function() {
       jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(attributesValue) > -1);
     });

     countClasses();

   });

   // (NEW-MOBILE) Filter on attributes
   jQuery("#csb-attributes2").on("change", function() {

     // Clear the search text
     jQuery("#search-text").val("");
     jQuery("#search-text2").val("");
     // show all the cards
     jQuery(".course-card").fadeIn();

     // Reset all the dropdowns
     // jQuery("#csb-instructor").val("all");
     jQuery("#csb-course-name2").val("all");
     jQuery("#csb-title2").val("all");
     jQuery("#csb-credits2").val("all");
     jQuery("#csb-instructor2").val("all");

     var attributesValue = jQuery("#csb-attributes2").val().toLowerCase();
     jQuery(".course-card").filter(function() {
       jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(attributesValue) > -1);
     });

     countClasses();

   });


   // Filter on instructor -----------------------------------------
   jQuery("#csb-instructor").on("change", function() {

     // Clear the search text
     jQuery("#search-text").val("");
     jQuery("#search-text2").val("");
     // show all the cards
     jQuery(".course-card").fadeIn();

     // Reset all the dropdowns
     // jQuery("#csb-instructor").val("all");
     jQuery("#csb-course-name").val("all");
     jQuery("#csb-title").val("all");
     jQuery("#csb-credits").val("all");
     jQuery("#csb-attributes").val("all");

     var instructorValue = jQuery("#csb-instructor").val().toLowerCase();
     jQuery(".course-card").filter(function() {
       jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(instructorValue) > -1)
     });

     countClasses();

   });

   // (NEW-MOBILE) Filter on instructor
   jQuery("#csb-instructor2").on("change", function() {

     // Clear the search text
     jQuery("#search-text").val("");
     jQuery("#search-text2").val("");
     // show all the cards
     jQuery(".course-card").fadeIn();

     // Reset all the dropdowns
     // jQuery("#csb-instructor").val("all");
     jQuery("#csb-course-name2").val("all");
     jQuery("#csb-title2").val("all");
     jQuery("#csb-credits2").val("all");
     jQuery("#csb-attributes2").val("all");

     var instructorValue = jQuery("#csb-instructor2").val().toLowerCase();
     jQuery(".course-card").filter(function() {
       jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(instructorValue) > -1)
     });

     countClasses();

   });

   // Filter on Course
   jQuery("#csb-title").on("change", function() {

     // Clear the search text
     jQuery("#search-text").val("");
     jQuery("#search-text2").val("");
     // show all the cards
     jQuery(".course-card").fadeIn();

     // Reset all the dropdowns
     jQuery("#csb-instructor").val("all");
     jQuery("#csb-course-name").val("all");
     jQuery("#csb-attributes").val("all");
     jQuery("#csb-credits").val("all");

     var courseValue = jQuery("#csb-title").val().toLowerCase();
     jQuery(".course-card").filter(function() {
       jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(courseValue) > -1)
     });

     countClasses();


   });

   // (NEW-MOBILE) Filter on Course
   jQuery("#csb-title2").on("change", function() {

     // Clear the search text
     jQuery("#search-text").val("");
     jQuery("#search-text2").val("");
     // show all the cards
     jQuery(".course-card").fadeIn();

     // Reset all the dropdowns
     jQuery("#csb-instructor2").val("all");
     jQuery("#csb-course-name2").val("all");
     jQuery("#csb-attributes2").val("all");
     jQuery("#csb-credits2").val("all");

     var courseValue = jQuery("#csb-title2").val().toLowerCase();
     jQuery(".course-card").filter(function() {
       jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(courseValue) > -1)
     });

     countClasses();

   });

   // Filter on Credits
   jQuery("#csb-credits").on("change", function() {

     // Clear the search text
     jQuery("#search-text").val("");
     jQuery("#search-text2").val("");
     // show all the cards
     jQuery(".course-card").fadeIn();

     // Reset all the dropdowns
     jQuery("#csb-instructor").val("all");
     jQuery("#csb-course-name").val("all");
     jQuery("#csb-title").val("all");
     jQuery("#csb-attributes").val("all");

     var creditsValue = jQuery("#csb-credits").val().toLowerCase();
     jQuery(".course-card").filter(function() {
       jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(creditsValue) > -1)
     });

     countClasses();

   });

   // (NEW-MOBILE) Filter on Credits
   jQuery("#csb-credits2").on("change", function() {

     // Clear the search text
     jQuery("#search-text").val("");
     jQuery("#search-text2").val("");
     // show all the cards
     jQuery(".course-card").fadeIn();

     // Reset all the dropdowns
     jQuery("#csb-instructor2").val("all");
     jQuery("#csb-course-name2").val("all");
     jQuery("#csb-title2").val("all");
     jQuery("#csb-attributes2").val("all");

     var creditsValue = jQuery("#csb-credits2").val().toLowerCase();
     jQuery(".course-card").filter(function() {
       jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(creditsValue) > -1)
     });

     countClasses();

   });

   // Filter on Credits
   jQuery("#csb-course-name").on("change", function() {

     // Clear the search text
     jQuery("#search-text").val("");
     jQuery("#search-text2").val("");
     // show all the cards
     jQuery(".course-card").fadeIn();

     // Reset all the dropdowns
     jQuery("#csb-instructor").val("all");
     jQuery("#csb-attributes").val("all");
     jQuery("#csb-title").val("all");
     jQuery("#csb-credits").val("all");

     var courseNameValue = jQuery("#csb-course-name").val().toLowerCase();
     jQuery(".course-card").filter(function() {
       jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(courseNameValue) > -1)
     });

     countClasses();

   });

   //(NEW-MOBILE) Filter on Credits
   jQuery("#csb-course-name2").on("change", function() {

     // Clear the search text
     jQuery("#search-text").val("");
     jQuery("#search-text2").val("");
     // show all the cards
     jQuery(".course-card").fadeIn();

     // Reset all the dropdowns
     jQuery("#csb-instructor2").val("all");
     jQuery("#csb-attributes2").val("all");
     jQuery("#csb-title2").val("all");
     jQuery("#csb-credits2").val("all");

     var courseNameValue = jQuery("#csb-course-name2").val().toLowerCase();
     jQuery(".course-card").filter(function() {
       jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(courseNameValue) > -1)
     });

     countClasses();

   });

   // Look into using a variable with replace() rather than literal strings (see next two lines)
   // var dateObj = new Date();
   // var thisYear = dateObj.getFullYear() + "-";

   // Parse the date format to remove the 2019 and turn the hyphens into slashes
   // for (var l = 0; l < 2; l++) {
   //   jQuery(".cd-date").text(function() {
   //     return jQuery(this).text().replace("2020-", "").replace("00:00:00 UTC", "");
   //   });
   // }
   //
   // // months
   // jQuery(".cd-date").text(function() {
   //   return jQuery(this).text().replace("01-", "Jan ");
   // });
   // jQuery(".cd-date").text(function() {
   //   return jQuery(this).text().replace("02-", "Feb ");
   // });
   // jQuery(".cd-date").text(function() {
   //   return jQuery(this).text().replace("03-", "Mar ");
   // });
   // jQuery(".cd-date").text(function() {
   //   return jQuery(this).text().replace("04-", "Apr ");
   // });
   // jQuery(".cd-date").text(function() {
   //   return jQuery(this).text().replace("05-", "May ");
   // });
   // jQuery(".cd-date").text(function() {
   //   return jQuery(this).text().replace("06-", "Jun ");
   // });
   // jQuery(".cd-date").text(function() {
   //   return jQuery(this).text().replace("07-", "Jul ");
   // });
   // jQuery(".cd-date").text(function() {
   //   return jQuery(this).text().replace("08-", "Aug ");
   // });
   // jQuery(".cd-date").text(function() {
   //   return jQuery(this).text().replace("09-", "Sep ");
   // });
   // jQuery(".cd-date").text(function() {
   //   return jQuery(this).text().replace("10-", "Oct ");
   // });
   // jQuery(".cd-date").text(function() {
   //   return jQuery(this).text().replace("11-", "Nov ");
   // });
   // jQuery(".cd-date").text(function() {
   //   return jQuery(this).text().replace("12-", "Dec ");
   // });

   // CD Time

   // Parse the string return from html for cd-time ------------------------------------------------------

   // jQuery('.cd-time').each(function(i, e) {
   //   jQuery(this).html(jQuery(this).text());
   // });
   //
   // jQuery(".cd-time").text(function() {
   //   return jQuery(this).text().replace(/DEPARTMENTAL ASSIGNS/g, "");
   // });
   //
   // jQuery(".cd-time").text(function() {
   //   return jQuery(this).text().replace(/ONLINE COURSE/g, "");
   // });
   //
   // jQuery(".cd-time").text(function() {
   //   return jQuery(this).text().replace(/<br>/g, "");
   // });
   //
   // jQuery(".cd-time").text(function() {
   //   return jQuery(this).text().replace(/ - /g, "");
   // });
   //
   // jQuery(".cd-time").text(function() {
   //   return jQuery(this).text().replace(" AM-", "am - ");
   // });
   //
   // jQuery(".cd-time").text(function() {
   //   return jQuery(this).text().replace(" PM-", "pm - ");
   // });
   //
   // jQuery(".cd-time").text(function() {
   //   return jQuery(this).text().replace(/ PM/gi, "pm ");
   // });
   //
   // jQuery(".cd-time").each(function(i, e) {
   //   var workingString = jQuery.trim(jQuery(this).text());
   //   var startDate = workingString.substr(0, 5);
   //   var endDate = workingString.substr(workingString.length - 5);
   //   // workingString.slice(0, 11);
   //   // workingString.slice(0, -11);
   //
   //   workingString = jQuery.trim(workingString.substring(14, workingString.length - 14));
   //
   //   jQuery(this).text(workingString + ", " + startDate + "-" + endDate);
   // });

   // Replace cd-times with null values
   // jQuery(".cd-time").text(function() {
   //   return jQuery(this).text().replace(", -", "TBD");
   // });
   //
   // // if exactly 24 characters, remove first 13 and add TBD
   // jQuery(".cd-time").text(function() {
   //   if (jQuery(this).text().length == 23) {
   //     return "TBD, " + jQuery(this).text().slice("13");
   //   }
   // });
   //
   // // if exactly 13 characters, remove first 13 and add TBD
   // jQuery(".cd-time").text(function() {
   //   if (jQuery(this).text().length == 13) {
   //     return "TBD, " + jQuery(this).text().slice("2");
   //   }
   // });

   // Remove the Ps and Bs in the caption pop ups
   jQuery(".class-detail-paragraph").text(function() {
     return jQuery(this).text().replace(/<P>/gi, "");
   });

   jQuery(".class-detail-paragraph").text(function() {
     return jQuery(this).text().replace(/<b>/gi, "");
   });

   // Open a new window for registration button
   jQuery(".open-registration-window").on("click", function() {
     window.open("https://summersession.nd.edu/apply/", "_blank");
   });

   // Parse the string return from html for descriptions  -- reactivated
   jQuery('.description-text').each(function(i, e) {
     jQuery(this).html(jQuery(this).text());
   });

   jQuery(".fa-angle-up").removeClass("fa-angle-up").addClass("fa-caret-up").addClass("fa-2x");

   // Put the course description in the modal
   jQuery(".show-description").on("click", function() {
     var textToMove = jQuery(this).next("div").html();

     // Move the text and the title to the modal
     jQuery(".course-info").html(textToMove);
     // jQuery(".course-name-modal").html(titleToMove);

     // Show the backdrop
     jQuery(".backdrop").css("display", "block");

     // Show the modal
     jQuery("#course-description-modal").fadeToggle();


     // Close the modal when you click on the backdrop
     jQuery(".backdrop").on("click", closeModal);

     // Close the modal with the modal-close-button
     jQuery(".modal-close-button").on("click", closeModal);

   });

   // Display the attribute codes modal
   jQuery(".cd-attribute-codes").on("click", function() {

     // Show the backdrop
     jQuery(".backdrop").css("display", "block");

     // Show the modal
     jQuery("#attributes-modal").fadeToggle();


     // Close the modal when you click on the backdrop
     jQuery(".backdrop").on("click", closeModal);

     // Close the modal with the modal-close-button
     jQuery(".modal-close-button").on("click", closeModal);

   });

   jQuery('.cd-time br').each(function() {
     jQuery(this).remove();
   });

   // close modal function
   function closeModal() {
     jQuery(".backdrop").fadeOut();
     jQuery("#course-description-modal").fadeOut();
     jQuery("#attributes-modal").fadeOut();
   }

   // Parse the date and timeout
   // Remove the br
   // jQuery('.cd-time span').each(function() {
   //   console.log(jQuery(this));
   //   jQuery(this).next("br").remove();
   // });
   //
   // jQuery('.cd-time').each(function() {
   //   var stringy = jQuery(this).find("span span").text();
   //   console.log(stringy);
   // });

   // Replace the comma in attribute-codes with comma space --------------------------
   jQuery(".cd-attribute-codes").text(function() {
     return jQuery(this).text().replace(/,/gi, ", ");
   });


   // Attribute search ---------------------------------------------------------------
   jQuery("#clear-attribute-search").on("click", function() {
     jQuery("#code-search").val("");
   });


   // Count the number of classes (class cards) and write them to the dom -------------
   function countClasses() {
     var numCards = jQuery('.course-card:visible').length;

     if (numCards !== 1) {
       jQuery("#number-of-classes").html(numCards + " COURSES");
     } else {
       jQuery("#number-of-classes").html(numCards + " COURSE");
     }
   }


   // Put TBD for courses that have no instructor assigned -------------------------
   jQuery('.course-instructor h5').each(function(i, e) {
     if (jQuery(e).text() == "") {
       jQuery(e).text("TBD");
     }
   });

   // Attributes search functionality ------------------------------------------------

   // set focus on clear search clicked
   jQuery("#clear-attribute-search").on("click", function() {
     // Clear the input and put focus inside the search field again
     jQuery("#code-search").val("").focus();
     // Show all the cards
     jQuery(".attribute-tr").fadeIn();
   });

   // Filter functionality
   jQuery("#code-search").on("keyup", function() {
     var value = jQuery(this).val().toLowerCase();
     jQuery(".attribute-tr").filter(function() {
       jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(value) > -1)
     });
   });

   // document.getElementById("loader").style.display = "none";
   // document.getElementById("main-content").style.display = "block";

  }

 });
 // document.ready
