/* global moment */

var users = [ { username: 'jwang',
                firstName: 'Jessica',
                lastName: 'Wang',
                profilePic: 'images/jwang.jpg',
                aboutMe: 'Female. 20. Coffee lover. Argentine Tango Dancer. Future software developer;)',
                following: [] },
              { username: 'biagi',
                firstName: 'Rodolfo',
                lastName: 'Biagi',
                profilePic: 'images/biagi.jpg',
                aboutMe: 'An Argentine Tango musician who started his musical career by playing background music for silent movies, and this was where he was first discovered by a tango band leader.',
                following: [] },
              { username: 'varela',
                firstName: 'Hector',
                lastName: 'Varela',
                profilePic: 'images/varela.jpg',
                aboutMe: 'Héctor Varela was a musician criticized by the innovative players, but loved by the fans of dancing and popular tango.',
                following: [] },
];

var primaryUser = users[0];
var currentlyViewing = primaryUser.username;
var postUserInput = false;
var searchUserInput = false;

var updates = [ { user: 'jwang', timestamp: newMoment('5:00PM 11/22/16'), post: 'I\'m going home for the day!' },
                { user: 'jwang', timestamp: newMoment('4:30PM 11/22/16'), post: 'Class just ended.' },
                { user: 'varela', timestamp: newMoment('2:00PM 11/22/16'), post: 'No me hablas tesoro mio, No me hablas ni me has mirado, Fueron tres años mi vida, Tres años muy lejos de tu corazon.' },
                { user: 'jwang', timestamp: newMoment('12:15PM 11/22/16'), post: '...and lunch is over, so back to class.' },
                { user: 'biagi', timestamp: newMoment('12:00PM 11/22/16'), post: 'Todo es amor, la brisa y tú, jugando en el rumor, y el ruiseñor, cantando en una flor, buscando amor, amor.' },
                { user: 'biagi', timestamp: newMoment('11:55AM 11/22/16'), post: 'La soledad, que me envuelve el corazón, va encendiendo en mi alma, el fuego de tu amor lejano. En las brumas de tu olvido, viaja mi ilusión, gritando tu nombre en vano.' },
                { user: 'biagi', timestamp: newMoment('11:45AM 11/22/16'), post: 'Soñemos, que los dos estamos libres. Soñemos, en la gloria de este amor. Soñemos, que ya nada nos separa, y que somos cual dos almas, que nacieron para amar.' },
                { user: 'jwang', timestamp: newMoment('11:30AM 11/22/16'), post: 'Off to my lunch break! Maybe I\'ll go acrross the street?' },
                { user: 'jwang', timestamp: newMoment('9:00AM 11/22/16'), post: 'Starting my weekday by going to coding class!' },
                { user: 'varela', timestamp: newMoment('7:00AM 11/21/16'), post: 'Es la historia de un amor, como no hay otro igual. Que me hizo comprender, todo el bien todo el mal, que le dio luz a mi vida, apagandola después. ¡Ay, qué vida tan oscura, corazón, sin tu amor no viviré!' } ];

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
  profileContainer.appendChild(createElement('div', { class: 'photo' }, null));
  var profilePic = document.querySelector('.photo');
  profilePic.style.backgroundImage = 'url(' + user.profilePic + ')';
  var children = [createElement('h2', { id: 'name' }, node(user.firstName + ' ' + user.lastName)),
                  createElement('p', { id: 'username' }, node('@' + user.username)),
                  createElement('p', { id: 'about-me' }, node(user.aboutMe))];
  profileContainer.appendChild(createElement('div', { id: 'description' }, children));
  if (user !== primaryUser) {
    var following = false;
    for (var i = 0; i < primaryUser.following.length; i++)
      if (primaryUser.following[i] === user.username) {
        following = true;
      }
    profileContainer.appendChild(createElement('button', { id: 'follow' }, node(following ? 'Following' : 'Follow')));
    document.getElementById('follow').addEventListener('click', function() { follow(user.username) }, false);
  }
  var updatesContainer = document.getElementById('updates');
  for (i = 0; i < updates.length; i++) {
    if (updates[i].user === user.username)
      updatesContainer.appendChild(createElement('div', { class: 'update' }, getUpdateElements(user, i)));
  }
  currentlyViewing = user.username;
}

function follow(username) {
  var followButton = document.getElementById('follow').firstChild;
  if (followButton.data === 'Following') {
    var index = primaryUser.following.indexOf(username);
    primaryUser.following.splice(index, 1);
    followButton.data = 'Follow';
  } else {
    primaryUser.following.unshift(username);
    followButton.data = 'Following';
  }
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
  document.getElementById('profile-button').addEventListener('click', function() { switchUser(primaryUser) }, false);
  document.getElementById('post-input').addEventListener('focus', modifyPostTextbox, false);
  document.getElementById('post-input').addEventListener('blur', modifyPostTextbox, false);
  document.getElementById('post-button').addEventListener('click', addUpdate, false);
  document.getElementById('search-input').addEventListener('focus', modifySearchTextbox, false);
  document.getElementById('search-input').addEventListener('blur', modifySearchTextbox, false);
  document.getElementById('search-button').addEventListener('click', checkSearchInput, false);
}

function modifyPostTextbox() {
  var textbox = document.getElementById('post-input');
  if (!postUserInput) {
    textbox.value = '';
    textbox.style.color = '#000';
    postUserInput = true;
  } else if (!textbox.value.trim()) {
    textbox.value = 'Type a new update...';
    textbox.style.color = '#b2b2b2';
    postUserInput = false;
  }
}

function modifySearchTextbox() {
  var textbox = document.getElementById('search-input');
  if (!searchUserInput) {
    textbox.value = '';
    textbox.style.color = '#000';
    searchUserInput = true;
  } else if (!textbox.value.trim()) {
    textbox.value = 'Search';
    textbox.style.color = '#b2b2b2';
    searchUserInput = false;
  }
}

function addUpdate() {
  if (postUserInput) {
    var updatesContainer = document.getElementById('updates');
    var post = document.getElementById('post-input');
    if (post.value.trim()) {
      updates.unshift({ user: primaryUser.username, timestamp: moment(), post: post.value });
      if (currentlyViewing === primaryUser.username)
        updatesContainer.insertBefore(createElement('div', { class: 'update'}, getUpdateElements(primaryUser, 0)), updatesContainer.firstChild);
      post.value = 'Type a new update...';
      post.style.color = '#b2b2b2';
      postUserInput = false;
    }
  }
}

function checkSearchInput() {
  var input = document.getElementById('search-input').value;
  if (input.trim)
    for (var i = 0; i < users.length; i++) {
      if (users[i].username === input)
        switchUser(users[i]);
    }
}

function switchUser(user) {
  empty(['profile', 'updates']);
  displayProfile(user);
}

displayProfile(primaryUser);
enableEventListeners();
