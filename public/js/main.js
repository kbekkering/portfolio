// Mobile Topnav
document.addEventListener('DOMContentLoaded', function() {
  let sidenav = document.querySelectorAll('.sidenav');
  let sidenavOptions = { 
    edge: 'left',
    draggable: true
  };
  M.Sidenav.init(sidenav, sidenavOptions);

  let editButton = document.querySelectorAll('.fixed-action-btn');
  let editButtonOptions = {
    
  };
  M.FloatingActionButton.init(editButton, editButtonOptions);
});
