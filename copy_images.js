const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\ankit\\.gemini\\antigravity\\brain\\01de6be5-4dba-4523-b94c-d7f2df32f7fd';
const statsDir = path.join(__dirname, 'public', 'images', 'stats');
const mainDir = path.join(__dirname, 'public', 'images');

// Ensure directories exist
if (!fs.existsSync(statsDir)) fs.mkdirSync(statsDir, { recursive: true });
if (!fs.existsSync(mainDir)) fs.mkdirSync(mainDir, { recursive: true });

const filesToCopy = [
  { src: 'icon_book_1777442170483.png', dest: 'public/images/stats/book.png' },
  { src: 'icon_cap_1777442191959.png', dest: 'public/images/stats/cap.png' },
  { src: 'icon_live_1777442211055.png', dest: 'public/images/stats/live.png' },
  { src: 'icon_video_1777442228908.png', dest: 'public/images/stats/video.png' },
  { src: 'icon_eye_1777442243760.png', dest: 'public/images/stats/eye.png' },
  { src: 'course_placeholder_1777443255642.png', dest: 'public/images/course-placeholder.png' },
  { src: 'android_app_mockup_1777443963403.png', dest: 'public/images/app-mockup.png' },
  { src: 'seekho_business_matching_logo_1777446261808.png', dest: 'public/images/logo-rect.png' }
];

filesToCopy.forEach(file => {
  const srcPath = path.join(srcDir, file.src);
  const destPath = path.join(__dirname, file.dest);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✅ Successfully Copied to ${file.dest}`);
  } else {
    console.log(`❌ Source file not found: ${srcPath}`);
  }
});
