var user = {
  username: 'jwang',
  profilePicture: 'images/profile-picture.jpg',
  aboutMe: 'Female. 20. Coffee lover. Dancer. Future software developer;)',
  updates: [newUpdate('5:00pm', 'Going home for the day! :D'),
            newUpdate('4:30pm', 'Class just ended.'),
            newUpdate('12:15pm', '...and back to class!'),
            newUpdate('11:30am', 'Off to my lunch break!'),
            newUpdate('9:00am', 'Starting my weekday by going to coding class! Starting my weekday by going to coding class! Starting my weekday by going to coding class!')]
}

var childPointer;

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

function displayProfile() {
  var pointer = document.getElementById('photo');
  pointer.style.backgroundImage = 'url(' + user.profilePicture + ')';
  pointer = document.getElementById('username');
  pointer.appendChild(document.createTextNode('@' + user.username));
  pointer = document.getElementById('about-me');
  pointer.appendChild(document.createTextNode(user.aboutMe));
}

function displayUpdates() {
  var i;
  var containerPointer = document.getElementById('updates');
  for (i = 0; i < user.updates.length; i++) {
    containerPointer.appendChild(newElement('div', 'update', null));
    childPointer = containerPointer.lastChild;
    childPointer.appendChild(newElement('h4', 'username', '@' + user.username))
    childPointer.appendChild(newElement('p', 'timestamp', user.updates[i].timestamp))
    childPointer.appendChild(newElement('p', 'post', user.updates[i].post))
  }
}

displayProfile();
displayUpdates();
