/* =============================================
   NEXUS SOCIAL — script.js
   ============================================= */

'use strict';

/* ===== STATE ===== */
const State = {
  user: null,
  posts: [],
  friends: [],
  notifications: [],
  messages: {},
  currentChat: null,
  currentView: 'home',
  currentProfileTab: 'posts',
  currentFriendTab: 'suggestions',
  savedPosts: [],
  theme: 'light',
};

/* ===== DEFAULT DATA ===== */
const PEOPLE = [
  { id: 'p1', name: 'Aria Chen',      avatar: 'https://i.pravatar.cc/150?img=47', mutual: 12, online: true,  bio: 'Designer & dreamer' },
  { id: 'p2', name: 'Marcus Webb',    avatar: 'https://i.pravatar.cc/150?img=68', mutual: 7,  online: true,  bio: 'Full-stack dev' },
  { id: 'p3', name: 'Luna Park',      avatar: 'https://i.pravatar.cc/150?img=49', mutual: 4,  online: false, bio: 'Photography enthusiast' },
  { id: 'p4', name: 'Jonah Rivers',   avatar: 'https://i.pravatar.cc/150?img=12', mutual: 9,  online: true,  bio: 'Music producer' },
  { id: 'p5', name: 'Stella Moss',    avatar: 'https://i.pravatar.cc/150?img=44', mutual: 2,  online: false, bio: 'Travel blogger' },
  { id: 'p6', name: 'Dex Kumar',      avatar: 'https://i.pravatar.cc/150?img=70', mutual: 15, online: true,  bio: 'Startup founder' },
  { id: 'p7', name: 'Zara Fox',       avatar: 'https://i.pravatar.cc/150?img=56', mutual: 6,  online: false, bio: 'UX researcher' },
  { id: 'p8', name: 'Eli Torres',     avatar: 'https://i.pravatar.cc/150?img=15', mutual: 3,  online: true,  bio: 'Gamer & streamer' },
];

const DEMO_POSTS = [
  {
    id: 'demo1',
    userId: 'p1',
    username: 'Aria Chen',
    avatar: 'https://i.pravatar.cc/150?img=47',
    text: '🎨 Just wrapped up my latest design project! The process was challenging but so rewarding. Every pixel placed with intention. What do you think about minimalist UI design?',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    time: Date.now() - 2 * 60 * 60 * 1000,
    likes: ['p2', 'p4', 'p6'],
    comments: [
      { id: 'c1', userId: 'p2', username: 'Marcus Webb', avatar: 'https://i.pravatar.cc/150?img=68', text: 'Absolutely stunning work! 🔥', time: Date.now() - 1.5 * 60 * 60 * 1000 }
    ],
    privacy: 'public',
    feeling: '',
  },
  {
    id: 'demo2',
    userId: 'p4',
    username: 'Jonah Rivers',
    avatar: 'https://i.pravatar.cc/150?img=12',
    text: '🎵 New track dropping this Friday! Been working on this one for months. The bassline is pure fire. Stay tuned! 🔊',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80',
    time: Date.now() - 5 * 60 * 60 * 1000,
    likes: ['p1', 'p3', 'p5', 'p7'],
    comments: [],
    privacy: 'public',
    feeling: '🎉 Excited',
  },
  {
    id: 'demo3',
    userId: 'p5',
    username: 'Stella Moss',
    avatar: 'https://i.pravatar.cc/150?img=44',
    text: '🌍 Just landed in Kyoto, Japan! The cherry blossoms are absolutely breathtaking this time of year. If you ever get the chance — do it. No regrets.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    time: Date.now() - 12 * 60 * 60 * 1000,
    likes: ['p1', 'p2', 'p6', 'p8'],
    comments: [
      { id: 'c2', userId: 'p3', username: 'Luna Park', avatar: 'https://i.pravatar.cc/150?img=49', text: 'I need to go there! Amazing shot!', time: Date.now() - 10 * 60 * 60 * 1000 },
    ],
    privacy: 'public',
    feeling: '😍 Loved',
  },
  {
    id: 'demo4',
    userId: 'p2',
    username: 'Marcus Webb',
    avatar: 'https://i.pravatar.cc/150?img=68',
    text: '💻 Hot take: Clean code is not just about functionality — it\'s about empathy for the next developer. Write code like the person maintaining it knows where you live. 😄 #webdev #coding',
    image: '',
    time: Date.now() - 20 * 60 * 60 * 1000,
    likes: ['p1', 'p6'],
    comments: [],
    privacy: 'public',
    feeling: '🤔 Thoughtful',
  },
];

const NOTIFICATIONS_DEMO = [
  { id: 'n1', userId: 'p1', avatar: 'https://i.pravatar.cc/150?img=47', text: '<strong>Aria Chen</strong> liked your post', time: '2 min ago', read: false },
  { id: 'n2', userId: 'p2', avatar: 'https://i.pravatar.cc/150?img=68', text: '<strong>Marcus Webb</strong> commented: "Great post!"', time: '15 min ago', read: false },
  { id: 'n3', userId: 'p4', avatar: 'https://i.pravatar.cc/150?img=12', text: '<strong>Jonah Rivers</strong> sent you a friend request', time: '1 hour ago', read: false },
  { id: 'n4', userId: 'p5', avatar: 'https://i.pravatar.cc/150?img=44', text: '<strong>Stella Moss</strong> tagged you in a photo', time: '3 hours ago', read: true },
  { id: 'n5', userId: 'p6', avatar: 'https://i.pravatar.cc/150?img=70', text: '<strong>Dex Kumar</strong> accepted your friend request', time: '5 hours ago', read: true },
];

const TRENDING = [
  { tag: '#WebDesign2025', count: '42.3K posts' },
  { tag: '#AIArt', count: '31.8K posts' },
  { tag: '#TechNews', count: '28.1K posts' },
  { tag: '#Photography', count: '24.5K posts' },
  { tag: '#MusicProduction', count: '19.2K posts' },
];

const STORIES = [
  { id: 's1', userId: 'p1', name: 'Aria', avatar: 'https://i.pravatar.cc/150?img=47', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80' },
  { id: 's2', userId: 'p2', name: 'Marcus', avatar: 'https://i.pravatar.cc/150?img=68', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80' },
  { id: 's3', userId: 'p4', name: 'Jonah', avatar: 'https://i.pravatar.cc/150?img=12', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80' },
  { id: 's4', userId: 'p5', name: 'Stella', avatar: 'https://i.pravatar.cc/150?img=44', img: 'https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=400&q=80' },
];

/* ===== UTILITIES ===== */
function $(id) { return document.getElementById(id); }
function $q(sel) { return document.querySelector(sel); }
function $all(sel) { return document.querySelectorAll(sel); }

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (m < 1) return 'Just now';
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  if (d < 7) return `${d}d ago`;
  return new Date(ts).toLocaleDateString();
}

function genId() { return '_' + Math.random().toString(36).slice(2, 11); }

function toast(msg, type = 'info') {
  const container = $('toastContainer');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  el.innerHTML = `<span>${icon}</span> ${msg}`;
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add('fade-out');
    setTimeout(() => el.remove(), 350);
  }, 3000);
}

function saveState() {
  localStorage.setItem('nexus_user', JSON.stringify(State.user));
  localStorage.setItem('nexus_posts', JSON.stringify(State.posts));
  localStorage.setItem('nexus_friends', JSON.stringify(State.friends));
  localStorage.setItem('nexus_notifications', JSON.stringify(State.notifications));
  localStorage.setItem('nexus_messages', JSON.stringify(State.messages));
  localStorage.setItem('nexus_saved', JSON.stringify(State.savedPosts));
  localStorage.setItem('nexus_theme', State.theme);
}

function loadState() {
  const user = localStorage.getItem('nexus_user');
  const posts = localStorage.getItem('nexus_posts');
  const friends = localStorage.getItem('nexus_friends');
  const notifs = localStorage.getItem('nexus_notifications');
  const messages = localStorage.getItem('nexus_messages');
  const saved = localStorage.getItem('nexus_saved');
  const theme = localStorage.getItem('nexus_theme');

  State.user = user ? JSON.parse(user) : {
    id: 'me',
    name: 'Alex Rivera',
    bio: 'Living life one post at a time ✨',
    avatar: 'https://i.pravatar.cc/150?img=33',
    location: 'San Francisco, CA',
    work: 'Product Designer at Nexus',
    email: 'alex@nexus.app',
  };
  State.posts = posts ? JSON.parse(posts) : [...DEMO_POSTS];
  State.friends = friends ? JSON.parse(friends) : ['p1', 'p2'];
  State.notifications = notifs ? JSON.parse(notifs) : [...NOTIFICATIONS_DEMO];
  State.messages = messages ? JSON.parse(messages) : {};
  State.savedPosts = saved ? JSON.parse(saved) : [];
  State.theme = theme || 'light';
}

/* ===== THEME ===== */
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  State.theme = t;
}

/* ===== LOADING ===== */
function hideLoader() {
  setTimeout(() => {
    $('loadingScreen').classList.add('hidden');
  }, 1800);
}

/* ===== AVATAR HELPERS ===== */
function updateAllAvatars() {
  const av = State.user.avatar;
  ['navAvatar', 'sidebarAvatar', 'createAvatar', 'modalAvatar', 'profileBigAvatar'].forEach(id => {
    const el = $(id);
    if (el) el.src = av;
  });
}

function updateAllUserNames() {
  $('sidebarName').textContent = State.user.name;
  $('sidebarBio').textContent = State.user.bio || '';
  $('profileName').textContent = State.user.name;
  $('profileBioText').textContent = State.user.bio || '';
  $('modalUsername').textContent = State.user.name;
  $('aboutName').textContent = State.user.name;
  $('aboutLocation').textContent = State.user.location || '—';
  $('aboutWork').textContent = State.user.work || '—';
  $('aboutEmail').textContent = State.user.email || '—';
  $('storyUserImg').src = State.user.avatar;
}

/* ===== NAVIGATION / VIEWS ===== */
function showView(view) {
  $all('.view').forEach(v => v.classList.remove('active'));
  const el = $(`${view}View`);
  if (el) el.classList.add('active');
  State.currentView = view;

  // Update sidebar active
  $all('.sidebar-link').forEach(l => {
    l.classList.toggle('active', l.dataset.view === view);
  });
  $all('.nav-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === view);
  });

  if (view === 'profile') renderProfile();
  if (view === 'friends') renderFriends();
  if (view === 'messages') renderMessages();
  if (view === 'saved') renderSaved();
  if (view === 'home') renderFeed();

  closeSidebar();
}

function closeSidebar() {
  $('sidebarLeft').classList.remove('open');
  const overlay = $q('.sidebar-overlay');
  if (overlay) overlay.classList.remove('show');
}

/* ===== STORIES ===== */
function renderStories() {
  const row = $('storiesRow');
  const addStoryCard = row.querySelector('.story-card.add-story');
  // Remove old story cards (not the add-story)
  row.querySelectorAll('.story-card:not(.add-story)').forEach(el => el.remove());

  STORIES.forEach(s => {
    const card = document.createElement('div');
    card.className = 'story-card';
    card.innerHTML = `
      <div class="story-img-wrap">
        <img src="${s.img}" alt="${s.name}" loading="lazy" />
        <div class="story-ring"><img src="${s.avatar}" /></div>
        <div class="story-name">${s.name}</div>
      </div>
    `;
    card.addEventListener('click', () => {
      toast(`Viewing ${s.name}'s story`, 'info');
    });
    row.appendChild(card);
  });
}

/* ===== POSTS ===== */
function privacyIcon(p) {
  if (p === 'friends') return '👥';
  if (p === 'only-me') return '🔒';
  return '🌍';
}

function renderPost(post) {
  const isOwn = post.userId === 'me';
  const likedByMe = post.likes.includes('me');
  const isSaved = State.savedPosts.includes(post.id);

  const card = document.createElement('div');
  card.className = 'post-card';
  card.dataset.postId = post.id;

  card.innerHTML = `
    <div class="post-header">
      <img src="${post.avatar}" alt="${post.username}" class="post-avatar" />
      <div class="post-meta">
        <div class="post-username">${post.username}${post.feeling ? ` <span class="post-feeling">is feeling ${post.feeling}</span>` : ''}</div>
        <div class="post-time">
          <span>${timeAgo(post.time)}</span>
          <span class="post-privacy">${privacyIcon(post.privacy)}</span>
        </div>
      </div>
      <div class="post-menu-btn" data-post-id="${post.id}">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        <div class="post-dropdown" id="dropdown-${post.id}">
          <div class="post-dropdown-item" data-action="save" data-post-id="${post.id}">
            <svg viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            ${isSaved ? 'Unsave Post' : 'Save Post'}
          </div>
          <div class="post-dropdown-item" data-action="share" data-post-id="${post.id}">
            <svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            Share Post
          </div>
          ${isOwn ? `<div class="post-dropdown-item danger" data-action="delete" data-post-id="${post.id}">
            <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
            Delete Post
          </div>` : ''}
        </div>
      </div>
    </div>
    ${post.text ? `<div class="post-text">${linkifyText(post.text)}</div>` : ''}
    ${post.image ? `<div class="post-image-wrap" data-img="${post.image}">
      <img src="${post.image}" alt="Post image" class="post-image" loading="lazy" />
    </div>` : ''}
    <div class="post-stats">
      <div class="post-likes-count" data-post-id="${post.id}">
        ${post.likes.length > 0 ? `<div class="reactions"><span class="reaction-emoji">👍</span></div> ${post.likes.length} like${post.likes.length !== 1 ? 's' : ''}` : ''}
      </div>
      <div style="color:var(--text-muted); font-size:.8rem">
        ${post.comments.length > 0 ? `${post.comments.length} comment${post.comments.length !== 1 ? 's' : ''}` : ''}
      </div>
    </div>
    <div class="post-actions">
      <button class="post-action-btn like-btn ${likedByMe ? 'liked' : ''}" data-post-id="${post.id}">
        <svg viewBox="0 0 24 24"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
        Like
      </button>
      <button class="post-action-btn comment-toggle-btn" data-post-id="${post.id}">
        <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        Comment
      </button>
      <button class="post-action-btn share-btn" data-post-id="${post.id}">
        <svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        Share
      </button>
    </div>
    <div class="comments-section" id="comments-${post.id}">
      <div class="comment-input-row">
        <img src="${State.user.avatar}" alt="" />
        <input type="text" class="comment-input" placeholder="Write a comment…" data-post-id="${post.id}" />
        <button class="comment-send-btn" data-post-id="${post.id}">
          <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
      <div class="comments-list" id="comments-list-${post.id}"></div>
    </div>
  `;

  // Render comments
  const commentsList = card.querySelector(`#comments-list-${post.id}`);
  post.comments.forEach(c => commentsList.appendChild(renderComment(c, post.id)));

  return card;
}

function linkifyText(text) {
  return text.replace(/(#\w+)/g, '<span style="color:var(--brand);font-weight:600">$1</span>');
}

function renderComment(comment, postId) {
  const isOwn = comment.userId === 'me';
  const el = document.createElement('div');
  el.className = 'comment-item';
  el.dataset.commentId = comment.id;
  el.innerHTML = `
    <img src="${comment.avatar}" alt="${comment.username}" />
    <div class="comment-bubble">
      <div class="comment-author">${comment.username}</div>
      <div class="comment-text">${comment.text}</div>
      <div class="comment-time">${timeAgo(comment.time)}</div>
      <div class="comment-actions">
        <button class="comment-like-btn">Like</button>
        ${isOwn ? `<button class="comment-delete-btn" data-comment-id="${comment.id}" data-post-id="${postId}">Delete</button>` : ''}
      </div>
    </div>
  `;
  return el;
}

function renderFeed() {
  const container = $('feedPosts');
  container.innerHTML = '';
  const sorted = [...State.posts].sort((a, b) => b.time - a.time);
  sorted.forEach(post => container.appendChild(renderPost(post)));
}

function renderMyPosts() {
  const container = $('myPosts');
  container.innerHTML = '';
  const myPosts = State.posts.filter(p => p.userId === 'me').sort((a, b) => b.time - a.time);
  if (myPosts.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:40px">No posts yet. Share something!</p>';
    return;
  }
  myPosts.forEach(post => container.appendChild(renderPost(post)));
}

function renderSaved() {
  const container = $('savedPosts');
  container.innerHTML = '';
  const saved = State.posts.filter(p => State.savedPosts.includes(p.id));
  if (saved.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:40px">No saved posts yet.</p>';
    return;
  }
  saved.forEach(p => container.appendChild(renderPost(p)));
}

/* ===== POST INTERACTIONS ===== */
document.addEventListener('click', (e) => {
  // Like button
  if (e.target.closest('.like-btn')) {
    const btn = e.target.closest('.like-btn');
    const postId = btn.dataset.postId;
    toggleLike(postId, btn);
    return;
  }

  // Comment toggle
  if (e.target.closest('.comment-toggle-btn')) {
    const btn = e.target.closest('.comment-toggle-btn');
    const postId = btn.dataset.postId;
    const section = $(`comments-${postId}`);
    section.classList.toggle('show');
    if (section.classList.contains('show')) {
      section.querySelector('.comment-input')?.focus();
    }
    return;
  }

  // Comment send
  if (e.target.closest('.comment-send-btn')) {
    const btn = e.target.closest('.comment-send-btn');
    const postId = btn.dataset.postId;
    const input = btn.closest('.comment-input-row').querySelector('.comment-input');
    addComment(postId, input);
    return;
  }

  // Comment delete
  if (e.target.closest('.comment-delete-btn')) {
    const btn = e.target.closest('.comment-delete-btn');
    deleteComment(btn.dataset.postId, btn.dataset.commentId);
    return;
  }

  // Comment like
  if (e.target.closest('.comment-like-btn')) {
    const btn = e.target.closest('.comment-like-btn');
    btn.style.color = 'var(--brand)';
    toast('Comment liked!', 'success');
    return;
  }

  // Share button
  if (e.target.closest('.share-btn')) {
    toast('Post shared!', 'success');
    return;
  }

  // Post menu toggle
  if (e.target.closest('.post-menu-btn')) {
    const btn = e.target.closest('.post-menu-btn');
    const postId = btn.dataset.postId;
    const dropdown = $(`dropdown-${postId}`);
    // Close all others
    $all('.post-dropdown.show').forEach(d => { if (d !== dropdown) d.classList.remove('show'); });
    dropdown.classList.toggle('show');
    e.stopPropagation();
    return;
  }

  // Dropdown actions
  if (e.target.closest('.post-dropdown-item')) {
    const item = e.target.closest('.post-dropdown-item');
    const action = item.dataset.action;
    const postId = item.dataset.postId;
    $all('.post-dropdown.show').forEach(d => d.classList.remove('show'));

    if (action === 'delete') deletePost(postId);
    if (action === 'save') toggleSave(postId);
    if (action === 'share') toast('Post shared!', 'success');
    return;
  }

  // Image full view
  if (e.target.closest('.post-image-wrap')) {
    const src = e.target.closest('.post-image-wrap').dataset.img;
    $('fullImageView').src = src;
    openModal('imageViewOverlay');
    return;
  }

  // Close dropdowns when clicking outside
  $all('.post-dropdown.show').forEach(d => d.classList.remove('show'));
  $all('.search-results.show').forEach(s => s.classList.remove('show'));
  if (!e.target.closest('.notif-btn') && !e.target.closest('.notif-dropdown')) {
    $('notifDropdown').classList.remove('show');
  }
});

// Comment input — Enter key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.classList.contains('comment-input')) {
    const postId = e.target.dataset.postId;
    addComment(postId, e.target);
  }
  if (e.key === 'Enter' && e.target.id === 'chatBoxInput') sendFloatingMessage();
  if (e.key === 'Enter' && e.target.id === 'chatInput') sendChatViewMessage();
  if (e.key === 'Escape') {
    $all('.modal-overlay').forEach(m => m.classList.remove('show'));
    $('notifDropdown').classList.remove('show');
    $all('.post-dropdown.show').forEach(d => d.classList.remove('show'));
  }
});

function toggleLike(postId, btn) {
  const idx = State.posts.findIndex(p => p.id === postId);
  if (idx === -1) return;
  const post = State.posts[idx];
  const likedIdx = post.likes.indexOf('me');
  if (likedIdx === -1) {
    post.likes.push('me');
    btn.classList.add('liked');
    toast('Post liked! 👍', 'success');
  } else {
    post.likes.splice(likedIdx, 1);
    btn.classList.remove('liked');
  }

  // Update stats
  const card = btn.closest('.post-card');
  const statsEl = card.querySelector('.post-likes-count');
  statsEl.innerHTML = post.likes.length > 0
    ? `<div class="reactions"><span class="reaction-emoji">👍</span></div> ${post.likes.length} like${post.likes.length !== 1 ? 's' : ''}`
    : '';

  saveState();
  updateProfileStats();
}

function addComment(postId, input) {
  const text = input.value.trim();
  if (!text) return;

  const comment = {
    id: genId(),
    userId: 'me',
    username: State.user.name,
    avatar: State.user.avatar,
    text,
    time: Date.now(),
  };

  const idx = State.posts.findIndex(p => p.id === postId);
  if (idx === -1) return;
  State.posts[idx].comments.push(comment);
  saveState();

  const list = $(`comments-list-${postId}`);
  list.appendChild(renderComment(comment, postId));
  input.value = '';

  // Update comment count
  const card = list.closest('.post-card');
  const statsEl = card.querySelector('.post-stats > div:last-child');
  const count = State.posts[idx].comments.length;
  statsEl.textContent = count > 0 ? `${count} comment${count !== 1 ? 's' : ''}` : '';

  toast('Comment added!', 'success');
}

function deleteComment(postId, commentId) {
  const idx = State.posts.findIndex(p => p.id === postId);
  if (idx === -1) return;
  State.posts[idx].comments = State.posts[idx].comments.filter(c => c.id !== commentId);
  saveState();

  const el = $all(`.comment-item`);
  el.forEach(item => {
    if (item.dataset.commentId === commentId) item.remove();
  });
  toast('Comment deleted', 'info');
}

function deletePost(postId) {
  State.posts = State.posts.filter(p => p.id !== postId);
  saveState();
  // Remove from all rendered feeds
  $all(`[data-post-id="${postId}"]`).forEach(el => {
    const card = el.closest('.post-card');
    if (card) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(-10px)';
      card.style.transition = 'all .3s ease';
      setTimeout(() => card.remove(), 300);
    }
  });
  toast('Post deleted', 'info');
  updateProfileStats();
}

function toggleSave(postId) {
  const savedIdx = State.savedPosts.indexOf(postId);
  if (savedIdx === -1) {
    State.savedPosts.push(postId);
    toast('Post saved! 🔖', 'success');
  } else {
    State.savedPosts.splice(savedIdx, 1);
    toast('Post unsaved', 'info');
  }
  saveState();
}

/* ===== CREATE POST ===== */
let postImageData = null;
let postFeeling = '';

$('openPostModal').addEventListener('click', () => openModal('postModalOverlay'));
$('photoActionBtn').addEventListener('click', () => openModal('postModalOverlay'));

$('postImageInput').addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    postImageData = e.target.result;
    $('imagePreview').src = postImageData;
    $('imagePreviewWrap').style.display = 'block';
  };
  reader.readAsDataURL(file);
});

$('quickPhotoInput').addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    postImageData = e.target.result;
    $('imagePreview').src = postImageData;
    $('imagePreviewWrap').style.display = 'block';
    openModal('postModalOverlay');
  };
  reader.readAsDataURL(file);
});

$('removeImg').addEventListener('click', () => {
  postImageData = null;
  $('imagePreviewWrap').style.display = 'none';
  $('postImageInput').value = '';
});

$('feelingTrigger').addEventListener('click', () => {
  const picker = $('feelingPicker');
  picker.style.display = picker.style.display === 'none' ? 'flex' : 'none';
});

$all('.feeling-item').forEach(btn => {
  btn.addEventListener('click', () => {
    $all('.feeling-item').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    postFeeling = btn.dataset.feeling;
    renderFeelingTags();
    $('feelingPicker').style.display = 'none';
  });
});

function renderFeelingTags() {
  const container = $('feelingTags');
  container.innerHTML = '';
  if (postFeeling) {
    const tag = document.createElement('div');
    tag.className = 'feeling-tag';
    tag.innerHTML = `${postFeeling} <button onclick="clearFeeling()">✕</button>`;
    container.appendChild(tag);
  }
}

window.clearFeeling = function () {
  postFeeling = '';
  $all('.feeling-item').forEach(b => b.classList.remove('selected'));
  renderFeelingTags();
};

$('submitPost').addEventListener('click', submitPost);

function submitPost() {
  const text = $('postText').value.trim();
  if (!text && !postImageData) {
    toast("Write something or add a photo first!", 'error');
    return;
  }

  const post = {
    id: genId(),
    userId: 'me',
    username: State.user.name,
    avatar: State.user.avatar,
    text,
    image: postImageData || '',
    time: Date.now(),
    likes: [],
    comments: [],
    privacy: $('privacySelect').value,
    feeling: postFeeling,
  };

  State.posts.unshift(post);
  saveState();

  // Add to feed
  const feedEl = renderPost(post);
  $('feedPosts').prepend(feedEl);

  // If on profile, update
  if (State.currentView === 'profile') renderMyPosts();

  // Reset
  $('postText').value = '';
  postImageData = null;
  postFeeling = '';
  $('imagePreviewWrap').style.display = 'none';
  $('postImageInput').value = '';
  $all('.feeling-item').forEach(b => b.classList.remove('selected'));
  renderFeelingTags();

  closeModal('postModalOverlay');
  toast('Post published! 🎉', 'success');
  updateProfileStats();
}

/* ===== PROFILE ===== */
function renderProfile() {
  updateAllAvatars();
  updateAllUserNames();
  renderMyPosts();
  renderPhotosGrid();
  renderProfileFriends();
  updateProfileStats();
}

function updateProfileStats() {
  const myPosts = State.posts.filter(p => p.userId === 'me').length;
  const totalLikes = State.posts.filter(p => p.userId === 'me').reduce((sum, p) => sum + p.likes.length, 0);
  $('statPosts').textContent = myPosts;
  $('statFriends').textContent = State.friends.length;
  $('statLikes').textContent = totalLikes;
}

function renderPhotosGrid() {
  const grid = $('photosGrid');
  grid.innerHTML = '';
  const photoPosts = State.posts.filter(p => p.image);
  if (photoPosts.length === 0) {
    grid.innerHTML = '<p style="color:var(--text-muted);padding:20px;grid-column:1/-1">No photos yet.</p>';
    return;
  }
  photoPosts.forEach(p => {
    const img = document.createElement('img');
    img.src = p.image;
    img.alt = 'Photo';
    img.loading = 'lazy';
    img.addEventListener('click', () => {
      $('fullImageView').src = p.image;
      openModal('imageViewOverlay');
    });
    grid.appendChild(img);
  });
}

function renderProfileFriends() {
  const list = $('profileFriendsList');
  list.innerHTML = '';
  const myFriends = PEOPLE.filter(p => State.friends.includes(p.id));
  if (myFriends.length === 0) {
    list.innerHTML = '<p style="color:var(--text-muted);padding:20px;grid-column:1/-1">No friends yet.</p>';
    return;
  }
  myFriends.forEach(p => list.appendChild(createFriendCard(p, true)));
}

// Profile tabs
$all('.profile-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    $all('.profile-tab').forEach(t => t.classList.remove('active'));
    $all('.ptab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    $(`ptab-${tab.dataset.ptab}`).classList.add('active');
    if (tab.dataset.ptab === 'friends') renderProfileFriends();
    if (tab.dataset.ptab === 'photos') renderPhotosGrid();
  });
});

// Edit Profile
$('editProfileBtn').addEventListener('click', () => {
  $('editName').value = State.user.name;
  $('editBio').value = State.user.bio || '';
  $('editLocation').value = State.user.location || '';
  $('editWork').value = State.user.work || '';
  $('editEmail').value = State.user.email || '';
  openModal('editProfileOverlay');
});

$('saveProfile').addEventListener('click', () => {
  State.user.name = $('editName').value.trim() || State.user.name;
  State.user.bio = $('editBio').value.trim();
  State.user.location = $('editLocation').value.trim();
  State.user.work = $('editWork').value.trim();
  State.user.email = $('editEmail').value.trim();
  saveState();
  updateAllUserNames();
  closeModal('editProfileOverlay');
  toast('Profile updated! ✅', 'success');
});

// Avatar upload
$('editAvatarBtn').addEventListener('click', () => $('avatarInput').click());
$('avatarInput').addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    State.user.avatar = e.target.result;
    saveState();
    updateAllAvatars();
    toast('Profile photo updated!', 'success');
  };
  reader.readAsDataURL(file);
});

/* ===== FRIENDS ===== */
function createFriendCard(person, isFriend = false) {
  const card = document.createElement('div');
  card.className = 'friend-card';
  card.innerHTML = `
    <div class="friend-card-cover"></div>
    <img src="${person.avatar}" alt="${person.name}" />
    <div class="friend-card-name">${person.name}</div>
    <div class="friend-card-mutual">${person.mutual} mutual friends</div>
    <div class="friend-card-actions">
      ${isFriend
        ? `<button class="btn btn-secondary btn-sm" data-action="unfriend" data-person-id="${person.id}">Unfriend</button>
           <button class="btn btn-primary btn-sm" data-action="message" data-person-id="${person.id}">Message</button>`
        : `<button class="btn btn-primary btn-sm" data-action="add-friend" data-person-id="${person.id}" id="add-btn-${person.id}">Add Friend</button>
           <button class="btn btn-secondary btn-sm" data-action="ignore">Ignore</button>`}
    </div>
  `;

  // Event delegation for buttons inside
  card.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const personId = btn.dataset.personId;
      if (action === 'add-friend') handleAddFriend(personId, btn);
      if (action === 'unfriend') handleUnfriend(personId, card);
      if (action === 'message') openChatWith(personId);
      if (action === 'ignore') {
        card.style.opacity = '0';
        setTimeout(() => card.remove(), 300);
      }
    });
  });

  return card;
}

function renderFriends() {
  // Suggestions
  const suggestions = $('friendSuggestions');
  suggestions.innerHTML = '';
  PEOPLE.filter(p => !State.friends.includes(p.id)).forEach(p => {
    suggestions.appendChild(createFriendCard(p, false));
  });

  // My friends
  const myList = $('myFriendsList');
  myList.innerHTML = '';
  const myFriends = PEOPLE.filter(p => State.friends.includes(p.id));
  if (myFriends.length === 0) {
    myList.innerHTML = '<p style="color:var(--text-muted);padding:40px;grid-column:1/-1">No friends yet.</p>';
  } else {
    myFriends.forEach(p => myList.appendChild(createFriendCard(p, true)));
  }

  // Requests (fake)
  const requests = $('friendRequests');
  requests.innerHTML = '';
  const requestPeople = [PEOPLE[2], PEOPLE[4]]; // Luna, Stella
  requestPeople.filter(p => !State.friends.includes(p.id)).forEach(p => {
    requests.appendChild(createFriendCard(p, false));
  });
  if (requests.children.length === 0) {
    requests.innerHTML = '<p style="color:var(--text-muted);padding:40px;grid-column:1/-1">No pending requests.</p>';
  }
}

function handleAddFriend(personId, btn) {
  if (!State.friends.includes(personId)) {
    State.friends.push(personId);
    saveState();
    const person = PEOPLE.find(p => p.id === personId);
    toast(`You are now friends with ${person.name}! 🎉`, 'success');
    btn.textContent = 'Friends ✓';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-secondary');
    btn.disabled = true;
    updateProfileStats();
    renderRightSidebar();
    updateProfileStats();
  }
}

function handleUnfriend(personId, card) {
  State.friends = State.friends.filter(id => id !== personId);
  saveState();
  const person = PEOPLE.find(p => p.id === personId);
  toast(`Removed ${person.name} from friends`, 'info');
  card.style.opacity = '0';
  card.style.transform = 'scale(.95)';
  card.style.transition = 'all .3s ease';
  setTimeout(() => {
    card.remove();
    renderFriends();
  }, 300);
  updateProfileStats();
}

// Friend tabs
$all('.ftab').forEach(tab => {
  tab.addEventListener('click', () => {
    $all('.ftab').forEach(t => t.classList.remove('active'));
    $all('.ftab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    $(`ftab-${tab.dataset.ftab}`).classList.add('active');
  });
});

/* ===== RIGHT SIDEBAR ===== */
function renderRightSidebar() {
  // Online friends
  const onlineList = $('onlineList');
  onlineList.innerHTML = '';
  PEOPLE.filter(p => p.online && State.friends.includes(p.id)).forEach(p => {
    const item = document.createElement('div');
    item.className = 'online-item';
    item.innerHTML = `
      <div class="online-avatar-wrap">
        <img src="${p.avatar}" alt="${p.name}" />
        <div class="online-dot"></div>
      </div>
      <div>
        <div class="online-name">${p.name}</div>
        <div class="online-status">Online</div>
      </div>
    `;
    item.addEventListener('click', () => openFloatingChat(p.id));
    onlineList.appendChild(item);
  });
  if (onlineList.children.length === 0) {
    onlineList.innerHTML = '<p style="color:var(--text-muted);font-size:.82rem;padding:4px 6px">No friends online</p>';
  }

  // Suggestions
  const suggestList = $('suggestionsList');
  suggestList.innerHTML = '';
  PEOPLE.filter(p => !State.friends.includes(p.id)).slice(0, 5).forEach(p => {
    const item = document.createElement('div');
    item.className = 'suggestion-item';
    const isAdded = State.friends.includes(p.id);
    item.innerHTML = `
      <img src="${p.avatar}" alt="${p.name}" />
      <div class="suggestion-info">
        <div class="suggestion-name">${p.name}</div>
        <div class="suggestion-mutual">${p.mutual} mutual</div>
      </div>
      <button class="add-friend-sm ${isAdded ? 'added' : ''}" data-person-id="${p.id}">
        ${isAdded ? 'Friends' : 'Add'}
      </button>
    `;
    const addBtn = item.querySelector('.add-friend-sm');
    if (!isAdded) {
      addBtn.addEventListener('click', () => {
        handleAddFriend(p.id, addBtn);
        addBtn.textContent = 'Friends ✓';
        addBtn.classList.add('added');
      });
    }
    suggestList.appendChild(item);
  });

  // Trending
  const trendList = $('trendingList');
  trendList.innerHTML = '';
  TRENDING.forEach(t => {
    const item = document.createElement('div');
    item.className = 'trending-item';
    item.innerHTML = `<div class="trending-tag">${t.tag}</div><div class="trending-count">${t.count}</div>`;
    item.addEventListener('click', () => {
      $('searchInput').value = t.tag;
      toast(`Searching ${t.tag}`, 'info');
    });
    trendList.appendChild(item);
  });
}

/* ===== NOTIFICATIONS ===== */
function renderNotifications() {
  const list = $('notifList');
  list.innerHTML = '';
  State.notifications.forEach(n => {
    const item = document.createElement('div');
    item.className = `notif-item ${n.read ? '' : 'unread'}`;
    item.innerHTML = `
      <img src="${n.avatar}" alt="" class="notif-img" />
      <div>
        <div class="notif-text">${n.text}</div>
        <div class="notif-time">${n.time}</div>
      </div>
    `;
    item.addEventListener('click', () => {
      n.read = true;
      item.classList.remove('unread');
      saveState();
      updateNotifBadge();
    });
    list.appendChild(item);
  });
  updateNotifBadge();
}

function updateNotifBadge() {
  const unread = State.notifications.filter(n => !n.read).length;
  const badge = $('notifBadge');
  badge.textContent = unread;
  badge.style.display = unread > 0 ? 'flex' : 'none';
}

$('notifBtn').addEventListener('click', (e) => {
  $('notifDropdown').classList.toggle('show');
  e.stopPropagation();
});

$('markAllRead').addEventListener('click', () => {
  State.notifications.forEach(n => n.read = true);
  saveState();
  renderNotifications();
  $all('.notif-item').forEach(el => el.classList.remove('unread'));
  toast('All notifications marked as read', 'info');
});

/* ===== MESSAGES ===== */
function renderMessages() {
  const list = $('conversationsList');
  list.innerHTML = '';

  const myFriends = PEOPLE.filter(p => State.friends.includes(p.id));
  // Add all people with messages
  const allConvos = new Set([...myFriends.map(p => p.id), ...Object.keys(State.messages)]);

  allConvos.forEach(personId => {
    const person = PEOPLE.find(p => p.id === personId);
    if (!person) return;
    const msgs = State.messages[personId] || [];
    const last = msgs[msgs.length - 1];
    const item = document.createElement('div');
    item.className = 'convo-item';
    item.innerHTML = `
      <div class="convo-avatar-wrap">
        <img src="${person.avatar}" alt="${person.name}" />
        ${person.online ? '<div class="convo-dot"></div>' : ''}
      </div>
      <div class="convo-info">
        <div class="convo-name">${person.name}</div>
        <div class="convo-last">${last ? last.text : 'Start a conversation'}</div>
      </div>
      <div class="convo-time">${last ? timeAgo(last.time) : ''}</div>
    `;
    item.addEventListener('click', () => {
      $all('.convo-item').forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      openChatView(personId);
    });
    list.appendChild(item);
  });

  if (list.children.length === 0) {
    list.innerHTML = '<p style="color:var(--text-muted);font-size:.85rem;padding:20px;text-align:center">Add friends to start chatting!</p>';
  }
}

function openChatView(personId) {
  const person = PEOPLE.find(p => p.id === personId);
  if (!person) return;
  State.currentChat = personId;

  const chatArea = $('chatArea');
  chatArea.innerHTML = `
    <div class="chat-header">
      <img src="${person.avatar}" alt="${person.name}" />
      <div class="chat-header-info">
        <div class="chat-header-name">${person.name}</div>
        <div class="chat-header-status">${person.online ? '● Online' : 'Offline'}</div>
      </div>
    </div>
    <div class="chat-messages" id="chatMessages"></div>
    <div class="chat-input-area">
      <input type="text" class="chat-input" id="chatInput" placeholder="Type a message…" />
      <button class="chat-send" id="chatSendBtn">
        <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
    </div>
  `;

  $('chatSendBtn').addEventListener('click', sendChatViewMessage);
  renderChatMessages(personId, $('chatMessages'));
}

function renderChatMessages(personId, container) {
  const msgs = State.messages[personId] || [];
  container.innerHTML = '';
  const person = PEOPLE.find(p => p.id === personId);
  msgs.forEach(msg => {
    const wrap = document.createElement('div');
    wrap.className = `chat-message-wrap ${msg.from === 'me' ? 'own' : ''}`;
    wrap.innerHTML = `
      ${msg.from !== 'me' ? `<img src="${person.avatar}" alt="" />` : ''}
      <div>
        <div class="chat-bubble">${msg.text}</div>
        <div class="chat-time">${timeAgo(msg.time)}</div>
      </div>
      ${msg.from === 'me' ? `<img src="${State.user.avatar}" alt="" />` : ''}
    `;
    container.appendChild(wrap);
  });
  container.scrollTop = container.scrollHeight;
}

function sendChatViewMessage() {
  const input = $('chatInput');
  const text = input?.value.trim();
  if (!text || !State.currentChat) return;
  addMessage(State.currentChat, text, 'me');
  input.value = '';

  // Auto reply after delay
  setTimeout(() => {
    const replies = ['Sounds great!', 'That\'s awesome!', 'Tell me more 😊', 'I agree!', 'Cool! 🎉', 'Haha, nice!'];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    addMessage(State.currentChat, reply, State.currentChat);
  }, 1200 + Math.random() * 1000);
}

function addMessage(personId, text, from) {
  if (!State.messages[personId]) State.messages[personId] = [];
  const msg = { text, from, time: Date.now() };
  State.messages[personId].push(msg);
  saveState();

  const container = $('chatMessages');
  if (container && State.currentChat === personId) {
    const person = PEOPLE.find(p => p.id === personId);
    const wrap = document.createElement('div');
    wrap.className = `chat-message-wrap ${from === 'me' ? 'own' : ''}`;
    wrap.innerHTML = `
      ${from !== 'me' ? `<img src="${person.avatar}" alt="" />` : ''}
      <div>
        <div class="chat-bubble">${text}</div>
        <div class="chat-time">${timeAgo(msg.time)}</div>
      </div>
      ${from === 'me' ? `<img src="${State.user.avatar}" alt="" />` : ''}
    `;
    container.appendChild(wrap);
    container.scrollTop = container.scrollHeight;
    wrap.style.animation = 'fadeInUp .25s ease';
  }

  // Update convo list
  if (State.currentView === 'messages') renderMessages();
}

/* ===== FLOATING CHAT ===== */
function openChatWith(personId) {
  const person = PEOPLE.find(p => p.id === personId);
  if (!person) return;
  State.currentChat = personId;

  $('chatBoxAvatar').src = person.avatar;
  $('chatBoxName').textContent = person.name;
  $('floatingChatBox').style.display = 'flex';
  $('floatingChatBox').style.flexDirection = 'column';

  renderFloatingChatMessages(personId);
}

function openFloatingChat(personId) {
  openChatWith(personId);
}

function renderFloatingChatMessages(personId) {
  const container = $('chatBoxMessages');
  container.innerHTML = '';
  const msgs = State.messages[personId] || [];
  const person = PEOPLE.find(p => p.id === personId);
  msgs.forEach(msg => {
    const wrap = document.createElement('div');
    wrap.className = `chat-message-wrap ${msg.from === 'me' ? 'own' : ''}`;
    wrap.innerHTML = `
      <div>
        <div class="chat-bubble">${msg.text}</div>
        <div class="chat-time">${timeAgo(msg.time)}</div>
      </div>
    `;
    container.appendChild(wrap);
  });
  container.scrollTop = container.scrollHeight;
}

function sendFloatingMessage() {
  const input = $('chatBoxInput');
  const text = input.value.trim();
  if (!text || !State.currentChat) return;
  addMessage(State.currentChat, text, 'me');
  input.value = '';
  renderFloatingChatMessages(State.currentChat);

  setTimeout(() => {
    const replies = ['Hey! 😄', 'That\'s great!', 'Cool!', 'For sure!', 'I\'ll check it out!'];
    addMessage(State.currentChat, replies[Math.floor(Math.random() * replies.length)], State.currentChat);
    renderFloatingChatMessages(State.currentChat);
  }, 1000 + Math.random() * 1000);
}

$('chatSendBtn').addEventListener('click', sendFloatingMessage);
$('chatBoxClose').addEventListener('click', () => {
  $('floatingChatBox').style.display = 'none';
  State.currentChat = null;
});

/* ===== SEARCH ===== */
$('searchInput').addEventListener('input', function () {
  const q = this.value.trim().toLowerCase();
  const results = $('searchResults');
  if (!q) { results.classList.remove('show'); return; }

  const matches = [
    ...PEOPLE.filter(p => p.name.toLowerCase().includes(q)),
    ...State.posts.filter(p => p.text.toLowerCase().includes(q)).map(p => ({
      id: p.id, name: p.username, avatar: p.avatar, type: 'post'
    }))
  ].slice(0, 6);

  results.innerHTML = '';
  if (matches.length === 0) {
    results.innerHTML = '<div class="search-result-item">No results found</div>';
  } else {
    matches.forEach(m => {
      const item = document.createElement('div');
      item.className = 'search-result-item';
      item.innerHTML = `<img src="${m.avatar}" alt="${m.name}" /><span>${m.name}</span>`;
      item.addEventListener('click', () => {
        results.classList.remove('show');
        $('searchInput').value = '';
        toast(`Viewing ${m.name}`, 'info');
      });
      results.appendChild(item);
    });
  }
  results.classList.add('show');
});

/* ===== MODAL HELPERS ===== */
function openModal(id) {
  $(id).classList.add('show');
}

function closeModal(id) {
  $(id).classList.remove('show');
}

// Close buttons
document.addEventListener('click', (e) => {
  const closeBtn = e.target.closest('[data-close]');
  if (closeBtn) {
    closeModal(closeBtn.dataset.close);
  }
  // Click outside modal
  if (e.target.classList.contains('modal-overlay') && e.target.classList.contains('show')) {
    e.target.classList.remove('show');
  }
});

/* ===== THEME TOGGLE ===== */
$('themeToggle').addEventListener('click', () => {
  const newTheme = State.theme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
  saveState();
  toast(`${newTheme === 'dark' ? '🌙 Dark' : '☀️ Light'} mode enabled`, 'info');
});

/* ===== SIDEBAR NAVIGATION ===== */
$all('.sidebar-link[data-view]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    showView(link.dataset.view);
  });
});

$all('.nav-tab[data-tab]').forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    showView(tab.dataset.tab);
  });
});

// Sidebar profile mini click
$('sidebarProfileMini').addEventListener('click', () => showView('profile'));
$('profileAvatarNav').addEventListener('click', () => showView('profile'));

/* ===== MOBILE ===== */
function createSidebarOverlay() {
  if ($q('.sidebar-overlay')) return;
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);
  overlay.addEventListener('click', closeSidebar);
}

$('mobileMenuBtn').addEventListener('click', () => {
  const sidebar = $('sidebarLeft');
  sidebar.classList.toggle('open');
  const overlay = $q('.sidebar-overlay');
  if (overlay) overlay.classList.toggle('show', sidebar.classList.contains('open'));
});

/* ===== FEELING BUTTON in card ===== */
$('feelingBtn').addEventListener('click', () => {
  openModal('postModalOverlay');
  setTimeout(() => {
    $('feelingPicker').style.display = 'flex';
  }, 100);
});
$('liveBtn').addEventListener('click', () => toast('Live feature coming soon! 🎥', 'info'));

/* ===== MSG SEARCH ===== */
$('msgSearch')?.addEventListener('input', function() {
  const q = this.value.toLowerCase();
  $all('#conversationsList .convo-item').forEach(item => {
    const name = item.querySelector('.convo-name').textContent.toLowerCase();
    item.style.display = name.includes(q) ? 'flex' : 'none';
  });
});

/* ===== INIT ===== */
function init() {
  loadState();
  applyTheme(State.theme);
  createSidebarOverlay();

  updateAllAvatars();
  updateAllUserNames();
  renderFeed();
  renderStories();
  renderRightSidebar();
  renderNotifications();
  updateProfileStats();

  // Set up initial messages
  if (Object.keys(State.messages).length === 0) {
    State.messages['p1'] = [
      { text: 'Hey! How are you doing?', from: 'p1', time: Date.now() - 30 * 60000 },
      { text: 'I\'m great! Just saw your latest post 🔥', from: 'me', time: Date.now() - 28 * 60000 },
      { text: 'Thanks so much! Working on something new 😊', from: 'p1', time: Date.now() - 25 * 60000 },
    ];
    State.messages['p2'] = [
      { text: 'Did you check out that new framework?', from: 'p2', time: Date.now() - 2 * 60 * 60000 },
      { text: 'Yeah, looks interesting! We should try it', from: 'me', time: Date.now() - 1.9 * 60 * 60000 },
    ];
    saveState();
  }

  hideLoader();
}

init();
