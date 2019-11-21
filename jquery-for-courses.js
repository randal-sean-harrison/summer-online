jQuery(document).ready(function() {

  // Hide the description text at start
  jQuery(".description-text").hide();

  // Filter the page based on the typeahead search input
  jQuery("#search-text").on("keyup", function() {

    jQuery("#csb-instructor").val("all");
    jQuery("#csb-course-name").val("all");
    jQuery("#csb-title").val("all");
    jQuery("#csb-credits").val("all");

    var value = jQuery(this).val().toLowerCase();
    jQuery(".course-card").filter(function() {
      jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  // Clear search button
  jQuery("#clear-search").on("click", function() {
    // clear the search text input
    jQuery("#search-text").val("").focus();

    // Reset all the dropdowns
    jQuery("#csb-instructor").val("all");
    jQuery("#csb-course-name").val("all");
    jQuery("#csb-title").val("all");
    jQuery("#csb-credits").val("all");

    // show all the cards
    jQuery(".course-card").fadeIn();
  });

  // Toggle the descriptions
  jQuery(".toggle-description").on("click", function() {
    jQuery(this).next("div").slideToggle("fast");
    return false;
  });

  // Reset all the search Filters
  jQuery("#reset-the-filters").on("click", function() {
    jQuery("#csb-instructor").val("all");
    jQuery("#csb-course-name").val("all");
    jQuery("#csb-title").val("all");
    jQuery("#csb-credits").val("all");

    // show all the cards
    jQuery(".course-card").fadeIn();

  });

  // Show and hide all Descriptions
  jQuery("#show-hide-container").on("click", function() {
    //

    if (jQuery("#show-hide-container i").hasClass("fa-eye")) {

      // change the eye-con
      jQuery("#show-hide-container i").removeClass("fa-eye");
      jQuery("#show-hide-container i").addClass("fa-eye-slash");

      // change the Hide to Show
      jQuery("#show-hide-label").text("Hide");

      // hide all the panels
      jQuery(".toggle-description").next("div").slideDown("fast");

    } else {

      jQuery("#show-hide-container i").removeClass("fa-eye-slash");
      jQuery("#show-hide-container i").addClass("fa-eye");

      // hide all the panels
      jQuery(".toggle-description").next("div").slideUp("fast");

      // change the show to Hide
      jQuery("#show-hide-label").text("Show");
    }

  });

  // --------------------------------------------------------

  // Get an array of all instructors
  var allInstructors = [];
  jQuery('.course-instructor h5').each(function(i, e) {
    allInstructors.push(jQuery(e).text());
  });
  // sort the array
  allInstructors.sort();
  // Dedupe the array
  allInstructors = jQuery.unique(allInstructors);
  // Add the instructors to the instructor ul element
  for (i = 0; i < allInstructors.length; i++) {
    jQuery("#csb-instructor").append("<option value='" + allInstructors[i] + "'>" + allInstructors[i] + "</option>");
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

  // --------------------------------------------------------

  // Get an array of all disciplines
  var allCourseName = [];
  jQuery('.cd-department').each(function(i, e) {
    allCourseName.push(jQuery(e).text());
  });
  // sort the array
  allCourseName.sort();
  // Dedupe the array
  allCourseName = jQuery.unique(allCourseName);
  // Add the instructors to the instructor ul element
  for (i = 0; i < allCourseName.length; i++) {
    jQuery("#csb-course-name").append("<option value='" + allCourseName[i] + "'>" + allCourseName[i] + "</option>");
  }

  // --------------------------------------------------------

  // Get an array of course names
  var allCourses = [];
  jQuery('.course-title p').each(function(i, e) {

    allCourses.push(jQuery(e).text());
  });

  // sort the array
  allCourses.sort();

  // Dedupe the array
  allCourses = jQuery.unique(allCourses);

  // Add the instructors to the instructor ul element
  for (j = 0; j < allCourses.length; j++) {
    jQuery("#csb-title").append("<option value='" + allCourses[j] + "'>" + allCourses[j] + "</option>");

  }

  // Slice the date
  // jQuery('.cd-date').each(function(i, d) {
  //   jQuery(this).replace('-', 'TBD');
  //   console.log(jQuery(this));
  // });

  // Filter on instructor
  jQuery("#csb-instructor").on("change", function() {

    // Clear the search text
    jQuery("#search-text").val("")
    // show all the cards
    jQuery(".course-card").fadeIn();

    // Reset all the dropdowns
    // jQuery("#csb-instructor").val("all");
    jQuery("#csb-course-name").val("all");
    jQuery("#csb-title").val("all");
    jQuery("#csb-credits").val("all");

    var instructorValue = jQuery("#csb-instructor").val().toLowerCase();
    jQuery(".course-card").filter(function() {
      jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(instructorValue) > -1)
    });

  });

  // Filter on Course
  jQuery("#csb-title").on("change", function() {

    // Clear the search text
    jQuery("#search-text").val("")
    // show all the cards
    jQuery(".course-card").fadeIn();

    // Reset all the dropdowns
    jQuery("#csb-instructor").val("all");
    jQuery("#csb-course-name").val("all");
    // jQuery("#csb-title").val("all");
    jQuery("#csb-credits").val("all");

    var courseValue = jQuery("#csb-title").val().toLowerCase();
    jQuery(".course-card").filter(function() {
      jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(courseValue) > -1)
    });

  });

  // Filter on Credits
  jQuery("#csb-credits").on("change", function() {

    // Clear the search text
    jQuery("#search-text").val("")
    // show all the cards
    jQuery(".course-card").fadeIn();

    // Reset all the dropdowns
    jQuery("#csb-instructor").val("all");
    jQuery("#csb-course-name").val("all");
    jQuery("#csb-title").val("all");
    // jQuery("#csb-credits").val("all");

    var creditsValue = jQuery("#csb-credits").val().toLowerCase();
    jQuery(".course-card").filter(function() {
      jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(creditsValue) > -1)
    });

  });

  // Filter on Credits
  jQuery("#csb-course-name").on("change", function() {

    // Clear the search text
    jQuery("#search-text").val("")
    // show all the cards
    jQuery(".course-card").fadeIn();

    // Reset all the dropdowns
    jQuery("#csb-instructor").val("all");
    // jQuery("#csb-course-name").val("all");
    jQuery("#csb-title").val("all");
    jQuery("#csb-credits").val("all");

    var courseNameValue = jQuery("#csb-course-name").val().toLowerCase();
    jQuery(".course-card").filter(function() {
      jQuery(this).toggle(jQuery(this).text().toLowerCase().indexOf(courseNameValue) > -1)
    });

  });

  // Look into using a variable with replace() rather than literal strings (see next two lines)
  // var dateObj = new Date();
  // var thisYear = dateObj.getFullYear() + "-";

  // Parse the date format to remove the 2019 and turn the hyphens into slashes
  for (var l = 0; l < 2; l++) {
    jQuery(".cd-date").text(function() {
      return jQuery(this).text().replace("2019-", "");
    });
  }

  // months
  jQuery(".cd-date").text(function() {
    return jQuery(this).text().replace("01-", "Jan ");
  });
  jQuery(".cd-date").text(function() {
    return jQuery(this).text().replace("02-", "Feb ");
  });
  jQuery(".cd-date").text(function() {
    return jQuery(this).text().replace("03-", "Mar ");
  });
  jQuery(".cd-date").text(function() {
    return jQuery(this).text().replace("04-", "Apr ");
  });
  jQuery(".cd-date").text(function() {
    return jQuery(this).text().replace("05-", "May ");
  });
  jQuery(".cd-date").text(function() {
    return jQuery(this).text().replace("06-", "Jun ");
  });
  jQuery(".cd-date").text(function() {
    return jQuery(this).text().replace("07-", "Jul ");
  });
  jQuery(".cd-date").text(function() {
    return jQuery(this).text().replace("08-", "Aug ");
  });
  jQuery(".cd-date").text(function() {
    return jQuery(this).text().replace("09-", "Sep ");
  });
  jQuery(".cd-date").text(function() {
    return jQuery(this).text().replace("10-", "Oct ");
  });
  jQuery(".cd-date").text(function() {
    return jQuery(this).text().replace("11-", "Nov ");
  });
  jQuery(".cd-date").text(function() {
    return jQuery(this).text().replace("12-", "Dec ");
  });

  // Parse the string return from html for cd-time
  jQuery('.cd-time').each(function(i, e) {
    jQuery(this).html(jQuery(this).text());
  });

  // Remove Departmental Assigns from cd-time
  jQuery('.cd-time span').each(function(i, e) {
    jQuery(this).text(function() {
      return jQuery(this).text().replace("DEPARTMENTAL ASSIGNS", "");
    });
  });

  // Parse the string return from html for descriptions
  jQuery('.decription-text').each(function(i, e) {
    jQuery(this).html(jQuery(this).text());
  });


  jQuery(".fa-angle-up").removeClass("fa-angle-up").addClass("fa-caret-up").addClass("fa-2x");


  // Remove the stupid capital P elements
  // jQuery(".cd-date").text(function() {
  //   return jQuery(this).text().replace("<P>", "");
  // });

  // Remove the stupid b (deprecated) bold elements
  // jQuery(".cd-date").text(function() {
  //   return jQuery(this).text().replace("<b>", "");
  // });

});
// document.ready
