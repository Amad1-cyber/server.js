<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HYMN</title>
  <link href="https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <style>
    body {
      background: white;
      color: #111;
      font-family: 'Segoe UI', sans-serif;
    }
    header {
      background: #000;
      color: #0f0;
      font-family: 'UnifrakturCook', cursive;
      text-align: center;
      padding: 40px;
      font-size: 4em;
      -webkit-text-stroke: 2px black;
      text-shadow: 0 0 10px #00ff88, 0 0 20px #00ff88;
    }
    nav, .right-panel {
      background: #e0fbe0;
      border: 2px solid #00ff88;
    }
    .right-panel {
      position: fixed;
      top: 0;
      right: 0;
      width: 250px;
      height: 100vh;
      padding: 20px;
      box-shadow: -2px 0 10px rgba(0,0,0,0.1);
    }
    nav {
      width: 220px;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      padding: 20px;
      box-shadow: 2px 0 10px rgba(0,0,0,0.1);
    }
    nav a {
      display: block;
      margin: 10px 0;
      color: #007f4f;
      text-decoration: none;
      font-weight: bold;
    }
    nav a:hover {
      color: #00cc66;
    }
    main {
      margin: 0 270px 0 240px;
      padding: 20px;
    }
    .banner, .magic-sign {
      text-align: center;
      background: #f0fff0;
      border: 1px solid #00ff88;
      padding: 15px;
    }
    h2 {
      color: #00aa55;
      border-bottom: 2px solid #00cc88;
      padding-bottom: 8px;
    }
    .contact-box, .expectations-list, #chatroom, #forum-section {
      background: #f8fff8;
      border: 1px solid #00cc88;
      padding: 15px;
    }
    #chatlog p, .forum-post {
      margin: 5px 0;
      background: #e6ffe6;
      padding: 5px;
      border-radius: 5px;
    }
    .forum-post strong {
      color: #006633;
    }
    footer {
      text-align: center;
      font-size: 0.9em;
      color: #333;
      margin-top: 40px;
      padding: 20px;
      border-top: 2px solid #00ff88;
    }
  </style>
</head>
<body>
<audio autoplay loop>
  <source src="fantasy_theme.mp3" type="audio/mpeg">
</audio>
<header>HYMN</header>
<nav>
  <a href="#video-section">Gameplay</a>
  <a href="#description-section">Description</a>
  <a href="#contacts-section">Contacts</a>
  <a href="#expectations-section">Expectations</a>
  <a href="#chatroom">Message Board</a>
  <a href="#forum-section">Forum</a>
  <a href="#account-section">Login/Register</a>
</nav>
<div class="right-panel">
  <h3>World Clock</h3>
  <div class="clock" id="liveClock">--:--:--</div>
  <h3>Release Plan</h3>
  <div class="launch">Playable Version:<br><strong>June 1, 2026</strong></div>
</div>
<main>
  <div class="banner">Prepare for the Hymn...</div>
  <div class="magic-sign">❂ Rune of Power • Sigil of the Call ❂</div>

  <section id="description-section">
  <h2>Description</h2>
  <p><strong>HYMN</strong> is an immersive online fantasy action RPG set in a vast magical realm. Players can explore lands, fight mythical creatures, and progress infinitely in first- or third-person view.</p>
  <p>Registering and logging in enables players to:</p>
  <ul>
    <li>Post in the <strong>Game Discussion and Suggestions</strong> forum</li>
    <li>Access exclusive <strong>concept art</strong> and developer reveals</li>
    <li>Watch the <strong>Alpha gameplay trailer</strong> on YouTube</li>
  </ul>
  <h3>Gameplay Preview (Alpha Footage)</h3>
  <div id="trailer-container" style="display:none;">
    <iframe width="100%" height="315" src="https://www.youtube.com/embed/cfD8OuAI_0c" title="HYMN Alpha Gameplay" frameborder="0" allowfullscreen></iframe>
  </div>
</section>

<!-- Existing sections remain unchanged -->

  <section id="forum-section">
    <h2>Game Discussion and Suggestions</h2>
    <div id="forum-posts"></div>
    <input type="text" id="forumInput" placeholder="Your comment or suggestion..." style="width: 80%;">
    <button onclick="submitForumPost()">Post to Forum</button>
  </section>

  <section id="account-section">
    <h2>Login / Register</h2>
    <form onsubmit="handleLogin(event)">
      <p>Email: <input type="email" id="email" required></p>
      <p>Username: <input type="text" id="username" required pattern="^[a-zA-Z0-9_]{3,16}$"></p>
      <p>Password: <input type="password" id="password" required pattern=".{6,}"></p>
      <button type="submit">Submit</button>
    </form>
    <div id="account-message"></div>
  </section>
</main>
<footer>
  <p>© 2025 Othman Enterprise. All rights reserved.</p>
  <p>Contact: 📞 341-205-0895 ✉️ <a href="mailto:relectance@gmail.com">relectance@gmail.com</a> 📍 Oakland, CA</p>
</footer>
<script>
function updateClock() {
  const now = new Date();
  document.getElementById('liveClock').textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

function postMessage() {
  const input = document.getElementById('messageInput');
  const log = document.getElementById('chatlog');
  if (input.value.trim()) {
    const p = document.createElement('p');
    p.textContent = input.value.trim();
    log.appendChild(p);
    input.value = '';
  }
}

let currentUsername = '';
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  axios.post('https://hymn-backend.onrender.com/register', { email, username, password })
    .then(response => {
      currentUsername = username;
      document.getElementById('account-message').style.color = '#007f4f';
      document.getElementById('account-message').innerHTML = '✅ Account registered. View images at <a href="https://hymngame.com/__version-1/rs/" target="_blank">hymngame.com/__version-1/rs/</a>';
      document.getElementById('trailer-container').style.display = 'block';
    })
    .catch(error => {
      document.getElementById('account-message').style.color = '#d00';
      document.getElementById('account-message').textContent = '❌ Registration failed. Please try again.';
    });
}

function submitForumPost() {
  const input = document.getElementById('forumInput');
  const content = input.value.trim();
  if (content && currentUsername) {
    const post = document.createElement('div');
    post.classList.add('forum-post');
    post.innerHTML = `<strong>${currentUsername}:</strong> ${content}`;
    document.getElementById('forum-posts').appendChild(post);
    input.value = '';
  } else if (!currentUsername) {
    alert('You must be logged in to post to the forum.');
  }
}
</script>
</body>
</html>
