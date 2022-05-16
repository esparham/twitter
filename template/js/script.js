const container = document.getElementsByClassName('container')[0];
const sideMenu = document.getElementById('side-menu');
const newTwittModal = document.getElementById('new-twitt-modal');

function showSideMenu() {
  sideMenu.style.left = '0';
  container.style.filter = 'blur(4px)';
}

function hideSideMenu() {
  sideMenu.style.left = '-280px';
  container.style.filter = 'none';
}

function showNewTwitModal() {
  newTwittModal.style.top = '0%';
}

function hideNewTwitModal() {
  newTwittModal.style.top = '100%';
}
