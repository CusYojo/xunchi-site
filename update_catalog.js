const fs = require('fs');
const path = require('path');

const PRODUCTS_DIR = path.join(__dirname, 'assets', 'img', 'products');
const OUTPUT_FILE = path.join(__dirname, 'gallery.js');

const VALID_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// Category mapping validation (optional, ensures we only index known folders or all)
// We will just read all directories in PRODUCTS_DIR
function getDirectories(srcPath) {
    return fs.readdirSync(srcPath).filter(file => {
        return fs.statSync(path.join(srcPath, file)).isDirectory();
    });
}

function getFiles(srcPath) {
    return fs.readdirSync(srcPath).filter(file => {
        const ext = path.extname(file).toLowerCase();
        return VALID_EXTENSIONS.includes(ext);
    });
}

function formatTitle(filename) {
    // Remove extension
    const name = path.parse(filename).name;
    // Replace - and _ with space
    let title = name.replace(/[-_]/g, ' ');
    // Capitalize words
    title = title.replace(/\b\w/g, l => l.toUpperCase());
    return title;
}

const gallery = [];

try {
    if (!fs.existsSync(PRODUCTS_DIR)) {
        console.error(`Directory not found: ${PRODUCTS_DIR}`);
        process.exit(1);
    }

    const categories = getDirectories(PRODUCTS_DIR);

    categories.forEach(category => {
        const catDir = path.join(PRODUCTS_DIR, category);
        const files = getFiles(catDir);

        files.forEach(file => {
            gallery.push({
                src: `assets/img/products/${category}/${file}`,
                title: formatTitle(file),
                category: category
            });
        });
    });

    const fileContent = `window.__GALLERY__ = ${JSON.stringify(gallery, null, 2)};`;

    fs.writeFileSync(OUTPUT_FILE, fileContent);
    console.log(`Successfully updated ${OUTPUT_FILE} with ${gallery.length} items.`);

} catch (err) {
    console.error('Error updating catalog:', err);
}
