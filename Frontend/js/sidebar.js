$(document).ready(function() {
    // Toggle submenu visibility on click
    $('#sidebar ul li a').click(function() {
      $(this).next('ul.submenu').slideToggle();
    });
  
    // Collapse all submenus when the sidebar is collapsed
    $('#sidebarCollapse').click(function() {
      $('#sidebar ul.submenu').slideUp();
    });
  });