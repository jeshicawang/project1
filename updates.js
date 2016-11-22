var user = {
  username: 'jwang',
  profilePicture: 'images/profile-picture.jpg',
  aboutMe: 'Female. 20. Coffee lover. Dancer. Future software developer;)',
  updates: [newUpdate('9am', 'Starting my weekday by going to coding class!'),
            newUpdate('11:30am', 'Off to my lunch break!'),
            newUpdate('12:15pm', '...and back to class!'),
            newUpdate('4:30', 'Class just ended.'),
            newUpdate('5pm', 'Going home for the day! Maybe I\'ll go dancing?'),]
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

var i;
var containerPointer = document.getElementById('updates');
var childPointer;
for (i = 0; i < user.updates.length; i++) {
  containerPointer.appendChild(newElement('div', 'update', null));
  childPointer = containerPointer.lastChild;
  childPointer.appendChild(newElement('h4', 'username', '@' + user.username))
  childPointer.appendChild(newElement('p', 'timestamp', user.updates[i].timestamp))
  childPointer.appendChild(newElement('p', 'post', user.updates[i].post))
}
