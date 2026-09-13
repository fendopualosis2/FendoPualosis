const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

const youtubeVideos = [
  { id: '226ev1OynuU', title: 'Video 1', url: 'https://youtu.be/226ev1OynuU', thumbnail: 'https://img.youtube.com/vi/226ev1OynuU/maxresdefault.jpg' },
  { id: 'lgb2bI7EQA4', title: 'Video 2', url: 'https://youtu.be/lgb2bI7EQA4', thumbnail: 'https://img.youtube.com/vi/lgb2bI7EQA4/maxresdefault.jpg' },
  { id: 'NtOSB_qeQSM', title: 'Video 3', url: 'https://youtu.be/NtOSB_qeQSM', thumbnail: 'https://img.youtube.com/vi/NtOSB_qeQSM/maxresdefault.jpg' },
  { id: 'zchH7W_i5mY', title: 'Video 4', url: 'https://youtu.be/zchH7W_i5mY', thumbnail: 'https://img.youtube.com/vi/zchH7W_i5mY/maxresdefault.jpg' },
  { id: 'iN-rQ6n3vpM', title: 'Video 5', url: 'https://youtu.be/iN-rQ6n3vpM', thumbnail: 'https://img.youtube.com/vi/iN-rQ6n3vpM/maxresdefault.jpg' }
];

data = data.replace(
  /skills:\s*\{\s*thumbnails:\s*\[[\s\S]*?\]/,
  `skills: {\n    thumbnails: ${JSON.stringify(youtubeVideos, null, 6)}`
);

data = data.replace(
  /work:\s*\{\s*videos:\s*\[[\s\S]*?\]/,
  `work: {\n    videos: ${JSON.stringify(youtubeVideos, null, 6)}`
);

fs.writeFileSync('src/data.ts', data);
