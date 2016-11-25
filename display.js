/* global moment */

var users = [ { username: 'jwang',
                firstName: 'Jessica',
                lastName: 'Wang',
                profilePic: 'images/profile-picture.jpg',
                aboutMe: 'Female. 20. Coffee lover. Argentine Tango Dancer. Future software developer;)' },
              { username: 'biagiduval',
                firstName: 'Rodolfo',
                lastName: 'Biagi',
                profilePic: 'images/biagi.jpg',
                aboutMe: 'An Argentine Tango musician who started his musical career by playing background music for silent movies, and this was where he was first discovered by a tango band leader.' },
];

var primaryUser = users[0];
var currentlyViewing = primaryUser.username;
var userInput = false;

var updates = [ { user: 'jwang', timestamp: newMoment('5:00PM 11/22/16'), post: 'I\'m going home for the day!' },
                { user: 'jwang', timestamp: newMoment('4:30PM 11/22/16'), post: 'Class just ended.' },
                { user: 'jwang', timestamp: newMoment('12:15PM 11/22/16'), post: '...and lunch is over, so back to class.' },
                { user: 'biagiduval', timestamp: newMoment('5:00PM 11/22/16'), post: 'Todo es amor, la brisa y tú, jugando en el rumor, y el ruiseñor, cantando en una flor, buscando amor, amor.' },
                { user: 'biagiduval', timestamp: newMoment('5:00PM 11/22/16'), post: 'La soledad, que me envuelve el corazón, va encendiendo en mi alma, el fuego de tu amor lejano. En las brumas de tu olvido, viaja mi ilusión, gritando tu nombre en vano.' },
                { user: 'biagiduval', timestamp: newMoment('5:00PM 11/22/16'), post: 'Soñemos, que los dos estamos libres. Soñemos, en la gloria de este amor. Soñemos, que ya nada nos separa, y que somos cual dos almas, que nacieron para amar.' },
                { user: 'jwang', timestamp: newMoment('11:30AM 11/22/16'), post: 'Off to my lunch break! Maybe I\'ll go acrross the street?' },
                { user: 'jwang', timestamp: newMoment('9:00AM 11/22/16'), post: 'Starting my weekday by going to coding class!' } ];

function newMoment(timestamp) {
  return moment(timestamp, 'h:mmA M/D/YY');
}

function printMoment(timestamp) {
  return timestamp.format('h:mmA M/D/YY');
}

function node(text) {
  return document.createTextNode(text);
}

function getUpdateElements(user, index) {
  return [createElement('img', { class: 'photo', src: user.profilePic }, null),
          createElement('h4', { class: 'name' }, node(user.firstName + ' ' + user.lastName)),
          createElement('p', { class: 'username' }, node('@' + user.username)),
          createElement('p', { class: 'timestamp' }, node(printMoment(updates[index].timestamp))),
          createElement('p', { class: 'post' }, node(updates[index].post))];
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

function displayProfile(user) {
  var profileContainer = document.getElementById('profile');
  profileContainer.appendChild(createElement('div', { class: 'photo shadow' }, null));
  var profilePic = document.querySelector('.photo');
  profilePic.style.backgroundImage = 'url(' + user.profilePic + ')';
  var children = [createElement('h2', { id: 'name' }, node(user.firstName + ' ' + user.lastName)),
                  createElement('p', { id: 'username' }, node('@' + user.username)),
                  createElement('p', { id: 'about-me' }, node(user.aboutMe))];
  profileContainer.appendChild(createElement('div', { id: 'description' }, children));
  var updatesContainer = document.getElementById('updates');
  for (var i = 0; i < updates.length; i++) {
    if (updates[i].user === user.username)
      updatesContainer.appendChild(createElement('div', { class: 'update' }, getUpdateElements(user, i)));
  }
  currentlyViewing = user.username;
}

function empty(ids) {
  if (! (ids instanceof Array))
    ids = [ids]
  for (var i = 0; i < ids.length; i++) {
    var container = document.getElementById(ids[i]);
    while (container.firstChild)
      container.removeChild(container.firstChild);
  }
}

function enableEventListeners() {
  document.getElementById('post-input').addEventListener('click', modifyTextbox, false);
  document.getElementById('post-input').addEventListener('blur', modifyTextbox, false);
  document.getElementById('post-button').addEventListener('click', addUpdate, false);
  document.getElementById('search-button').addEventListener('click', switchUser, false);
}

function modifyTextbox() {
  var textbox = document.getElementById('post-input');
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
    var post = document.getElementById('post-input');
    if (post.value.trim()) {
      updates.unshift({ user: primaryUser.username, timestamp: moment(), post: post.value });
      if (currentlyViewing === primaryUser.username)
        updatesContainer.insertBefore(createElement('div', { class: 'update'}, getUpdateElements(primaryUser, 0)), updatesContainer.firstChild);
      post.value = 'Type a new update...';
      post.style.color = '#b2b2b2';
      userInput = false;
    }
  }
}

function switchUser() {
  empty(['profile', 'updates']);
  var username = document.getElementById('search-input').value;
  for (var i = 0; i < users.length; i++) {
    if (users[i].username === username)
      displayProfile(users[i]);
  }
}

displayProfile(primaryUser);
enableEventListeners();
