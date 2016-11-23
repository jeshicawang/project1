/* global moment */

var user = {
  username: 'jeshicawang',
  profilePic: 'images/profile-picture.jpg',
  aboutMe: 'Female. 20. Coffee lover. Argentine Tango Dancer. Future software developer;)',
  updates: [ { timestamp: newMoment('5:00PM 11/22/16'), post: 'I\'m going home for the day!' },
             { timestamp: newMoment('4:30PM 11/22/16'), post: 'Class just ended.' },
             { timestamp: newMoment('12:15PM 11/22/16'), post: '...and lunch is over, so back to class.' },
             { timestamp: newMoment('11:30AM 11/22/16'), post: 'Off to my lunch break! Maybe I\'ll go acrross the street?' },
             { timestamp: newMoment('9:00AM 11/22/16'), post: 'Starting my weekday by going to coding class!' } ]
};

function newMoment(timestamp) {
  return moment(timestamp, 'h:mmA M/D/YY');
}

function printMoment(timestamp) {
  return timestamp.format('h:mmA M/D/YY');
}

function node(text) {
  return document.createTextNode(text);
}

function getChildren(index) {
  return [createElement('h4', { class: 'username' }, node('@' + user.username)),
          createElement('p', { class: 'timestamp' }, node(printMoment(user.updates[index].timestamp))),
          createElement('p', { class: 'post' }, node(user.updates[index].post))];
}

function createElement(tag, attributes, children) {
  var newElement = document.createElement(tag);
  for (var key in attributes) {
    newElement.setAttribute(key, attributes[key]);
  }
  if (children) {
    if (!(children instanceof Array))
      children = [children];
    for (var i = 0; i < children.length; i++) {
      newElement.appendChild(children[i]);
    }
  }
  return newElement;
}

function displayUserInfo() {
  var profileContainer = document.getElementById('profile');
  profileContainer.appendChild(createElement('div', { id: 'photo' }, null));
  var profilePic = document.getElementById('photo');
  profilePic.style.backgroundImage = 'url(' + user.profilePic + ')';
  var children = [createElement('h3', { id: 'username' }, node('@' + user.username)),
                  createElement('p', { id: 'about-me' }, node(user.aboutMe))];
  profileContainer.appendChild(createElement('div', { id: 'description' }, children));
}

function displayExistingUpdates() {
  var updatesContainer = document.getElementById('updates');
  for (var i = 0; i < user.updates.length; i++) {
    updatesContainer.appendChild(createElement('div', { class: 'update' }, getChildren(i)));
  }
}

function enablePosting() {
  var postButton = document.getElementById('post-button');
  postButton.addEventListener('click', addUpdate, false);
}

function addUpdate() {
  var updatesContainer = document.getElementById('updates');
  var post = document.getElementById('post-text').value;
  user.updates.unshift({ timestamp: moment(), post: post });
  updatesContainer.insertBefore(createElement('div', { class: 'update'}, getChildren(0)), updatesContainer.firstChild);
}

displayUserInfo();
displayExistingUpdates();
enablePosting();
