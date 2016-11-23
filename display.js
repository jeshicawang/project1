/* global moment */

var user = {
  username: 'jeshicawang',
  profilePicture: 'images/profile-picture.jpg',
  aboutMe: 'Female. 20. Coffee lover. Argentine Tango Dancer. Future software developer;)',
  updates: [newUpdate(newMoment('5:00PM 11/22/16'), 'I\'m going home for the day!'),
            newUpdate(newMoment('4:30PM 11/22/16'), 'Class just ended.'),
            newUpdate(newMoment('12:15PM 11/22/16'), '...and lunch is over, so back to class.'),
            newUpdate(newMoment('11:30AM 11/22/16'), 'Off to my lunch break! Maybe I\'ll go acrross the street?'),
            newUpdate(newMoment('9:00AM 11/22/16'), 'Starting my weekday by going to coding class!')]
}

function newMoment(timestamp) {
  return moment(timestamp, 'h:mmA M/D/YY')  ;
}

function printMoment(timestamp) {
  return timestamp.format('h:mmA M/D/YY');
}

function newUpdate(timestamp, post) {
  return { timestamp: timestamp, post: post };
}

function displayUserInfo() {
  var profileContainer = document.getElementById('profile');
  profileContainer.appendChild(createElement('div', { id: 'photo' }, null));
  var profilePic = document.getElementById('photo');
  profilePic.style.backgroundImage = 'url(' + user.profilePicture + ')';
  var username = createElement('h3', { id: 'username' }, document.createTextNode('@' + user.username));
  var aboutMe = createElement('p', { id: 'about-me' }, document.createTextNode(user.aboutMe));
  var children = [username, aboutMe];
  profileContainer.appendChild(createElement('div', { id: 'description' }, children));
}

function displayExistingUpdates() {
  var updatesContainer = document.getElementById('updates');
  for (var i = 0; i < user.updates.length; i++) {
    var children = createChildElements(i);
    updatesContainer.appendChild(createElement('div', { class: 'update' }, children));
  }
}

function createChildElements(index) {
  return [createElement('h4', { class: 'username' }, document.createTextNode('@' + user.username)),
          createElement('p', { class: 'timestamp' }, document.createTextNode(printMoment(user.updates[index].timestamp))),
          createElement('p', { class: 'post' }, document.createTextNode(user.updates[index].post))];
}

function createElement(tag, attributes, children) {
  var newElement = document.createElement(tag);
  for (var key in attributes) {
    newElement.setAttribute(key, attributes[key]);
  }
  if (children !== null) {
    if (!(children instanceof Array))
      children = [children];
    for (var i = 0; i < children.length; i++) {
      newElement.appendChild(children[i]);
    }
  }
  return newElement;
}

function enablePosting() {
  var postButton = document.getElementById('post-button');
  postButton.addEventListener('click', addUpdate, false);
}

function addUpdate() {
  var updatesContainer = document.getElementById('updates');
  var post = document.getElementById('post-text').value;
  user.updates.unshift(newUpdate(moment(), post));
  var children = createChildElements(0);
  updatesContainer.insertBefore(createElement('div', { class: 'update'}, children), updatesContainer.firstChild);
}

displayUserInfo();
displayExistingUpdates();
enablePosting();
