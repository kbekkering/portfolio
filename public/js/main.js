document.addEventListener('DOMContentLoaded', function() {
  // Mobile sidenav
  let sidenav = document.querySelectorAll('.sidenav');
  let sidenavOptions = { 
    edge: 'left',
    draggable: true
  };
  M.Sidenav.init(sidenav, sidenavOptions);

  // floating action button
  let editButton = document.querySelectorAll('.fixed-action-btn');
  let editButtonOptions = {};
  M.FloatingActionButton.init(editButton, editButtonOptions);

  // dropdown showing years in navbar
  let yearsDropdown = document.querySelectorAll('.dropdown-trigger');
  let yearsOptions = {
    hover: true, 
    coverTrigger: false
  };
  M.Dropdown.init(yearsDropdown, yearsOptions);
});
