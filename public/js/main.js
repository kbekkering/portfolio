// Mobile Topnav
document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('.sidenav');
  let options = { 
    edge: 'left',
    draggable: true
  };
  M.Sidenav.init(elems, options);
});
