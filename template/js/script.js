const container = document.getElementsByClassName('container')[0];
const sideMenu = document.getElementById('side-menu');

function showSideMenu() {
  sideMenu.style.left = '0';
  container.style.filter = 'blur(4px)';
}

function hideSideMenu() {
  sideMenu.style.left = '-280px';
  container.style.filter = 'none';
}
