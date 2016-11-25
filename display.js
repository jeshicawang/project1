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
  return [createElement('img', { class: 'photo', src: user.profilePic }, null),
          createElement('h4', { class: 'username' }, node('@' + user.username)),
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
  profileContainer.appendChild(createElement('div', { class: 'photo shadow' }, null));
  var profilePic = document.querySelector('.photo');
  profilePic.style.backgroundImage = 'url(' + user.profilePic + ')';
  var children = [createElement('h2', { id: 'username' }, node('@' + user.username)),
                  createElement('p', { id: 'about-me' }, node(user.aboutMe))];
  profileContainer.appendChild(createElement('div', { id: 'description' }, children));
}

function displayExistingUpdates() {
  var updatesContainer = document.getElementById('updates');
  for (var i = 0; i < user.updates.length; i++) {
    updatesContainer.appendChild(createElement('div', { class: 'update' }, getChildren(i)));
  }
}

var userInput = false;

function enableEventListeners() {
  document.getElementById('post-text').addEventListener('click', modifyTextbox, false);
  document.getElementById('post-text').addEventListener('blur', modifyTextbox, false);
  document.getElementById('post-button').addEventListener('click', addUpdate, false);
}

function modifyTextbox() {
  var textbox = document.getElementById('post-text');
  if (!userInput) {
    textbox.value = '';
    textbox.style.color = '#000';
    userInput = true;
  } else if (!textbox.value.trim()) {
    textbox.value = 'Type a new update...';
    textbox.style.color = '#b2b2b2';
    userInput = false;
  }
}

function addUpdate() {
  if (userInput) {
    var updatesContainer = document.getElementById('updates');
    var post = document.getElementById('post-text');
    if (post.value.trim()) {
      user.updates.unshift({ timestamp: moment(), post: post.value });
      updatesContainer.insertBefore(createElement('div', { class: 'update'}, getChildren(0)), updatesContainer.firstChild);
      post.value = 'Type a new update...';
      post.style.color = '#b2b2b2';
      userInput = false;
    }
  }
}

displayUserInfo();
displayExistingUpdates();
enableEventListeners();
