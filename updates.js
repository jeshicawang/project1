var user = {
  username: 'jwang',
  profilePicture: 'images/profile-picture.jpg',
  aboutMe: 'Female. 20. Coffee lover. Dancer. Future software developer;)',
  updates: [addUpdate('9am', 'Going to coding class!'),
            addUpdate('11:30am', 'Off to my lunch break!'),
            addUpdate('12:15pm', '...and back to class!'),
            addUpdate('4:30', 'Class is over for the day.'),
            addUpdate('5pm', 'Going home for dinner, gym, relaxation, dancing, whatever I feel like doing!'),]
}

function addUpdate(timestamp, post) {
  return { timestamp: timestamp, post: post };
}

var i;
var updateContainer = document.getElementById('updates');
for (i = 0; i < user.updates.length; i++) {
  var newUpdate = document.createElement('div');
  newUpdate.className = 'update';
  updateContainer.appendChild(newUpdate);
  var currentUpdate = updateContainer.lastChild;
  var newUsername = document.createElement('h4');
  newUsername.className = 'username';
  newUsername.appendChild(document.createTextNode(user.username));
  var newTimestamp = document.createElement('p');
  newTimestamp.className = 'timestamp';
  newTimestamp.appendChild(document.createTextNode(user.updates[i].timestamp));
  var newPost = document.createElement('p');
  newPost.className = 'post';
  newPost.appendChild(document.createTextNode(user.updates[i].post));
  currentUpdate.appendChild(newUsername);
  currentUpdate.appendChild(newTimestamp);
  currentUpdate.appendChild(newPost);
}
