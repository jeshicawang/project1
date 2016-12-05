/* global moment */

var users = [ { id: 0,
                username: 'jwang',
                displayName: 'Jessica Wang',
                profilePic: 'images/jwang.jpg',
                bio: 'Coffee lover. Dancer. Future software developer;)',
                following: [3, 5],
                followers: [1, 2, 3, 4, 5, 6, 7],
                updatesCount: 5,
                likes: [] },
              { id: 1,
                username: 'biagi',
                displayName: 'Rodolfo Biagi',
                profilePic: 'images/biagi.jpg',
                bio: 'An Argentine Tango musician who started his musical career by playing background music for silent movies.',
                following: [0],
                followers: [],
                updatesCount: 3,
                likes: [] },
              { id: 2,
                username: 'varela',
                displayName: 'Hector Varela',
                profilePic: 'images/varela.jpg',
                bio: 'Varela was a musician criticized by the innovative players, but loved by the fans of dancing and popular tango.',
                following: [0],
                followers: [],
                updatesCount: 2,
                likes: [] },
              { id: 3,
                username: 'donato',
                displayName: 'Edgardo Donato',
                profilePic: 'images/donato.jpg',
                bio: 'Donato was a tango composer and orchestra leader, born in Buenos Aires, Argentina, raised from a young age and musically trained in Montevideo, Uruguay.',
                following: [0],
                followers: [0],
                updatesCount: 0,
                likes: [] },
              { id: 4,
                username: 'diaz',
                displayName: 'Hugo Diaz',
                profilePic: 'images/diaz.jpg',
                bio: 'Víctor Hugo Díaz was a tango, folklore and jazz harmonicist.',
                following: [0],
                followers: [],
                updatesCount: 0,
                likes: [] },
              { id: 5,
                username: 'dagostino',
                displayName: 'Angel D\'Agostino',
                profilePic: 'images/dagostino.jpg',
                bio: 'I am milonguero, I always was, in the best sense of the word.',
                following: [0],
                followers: [0],
                updatesCount: 0,
                likes: [] },
              { id: 6,
                username: 'darienzo',
                displayName: 'Juan D\'Arienzo',
                profilePic: 'images/darienzo.jpg',
                bio: 'Juan D\'Arienzo was an Argentine tango musician, also known as \"El Rey del Compás\".',
                following: [0],
                followers: [],
                updatesCount: 0,
                likes: [] },
              { id: 7,
                username: 'demare',
                displayName: 'Lucio Demare',
                profilePic: 'images/demare.jpg',
                bio: 'Lucio Demare was an Argentine composer who worked on a number of film scores.',
                following: [0],
                followers: [],
                updatesCount: 0,
                likes: [] },
];

var primaryUser = users[0];
var currentlyViewing = primaryUser;
var viewing = null;

var updates = { 0: { userId: 2, timestamp: newMoment('7:00AM 11/21/16'), post: 'Es la historia de un amor, como no hay otro igual. Que me hizo comprender, todo el bien todo el mal, que le dio luz a mi vida, apagandola después. ¡Ay, qué vida tan oscura, corazón, sin tu amor no viviré! #historiadeunamor #tango', likes: [] },
                1: { userId: 0, timestamp: newMoment('9:00AM 11/22/16'), post: 'Starting my weekday by going to coding class!', likes: [] },
                2: { userId: 0, timestamp: newMoment('11:30AM 11/22/16'), post: 'Off to my lunch break! Maybe I\'ll go across the street?', likes: [] },
                3: { userId: 1, timestamp: newMoment('11:45AM 11/22/16'), post: 'Soñemos, que los dos estamos libres. Soñemos, en la gloria de este amor. Soñemos, que ya nada nos separa, y que somos cual dos almas, que nacieron para amar. #sonemos #hugoduval #tango', likes: [] },
                4: { userId: 1, timestamp: newMoment('11:55AM 11/22/16'), post: 'La soledad, que me envuelve el corazón, va encendiendo en mi alma, el fuego de tu amor lejano. En las brumas de tu olvido, viaja mi ilusión, gritando tu nombre en vano. #caricias #hugoduval #tango', likes: [] },
                5: { userId: 1, timestamp: newMoment('12:00PM 11/22/16'), post: 'Todo es amor, la brisa y tú, jugando en el rumor, y el ruiseñor, cantando en una flor, buscando amor, amor. #todoesamor #hugoduval #tango', likes: [] },
                6: { userId: 0, timestamp: newMoment('12:15PM 11/22/16'), post: '...and lunch is over, so back to class.', likes: [] },
                7: { userId: 2, timestamp: newMoment('2:00PM 11/22/16'), post: 'No me hablas tesoro mio, No me hablas ni me has mirado, Fueron tres años mi vida, Tres años muy lejos de tu corazon. #fuerontresanos #tango', likes: [] },
                8: { userId: 0, timestamp: newMoment('4:30PM 11/22/16'), post: 'Class just ended.', likes: [] },
                9: { userId: 0, timestamp: newMoment('5:00PM 11/22/16'), post: 'I\'m going home for the day!', likes: [] },
                10: { userId: 3, timestamp: moment(), post: 'Sacále punta a esta milonga, que ya empezó. Seguí esos fueyes que rezongan, del corazón. Y las pebetas que han venido, del Club Fulgor. El tango requiebra la vida, Y en sus notas desparrama, su amor. #sacalepunta #milonga', likes: [] },
                11: { userId: 3, timestamp: moment(), post: '¡Carnaval de mi barrio!, donde todo es amor, cascabeles de risa, matizando el dolor, ¡carnaval de mi barrio!, pedacito de sol, con nostalgias de luna, y canción de farol. #carnavaldemibarrio #tango', likes: [] },
                12: { userId: 5, timestamp: moment(), post: 'Ahora no me conocés… ¡me borro tu ingratitud!… Aunque dejés mi alma trunca, no podrás olvidar nunca, lo de nuestra juventud… #ahoranomeconoces #angelvargas #tango', likes: [] },
                13: { userId: 5, timestamp: moment(), post:  'Mañanita arrabalera, Sin taitas por las veredas, Ni minas en el balcón, Tus faroles apagados. #adiosarrabal #angelvargas #tango', likes: [] },
                14: { userId: 1, timestamp: moment(), post: 'Ya sé que me has olvidado, ya sé que te fuiste lejos. Ya sé que con mis consejos, no te voy a enderezar. #campoafuera #milonga', likes: [] } }

var hashtags = { adiosarrabal: [13],
                 ahoranomeconoces: [12],
                 angelvargas: [12, 13],
                 campoafuera: [14],
                 caricias: [4],
                 carnavaldemibarrio: [11],
                 fuerontresanos: [7],
                 historiadeunamor: [0],
                 hugoduval: [3, 4, 5],
                 milonga: [10, 14],
                 sacalepunta: [10],
                 sonemos: [3],
                 tango: [0, 3, 4, 5, 7, 11, 12, 13],
                 todoesamor: [5] };

function newMoment(timestamp) {
  return moment(timestamp, 'h:mmA M/D/YY');
}

function createElement(tag, attributes, children) {
  var newElement = document.createElement(tag);
  for (var key in attributes) {
    newElement.setAttribute(key, attributes[key]);
  }
  if (!children && children !== 0) return newElement;
  if (!(children instanceof Element) && !(children instanceof Array)) {
    newElement.appendChild(document.createTextNode(children));
    return newElement;
  }
  if (!(children instanceof Array))
    children = [children];
  children.forEach( function(child) {
    if (!(child instanceof Element)) {
      newElement.appendChild(document.createTextNode(child));
      return;
    }
      newElement.appendChild(child);
  });
  return newElement;
}

function displayProfile(user) {
  if (!user) return;
  remove(['user-info', 'hashtag', 'stats', 'new-update', 'updates']);
  currentlyViewing = user;
  document.getElementById('left').appendChild(userInfo(user));
  document.getElementById('center').appendChild(stats(user));
  document.getElementById('posts').click();
}

function follow(id) {
  var following = primaryUser.following.includes(id);
  var suggestions = document.getElementsByClassName('plus');
  var index = (id < primaryUser.id) ? id : (id - 1);
  if (!following) {
    suggestions[index].className = 'plus lnr lnr-checkmark-circle';
    primaryUser.following.unshift(id);
    users[id].followers.unshift(primaryUser.id);
  } else {
    suggestions[index].className = 'plus lnr lnr-plus-circle';
    index = primaryUser.following.indexOf(id);
    primaryUser.following.splice(index, 1);
    index = users[id].followers.indexOf(primaryUser.id);
    users[id].followers.splice(index, 1);
  }
  if (!currentlyViewing)
    goHome();
  else {
    refreshStats(currentlyViewing);
    document.getElementById(viewing).click();
  }
  if (currentlyViewing !== users[id]) return;
  document.getElementById('follow').firstChild.data = following ? 'Follow' : 'Following';
}

function remove(ids) {
  if (! (ids instanceof Array))
    ids = [ids];
  ids.forEach(function (id) {
    var element = document.getElementById(id);
    if (!element) return;
    element.parentElement.removeChild(element);
  });
}

function empty(ids) {
  if (! (ids instanceof Array))
    ids = [ids];
  ids.forEach(function (id) {
    var element = document.getElementById(id);
    if (!element) return;
    while(element.firstChild)
      element.removeChild(element.firstChild);
  });
}

function goHome() {
  remove(['user-info', 'hashtag', 'stats', 'new-update', 'updates', 'list']);
  currentlyViewing = null;
  var centerContainer = document.getElementById('center');
  centerContainer.appendChild(updatePoster());
  centerContainer.appendChild(allUpdates());
}

function allUpdates() {
  var updatesToDisplay = [];
  for (var updateId in updates) {
    if(primaryUser.following.includes(updates[updateId].userId))
      updatesToDisplay.unshift(createElement('div', { class: 'update' }, getUpdateElements(users[updates[updateId].userId], updateId)));
  }
  if (updatesToDisplay.length)
    return createElement('div', { id: 'updates', class: 'shadow' }, updatesToDisplay);
  updatesToDisplay.push(createElement('div', { class: 'update' }, 'No updates to display. Follow other users to view their updates in your newsfeed.'));
  return createElement('div', { id: 'updates', class: 'shadow' }, updatesToDisplay);
}

function userInfo(user) {
  var userInfo = createElement('div', { id: 'user-info' },
                    [createElement('div', { class: 'photo' }, null),
                     createElement('div', { id: 'description' },
                        [createElement('h2', { id: 'name' }, user.displayName),
                         createElement('p', { id: 'username' }, '@' + user.username),
                         createElement('p', { id: 'about-me' }, user.bio)])]);
  var profilePic = userInfo.firstChild;
  profilePic.style.backgroundImage = 'url(' + user.profilePic + ')';
  if (user === primaryUser) {
    userInfo.appendChild(createElement('button', { id: 'edit-profile' }, 'Edit Profile'));
    userInfo.lastChild.addEventListener('click', function() { editProfile() }, false);
    return userInfo;
  }
  userInfo.appendChild(createElement('button', { id: 'follow' }, primaryUser.following.includes(user.id) ? 'Following' : 'Follow'));
  userInfo.lastChild.addEventListener('click', function() { follow(user.id) }, false);
  return userInfo;
}

function editProfile() {
  remove(['description', 'edit-profile']);
  var userInfo = document.getElementById('user-info');
  userInfo.appendChild(createElement('input', { id: 'image-upload', type: 'file' }, null));
  userInfo.lastChild.addEventListener('change', changeProfilePic, false);
  userInfo.appendChild(createElement('label', { for: 'image-upload' }, createElement('span', { class: 'lnr lnr-camera' }, null)));
  userInfo.appendChild(editor(primaryUser));
  userInfo.appendChild(createElement('p', { id: "error-msg" }, ' '));
  userInfo.appendChild(createElement('button', { id: 'save' }, 'Save'));
  userInfo.lastChild.addEventListener('click', saveProfile, false);
  var username = document.getElementById('username-text');
  username.addEventListener('keyup', function() { checkUsername(username.value) }, false);
}

function changeProfilePic() {
  var img = 'images/' + document.getElementById('image-upload').files[0].name;
  primaryUser.profilePic = img;
  var photos = document.getElementsByClassName('photo');
  for (var i = 0; i < photos.length; i++) {
    photos[i].style.backgroundImage = 'url(\'' + img + '\')';
  }
}

function editor(user) {
  return createElement('div', { id: 'editor', class: 'shadow' },
            [createElement('div', { id: 'name', class: 'field' },
                [createElement('div', {  }, createElement('span', { class: 'lnr lnr-laptop' }, null)),
                 createElement('textarea', { id: 'name-text', placeholder: 'Name', maxlength: '24' }, user.displayName)]),
             createElement('div', { id: 'username', class: 'field' },
                [createElement('div', {  }, createElement('span', { class: 'lnr lnr-user' }, null)),
                 createElement('textarea', { id: 'username-text', placeholder: 'Username', maxlength: '24' }, user.username),
                 createElement('div', { id: 'check' }, createElement('span', { class: 'lnr lnr-checkmark-circle' }, null)),
                 createElement('div', { id: 'cross' }, createElement('span', { class: 'lnr lnr-cross-circle' }, null))]),
             createElement('div', { id: 'bio', class: 'field' },
                [createElement('div', {  }, createElement('span', { class: 'lnr lnr-bubble' }, null)),
                 createElement('textarea', { id: 'bio-text', placeholder: 'Bio',  }, user.bio)])]);
}

function checkUsername(value) {
  var validCharacters = /^[a-z0-9_]*$/;
  var message = document.getElementById('error-msg');
  var cross = document.getElementById('cross');
  var check = document.getElementById('check');
  if (value === primaryUser.username || !value.length) {
    message.textContent = ' ';
    cross.style.visibility = 'hidden';
    check.style.visibility = 'hidden';
    return;
  }
  if (value.length < 4 || !validCharacters.test(value)) {
    message.textContent = '*please enter a valid username*';
    cross.style.visibility = 'visible';
    return;
  }
  if (users.some(function(user) { return user.username === value })) {
    message.textContent = '*this username is taken*';
    cross.style.visibility = 'visible';
    return;
  }
  message.textContent = ' ';
  cross.style.visibility = 'hidden';
  check.style.visibility = 'visible';
}

function saveProfile() {
  if (!document.getElementById('name-text').value.trim()) {
    document.getElementById('error-msg').textContent = '*your name cannot be blank*';
    return;
  }
  if (!document.getElementById('username-text').value.trim()) {
    document.getElementById('error-msg').textContent = '*please enter a valid username*';
    return;
  }
  if (document.getElementById('cross').style.visibility === 'visible' || !document.getElementById('username-text').value) return;
  primaryUser.displayName = document.getElementById('name-text').value;
  primaryUser.username = document.getElementById('username-text').value;
  primaryUser.bio = document.getElementById('bio-text').value;
  displayProfile(primaryUser);
}

function stats(user) {
  var stats = createElement('div', { id: 'stats', class: 'shadow' },
                 [createElement('span', { id: 'posts', class: 'stat' },
                     [createElement('p', { class: 'label' }, 'posts'),
                      createElement('p', { class: 'count' }, user.updatesCount)]),
                  createElement('span', { id: 'following', class: 'stat' },
                     [createElement('p', { class: 'label' }, 'following'),
                      createElement('p', { class: 'count' }, user.following.length)]),
                  createElement('span', { id: 'followers', class: 'stat' },
                     [createElement('p', { class: 'label' }, 'followers'),
                      createElement('p', { class: 'count' }, user.followers.length)])]);
  stats.addEventListener('click', function(e) { displayCenterContent(e, user) }, false);
  return stats;
}

function refreshStats() {
  remove('stats');
  var centerContainer = document.getElementById('center');
  centerContainer.insertBefore(stats(currentlyViewing), centerContainer.firstChild);
}

function displayCenterContent(event, user) {
  remove(['hashtag', 'new-update', 'updates', 'list'])
  var centerContainer = document.getElementById('center');
  if (viewing) document.getElementById(viewing).style.borderColor = null;
  event.target.style.borderColor = '#81a9ca';
  switch (event.target) {
    case document.getElementById('posts'):
      viewing = 'posts';
      if (user === primaryUser)
        centerContainer.appendChild(updatePoster())
      centerContainer.appendChild(userUpdates(user));
      break;
    case document.getElementById('following'):
      viewing = 'following';
      centerContainer.appendChild(listOfUsers(user.following));
      break;
    case document.getElementById('followers'):
      viewing = 'followers';
      centerContainer.appendChild(listOfUsers(user.followers));
      break;
  }
}

function updatePoster() {
  var postButton = createElement('button', { id: 'post-button' }, 'Post');
  postButton.addEventListener('click', addUpdate, false);
  return createElement('div', { id: 'new-update', class: 'shadow' },
            [createElement('textarea', { id: 'post-input', placeholder: 'Type a new update...' }, null), postButton]);
}

function addUpdate() {
  var updatesContainer = document.getElementById('updates');
  var post = document.getElementById('post-input').value;
  document.getElementById('post-input').value = '';
  if (!post.trim()) return;
  var newUpdateId = Object.keys(updates).length;
  updates[newUpdateId] = { userId: primaryUser.id, timestamp: moment(), post: post, likes: [] };
  primaryUser.updatesCount++;
  addHashtags(post, newUpdateId);
  if (!currentlyViewing) {
    updatesContainer.insertBefore(createElement('div', { class: 'update'}, getUpdateElements(primaryUser, newUpdateId)), updatesContainer.firstChild);
    return;
  }
  refreshStats(primaryUser);
  updatesContainer.insertBefore(createElement('div', { class: 'update'}, getUpdateElements(primaryUser, newUpdateId)), updatesContainer.firstChild);
  if (primaryUser.updatesCount === 1)
    updatesContainer.removeChild(updatesContainer.lastChild);
}

function addHashtags(post, id) {
  var newHashtags = false;
  post = post.toLowerCase();
  var validCharacters = /^[a-z0-9]*$/;
  while (post.indexOf('#') > -1) {
    post = post.substring(post.indexOf('#') + 1);
    var pointer = 0;
    while (pointer < post.length && validCharacters.test(post.charAt(pointer)))
      pointer++;
    var hashtag = post.substring(0, pointer);
    if (!hashtag.length)
      continue;
    newHashtags = true;
    if (hashtags[hashtag] && !hashtags[hashtag].includes(id))
      hashtags[hashtag].push(id);
    else if (!hashtags[hashtag])
      hashtags[hashtag] = [id]
    post = post.substring(pointer);
  }
  if (newHashtags) {
    remove('trending');
    document.getElementById('right').insertBefore(trending(), document.getElementById('suggestions'));
  }
}

function userUpdates(user) {
  var updatesToDisplay = []
  for (var updateId in updates) {
    if (updates[updateId].userId === user.id)
      updatesToDisplay.unshift(createElement('div', { class: 'update' }, getUpdateElements(user, updateId)));
  }
  if (updatesToDisplay.length)
    return createElement('div', { id: 'updates', class: 'shadow' }, updatesToDisplay);
  if (currentlyViewing === primaryUser)
    updatesToDisplay.push(createElement('div', { class: 'update' }, 'No updates to display. Post a new update and it will show up on your profile.'));
  else
    updatesToDisplay.push(createElement('div', { class: 'update' }, '@' + currentlyViewing.username + ' has not posted any updates yet.'));
  return createElement('div', { id: 'updates', class: 'shadow' }, updatesToDisplay);
}

function getUpdateElements(user, index) {
  var updateElements = [createElement('div', { class: 'photo', style: 'background-image:url('+ user.profilePic + ')' }, null),
                        createElement('h4', { class: 'name' }, user.displayName),
                        createElement('p', { class: 'username' }, '@' + user.username),
                        createElement('p', { class: 'timestamp' }, updates[index].timestamp.format('h:mmA M/D/YY')),
                        createElement('p', { class: 'post' }, translateHashtags(updates[index].post)),
                        createElement('button', { class: 'like' }, createElement('span', { class: 'lnr lnr-heart' }, null)),
                        createElement('span', { class: 'like-count' }, updates[index].likes.length)];
  updateElements[1].addEventListener('click', function() { displayProfile(user) } , false);
  updateElements[2].addEventListener('click', function() { displayProfile(user) } , false);
  return updateElements;
}

function translateHashtags(post) {
  var components = []
  if (post.indexOf('#') === -1) {
    components.push(post);
    return components;
  }
  var validCharacters = /^[A-Za-z0-9]*$/;
  while (post.indexOf('#') > -1) {
    components.push(post.substring(0, post.indexOf('#')))
    post = post.substring(post.indexOf('#') + 1);
    var pointer = 0;
    while (pointer < post.length && validCharacters.test(post.charAt(pointer)))
      pointer++;
    var hashtag = post.substring(0, pointer);
    if (!hashtag.length) {
      components.push('#');
      continue;
    }
    components.push(createElement('a', { class: 'hashtag', href: '#' }, ['#', createElement('span', {  }, hashtag)]));
    components[components.length-1].addEventListener('click', function(e) { viewHashtag(e.target.lastChild.textContent) }, false);
    post = post.substring(pointer);
  }
  return components;
}

function listOfUsers(references) {
  var list = createElement('table', { id: 'list', class: 'shadow' }, null);
  if (!references.length) {
    var message = createElement('p', { class: 'message' }, null);
    if (currentlyViewing === primaryUser && viewing === 'following')
      message.textContent = 'You are not following any users yet.'
    else if (currentlyViewing === primaryUser)
      message.textContent = 'You have no followers yet.'
    else if (viewing === 'following')
      message.textContent = '@' + currentlyViewing.username + ' is not following any users yet.'
    else
      message.textContent = '@' + currentlyViewing.username + ' does not have any followers yet.'
    list.appendChild(message);
    return list;
  }
  var oddRow = (references.length % 2 === 1);
  var rows = Math.floor(references.length / 2) + (oddRow ? 1 : 0);
  while (rows > 0) {
    if (!oddRow || rows > 1)
      list.appendChild(createElement('tr', {  }, [createElement('td', { class: 'user' }, null), createElement('td', { class: 'user' }, null)]));
    else
      list.appendChild(createElement('tr', {  }, createElement('td', { class: 'user' }, null)));
    rows--;
  }
  var userElements = list.getElementsByClassName('user');
  for (var i = 0; i < userElements.length; i++) {
    var theUser = users[references[i]];
    userElements.item(i).setAttribute('id', references[i]);
    userElements.item(i).appendChild(createElement('div', { class: 'photo', style: 'background-image:url(' + theUser.profilePic + ')' }, null));
    userElements.item(i).appendChild(createElement('h4', { class: 'name' }, theUser.displayName));
    userElements.item(i).appendChild(createElement('p', { class: 'username' }, '@' + theUser.username));
    userElements.item(i).appendChild(createElement('p', { class: 'stat' }, theUser.updatesCount + ' posts . ' + theUser.following.length + ' following . ' + theUser.followers.length + ' followers'));
  }
  list.addEventListener('click', function(e) { displayProfile((e.target.id && e.target.id !== 'list') ? users[e.target.id] : null) }, false);
  return list;
}

function trending() { //top five hashtags: when there is a tie, newer hashtags take priority
  var trending = createElement('div', { id: 'trending' }, createElement('h3', {  }, 'Trending'));
  var sorted = [];
  for (var hashtag in hashtags) {
    if (!sorted.length) {
      sorted.push(hashtag);
      continue;
    }
    var pointer = 0;
    while(hashtags[sorted[pointer]].length > hashtags[hashtag].length)
      pointer++;
    sorted.splice(pointer, 0, hashtag);
  }
  for (var i = 0; i < 5; i++) {
    trending.appendChild(createElement('a', { class: 'hashtag', href: '#' }, ['#', createElement('span', {  }, sorted[i])]));
    trending.lastChild.addEventListener('click', function(e) { viewHashtag(e.target.lastChild.textContent) }, false);
  }
  return trending;
}

function viewHashtag(hashtag) {
  var centerContainer = document.getElementById('center');
  empty(['center', 'left']);
  centerContainer.appendChild(createElement('h2', { id: 'hashtag', class: 'shadow' }, '#' + hashtag));
  centerContainer.appendChild(hashtagUpdates(hashtag));
}

function hashtagUpdates(hashtag) {
  var updatesToDisplay = [];
  hashtags[hashtag].forEach(function (updateId) {
    updatesToDisplay.unshift(createElement('div', { class: 'update' }, getUpdateElements(users[updates[updateId].userId], updateId)));
  });
  return createElement('div', { id: 'updates', class: 'shadow' }, updatesToDisplay);
}

function suggestions() {
  var suggestions = createElement('div', { id: 'suggestions' }, [createElement('h3', {  }, 'Who to follow')]);
  users.forEach( function(user) {
    if (user === primaryUser) return;
    suggestions.appendChild(createElement('div', { class: 'user' },
                               [createElement('div', { class: 'photo', style: 'background-image:url(\'' + user.profilePic + '\')' }, null),
                                createElement('h4', { class: 'name' }, user.displayName),
                                createElement('p', { class: 'username' }, '@' + user.username),
                                createElement('span', { class: 'plus lnr lnr-plus-circle' }, null)]));
    suggestions.lastChild.getElementsByClassName('name')[0].addEventListener('click', function() { displayProfile(user) } , false);
    suggestions.lastChild.getElementsByClassName('username')[0].addEventListener('click', function() { displayProfile(user) } , false);
    suggestions.lastChild.getElementsByClassName('lnr')[0].addEventListener('click', function() { follow(user.id) } , false);
  });
  return suggestions;
}

function checkSearchInput() {
  var input = document.getElementById('search-input').value;
  if (!input.trim()) return;
  displayProfile(users.find( function(user) { return (user.username === input); }));
  document.getElementById('search-input').value = '';
}

var focusResult;
var lastFocused = null;

function keyboardNav(e) {
  var results = document.getElementsByClassName('result');
  switch (e.keyCode) {
    case 13: //enter key
      if (focusResult === -1) checkSearchInput();
      else results[focusResult].click();
      break;
    case 40: //down arrow
      lastFocused = results[focusResult];
      focusResult = (focusResult === results.length - 1) ? -1 : (focusResult + 1);
      break;
    case 38: //up arrow
      lastFocused = results[focusResult];
      focusResult = (focusResult === -1) ? (results.length - 1) : (focusResult - 1);
      break;
    case 27: //escape key
      hideResults(null);
      break;
    default: //any other key
      displayResults();
  }
  if (lastFocused)
    lastFocused.style.backgroundColor = 'transparent';
  if (results[focusResult]) {
    results[focusResult].style.backgroundColor = '#f2f6f9';
  }
}

function displayResults() {
  focusResult = -1;
  var input = document.getElementById('search-input').value.toLowerCase();
  var resultsContainer = document.getElementById('results');
  resultsContainer.style.visibility = 'hidden';
  while (resultsContainer.firstChild)
    resultsContainer.removeChild(resultsContainer.firstChild);
  document.getElementById('search-input').style.borderBottomLeftRadius = '15px';
  document.getElementById('search-button').style.borderBottomRightRadius = '15px';
  if (!input.trim()) return;
  var results = getSearchResults(input);
  if (!results.length) return;
  document.getElementById('search-input').style.borderBottomLeftRadius = '0';
  document.getElementById('search-button').style.borderBottomRightRadius = '0';
  results[results.length-1].style.borderBottomLeftRadius = '15px'
  results[results.length-1].style.borderBottomRightRadius = '15px'
  results.forEach( function(result) { resultsContainer.appendChild(result) });
  resultsContainer.style.visibility = 'visible';
}

function getSearchResults(key) {
  var primaryUserAdded = false;
  var results = [];
  var regExp = new RegExp("\\b" + key);
  users.forEach( function(user) {
    var name = (user.displayName + ' ' + user.username).toLowerCase();
    if (!regExp.test(name)) return;
    if (primaryUser === user) {
      results.unshift(addResult(user));
      primaryUserAdded = true;
      return;
    }
    if (primaryUserAdded && primaryUser.following.indexOf(user.id) > -1) {
      results.splice(1, 0, addResult(user))
      return;
    }
    if (primaryUser.following.indexOf(user.id) > -1) {
      results.unshift(addResult(user));
      return;
    }
    results.push(addResult(user));
  });
  return results;
}

function addResult(user) {
  var result = createElement('div', { class: 'result' },
                  [createElement('div', { class: 'photo', style: 'background-image:url(\'' + user.profilePic + '\')' }, null),
                   createElement('h4', { class: 'name' }, user.displayName),
                   createElement('p', { class: 'username' }, '@' + user.username)]);
  result.addEventListener('click', function() { displayProfile(user) }, false);
  return result;
}

function hideResults(event) {
  if (event && (event.target === document.getElementById('results') || event.target === document.getElementById('search-input'))) return;
  document.getElementById('results').style.visibility = 'hidden';
  document.getElementById('search-input').style.borderBottomLeftRadius = '15px';
  document.getElementById('search-button').style.borderBottomRightRadius = '15px';
}

displayProfile(primaryUser);
var rightContainer = document.getElementById('right');
rightContainer.appendChild(trending());
rightContainer.appendChild(suggestions());

document.getElementById('home-button').addEventListener('click', goHome, false);
document.getElementById('profile-button').addEventListener('click', function() { displayProfile(primaryUser) }, false);
document.getElementById('search-button').addEventListener('click', checkSearchInput, false);
document.getElementById('search-input').addEventListener('keyup', function(e) { keyboardNav(e) }, false);
document.getElementById('search-input').addEventListener('focus', displayResults, false);
document.getElementById('body').addEventListener('click', function(e) { hideResults(e) }, false);
