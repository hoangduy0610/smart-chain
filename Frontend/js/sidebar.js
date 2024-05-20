$(document).ready(function () {
  $('#page-wrapper').prepend(`<div id="sidebar-loader"></div>`);
  $("#sidebar-loader").load('components/sidebar.html', function () {
    if ($(window).width() <= 768) {
      $('#sidebar').toggleClass('active')
      $('#sidebarCollapse').addClass('d-none');
    }

    const sidebarStatus = localStorage.getItem('@app/sidebarStatus');
    if (sidebarStatus === 'collapsed') {
      $('#sidebar').toggleClass('active');
      $("#sidebarCollapse").html(`<span class="fa fa-fw fa-bars"></span> Mở rộng Menu`);
    }
  });

  // Toggle submenu when clicking on parent item
  $('body').on('click', '#sidebar ul.components > li', function () {
    $(this).find('.submenu').toggleClass('active');
  });

  // Expand/collapse sidebar
  $('body').on('click', '#sidebarCollapse', function () {
    $('#sidebar').toggleClass('active').promise().done(() => {
      // Check if window is small enough so sidebar is hidden
      if ($(window).width() <= 768) {
        $('#content').toggleClass('d-none');
      }

      const sidebarText = $('#sidebar').hasClass('active') ? 'Mở rộng' : 'Thu nhỏ';
      $("#sidebarCollapse").html(`<span class="fa fa-fw fa-bars"></span> ${sidebarText} Menu`);

      const sidebarStatus = localStorage.getItem('@app/sidebarStatus');
      if (sidebarStatus === 'collapsed') {
        localStorage.setItem('@app/sidebarStatus', 'expanded');
      } else {
        localStorage.setItem('@app/sidebarStatus', 'collapsed');
      }
    });
  });

  // Close submenu when clicking outside of sidebar
  $(document).on('click', function (e) {
    if (!$(e.target).closest('#sidebar').length) {
      $('#sidebar ul.components .submenu').removeClass('active');
    }
  });
  
  // Toggle submenu visibility on click
  $('#sidebar ul li a').click(function () {
    $(this).next('ul.submenu').slideToggle();
  });

  // Collapse all submenus when the sidebar is collapsed
  $('#sidebarCollapse').click(function () {
    $('#sidebar ul.submenu').slideUp();
  });
});