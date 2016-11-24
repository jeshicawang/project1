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

var containerPointer = document.getElementById('updates');
var pointer;

function newMoment(timestamp) {
  return moment(timestamp, 'h:mmA M/D/YY')  ;
}

function printMoment(timestamp) {
  return timestamp.format('h:mmA M/D/YY');
}

function newUpdate(timestamp, post) {
  return { timestamp: timestamp, post: post };
}

function newElement(tagName, className, text) {
  var newElement = document.createElement(tagName);
  newElement.className = className;
  if (text !== null)
    newElement.appendChild(document.createTextNode(text));
  return newElement;
}

function displayUserInfo() {
  pointer = document.getElementById('photo');
  pointer.style.backgroundImage = 'url(' + user.profilePicture + ')';
  pointer = document.getElementById('username');
  pointer.appendChild(document.createTextNode('@' + user.username));
  pointer = document.getElementById('about-me');
  pointer.appendChild(document.createTextNode(user.aboutMe));
}

function displayExistingUpdates() {
  var i;
  for (i = 0; i < user.updates.length; i++) {
    containerPointer.appendChild(newElement('div', 'update', null));
    displayPost(containerPointer.lastChild, i);
  }
}

function displayPost(pointer, index) {
  pointer.appendChild(newElement('h4', 'username', '@' + user.username));
  pointer.appendChild(newElement('p', 'timestamp', printMoment(user.updates[index].timestamp)));
  pointer.appendChild(newElement('p', 'post', user.updates[index].post));
}

function addUpdate() {
  var post = document.getElementById('post-text').value;
  user.updates.unshift(newUpdate(moment(), post));
  containerPointer.insertBefore(newElement('div', 'update', null), containerPointer.firstChild);
  displayPost(containerPointer.firstChild, 0);
}

function enablePosting() {
  pointer = document.getElementById('post-button');
  pointer.addEventListener('click', addUpdate, false);
}

displayUserInfo();
displayExistingUpdates();
enablePosting();
