const fs = require('fs');
const src = 'C:\\Users\\ankit\\.gemini\\antigravity\\brain\\01de6be5-4dba-4523-b94c-d7f2df32f7fd\\logo_icon_1777463078509.png';
const dest = 'd:\\SikhoBussiness\\seekho-business\\public\\logo-icon.png';

try {
    fs.copyFileSync(src, dest);
    console.log('Successfully copied logo-icon.png');
} catch (err) {
    console.error('Error copying file:', err);
}
