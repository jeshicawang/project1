/* global moment */

var users = [ { id: 0,
                username: 'jwang',
                firstName: 'Jessica',
                lastName: 'Wang',
                profilePic: 'images/jwang.jpg',
                aboutMe: 'Female. 20. Coffee lover. Argentine Tango Dancer. Future software developer;)',
                following: [],
                followers: [],
                updatesCount: 5 },
              { id: 1,
                username: 'biagi',
                firstName: 'Rodolfo',
                lastName: 'Biagi',
                profilePic: 'images/biagi.jpg',
                aboutMe: 'An Argentine Tango musician who started his musical career by playing background music for silent movies, and this was where he was first discovered by a tango band leader.',
                following: [],
                followers: [],
                updatesCount: 3 },
              { id: 2,
                username: 'varela',
                firstName: 'Hector',
                lastName: 'Varela',
                profilePic: 'images/varela.jpg',
                aboutMe: 'Héctor Varela was a musician criticized by the innovative players, but loved by the fans of dancing and popular tango.',
                following: [],
                followers: [],
                updatesCount: 2 },
];

var primaryUser = users[0];
var currentlyViewing = primaryUser;
var postUserInput = false;
var searchUserInput = false;

var updates = [ { userId: 0, timestamp: newMoment('5:00PM 11/22/16'), post: 'I\'m going home for the day!' },
                { userId: 0, timestamp: newMoment('4:30PM 11/22/16'), post: 'Class just ended.' },
                { userId: 2, timestamp: newMoment('2:00PM 11/22/16'), post: 'No me hablas tesoro mio, No me hablas ni me has mirado, Fueron tres años mi vida, Tres años muy lejos de tu corazon.' },
                { userId: 0, timestamp: newMoment('12:15PM 11/22/16'), post: '...and lunch is over, so back to class.' },
                { userId: 1, timestamp: newMoment('12:00PM 11/22/16'), post: 'Todo es amor, la brisa y tú, jugando en el rumor, y el ruiseñor, cantando en una flor, buscando amor, amor.' },
                { userId: 1, timestamp: newMoment('11:55AM 11/22/16'), post: 'La soledad, que me envuelve el corazón, va encendiendo en mi alma, el fuego de tu amor lejano. En las brumas de tu olvido, viaja mi ilusión, gritando tu nombre en vano.' },
                { userId: 1, timestamp: newMoment('11:45AM 11/22/16'), post: 'Soñemos, que los dos estamos libres. Soñemos, en la gloria de este amor. Soñemos, que ya nada nos separa, y que somos cual dos almas, que nacieron para amar.' },
                { userId: 0, timestamp: newMoment('11:30AM 11/22/16'), post: 'Off to my lunch break! Maybe I\'ll go across the street?' },
                { userId: 0, timestamp: newMoment('9:00AM 11/22/16'), post: 'Starting my weekday by going to coding class!' },
                { userId: 2, timestamp: newMoment('7:00AM 11/21/16'), post: 'Es la historia de un amor, como no hay otro igual. Que me hizo comprender, todo el bien todo el mal, que le dio luz a mi vida, apagandola después. ¡Ay, qué vida tan oscura, corazón, sin tu amor no viviré!' } ];

function newMoment(timestamp) {
  return moment(timestamp, 'h:mmA M/D/YY');
}

function getUpdateElements(user, index) {
  return [createElement('div', { class: 'photo', style: 'background-image:url('+ user.profilePic + ')' }, null),
          createElement('h4', { class: 'name' }, user.firstName + ' ' + user.lastName),
          createElement('p', { class: 'username' }, '@' + user.username),
          createElement('p', { class: 'timestamp' }, updates[index].timestamp.format('h:mmA M/D/YY')),
          createElement('p', { class: 'post' }, updates[index].post)];
}

function createElement(tag, attributes, children) {
  var newElement = document.createElement(tag);
  for (var key in attributes) {
    newElement.setAttribute(key, attributes[key]);
  }
  if (children === null)
    return newElement;
  if (!(children instanceof Element) && !(children instanceof Array)) {
    newElement.appendChild(document.createTextNode(children));
    return newElement;
  }
  if (!(children instanceof Array))
    children = [children];
  children.forEach(function(child) {
    newElement.appendChild(child);
  });
  return newElement;
}

function userInfo(user) {
  var userInfo = createElement('div', { id: 'user-info' },
                    [createElement('div', { class: 'photo' }, null),
                     createElement('div', { id: 'description' },
                        [createElement('h2', { id: 'name' }, user.firstName + ' ' + user.lastName),
                         createElement('p', { id: 'username' }, '@' + user.username),
                         createElement('p', { id: 'about-me' }, user.aboutMe)])]);
  var profilePic = userInfo.firstChild;
  profilePic.style.backgroundImage = 'url(' + user.profilePic + ')';
  if (user === primaryUser)
    return userInfo;
  var following = (primaryUser.following.indexOf(user.id) > -1);
  userInfo.appendChild(createElement('button', { id: 'follow' }, following ? 'Following' : 'Follow'));
  userInfo.lastChild.addEventListener('click', function() { follow(user.id) }, false);
  return userInfo;
}

function userUpdates(user) {
  var updatesToDisplay = []
  updates.forEach(function (update, index) {
    if (update.userId === user.id)
      updatesToDisplay.push(createElement('div', { class: 'update' }, getUpdateElements(user, index)));
  });
  return createElement('div', { id: 'updates', class: 'shadow' }, updatesToDisplay);
}

function stats(user) {
  return createElement('div', { id: 'stats', class: 'shadow' },
            [createElement('span', { id: 'posts', class: 'stat' },
                [createElement('p', { class: 'label' }, 'posts'),
                 createElement('p', { class: 'count' }, user.updatesCount)]),
             createElement('span', { id: 'following', class: 'stat' },
                [createElement('p', { class: 'label' }, 'following'),
                createElement('p', { class: 'count' }, user.following.length)]),
             createElement('span', { id: 'followers', class: 'stat' },
                [createElement('p', { class: 'label' }, 'followers'),
                createElement('p', { class: 'count' }, user.followers.length)])]);
}

function refreshStats() {
  remove('stats');
  var centerContainer = document.getElementById('center');
  centerContainer.insertBefore(stats(currentlyViewing), centerContainer.firstChild);
}

function allUpdates() {
  var updatesToDisplay = [];
  updates.forEach(function (update, index) {
    if(primaryUser.following.indexOf(update.userId) > -1)
      updatesToDisplay.push(createElement('div', { class: 'update' }, getUpdateElements(users[update.userId], index)));
  });
  return createElement('div', { id: 'updates', class: 'shadow' }, updatesToDisplay);
}

function follow(id) {
  var followButton = document.getElementById('follow').firstChild;
  if (followButton.data === 'Following') {
    var index = primaryUser.following.indexOf(id);
    primaryUser.following.splice(index, 1);
    index = users[id].followers.indexOf(primaryUser.id);
    users[id].followers.splice(index, 1);
    followButton.data = 'Follow';
  } else {
    primaryUser.following.unshift(id);
    users[id].followers.unshift(primaryUser.id);
    followButton.data = 'Following';
  }
  refreshStats(currentlyViewing);
}

function remove(ids) {
  if (! (ids instanceof Array))
    ids = [ids];
  ids.forEach(function (id) {
    var element = document.getElementById(id);
    if(element)
      element.parentElement.removeChild(element);
  });
}

function displayProfile(user) {
  var leftContainer = document.getElementById('left');
  leftContainer.appendChild(userInfo(user));
  var centerContainer = document.getElementById('center');
  centerContainer.insertBefore(stats(user), centerContainer.firstChild);
  centerContainer.appendChild(userUpdates(user));
  currentlyViewing = user;
}

function goHome() {
  remove(['user-info', 'stats', 'updates']);
  var centerContainer = document.getElementById('center');
  centerContainer.appendChild(allUpdates());
}

function switchUser(user) {
  remove(['user-info', 'stats', 'updates']);
  displayProfile(user);
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

function addUpdate() {
  if (postUserInput) {
    var updatesContainer = document.getElementById('updates');
    var post = document.getElementById('post-input');
    if (post.value.trim()) {
      updates.unshift({ userId: primaryUser.id, timestamp: moment(), post: post.value });
      primaryUser.updatesCount++;
      refreshStats(currentlyViewing);
      if (currentlyViewing === primaryUser)
        updatesContainer.insertBefore(createElement('div', { class: 'update'}, getUpdateElements(primaryUser, 0)), updatesContainer.firstChild);
      post.value = 'Type a new update...';
      post.style.color = '#b2b2b2';
      postUserInput = false;
    }
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

function checkSearchInput() {
  var input = document.getElementById('search-input').value;
  if (!input.trim())
    return;
  users.forEach( function(user) {
    if(user.username === input) {
      switchUser(user);
      return;
    }
  });
}

displayProfile(primaryUser);

document.getElementById('home-button').addEventListener('click', goHome, false);
document.getElementById('profile-button').addEventListener('click', function() { switchUser(primaryUser) }, false);
document.getElementById('post-input').addEventListener('focus', modifyPostTextbox, false);
document.getElementById('post-input').addEventListener('blur', modifyPostTextbox, false);
document.getElementById('post-button').addEventListener('click', addUpdate, false);
document.getElementById('search-input').addEventListener('focus', modifySearchTextbox, false);
document.getElementById('search-input').addEventListener('blur', modifySearchTextbox, false);
document.getElementById('search-button').addEventListener('click', checkSearchInput, false);
