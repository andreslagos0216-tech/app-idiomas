const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, '..', 'dist');
const publicDir = path.join(__dirname, '..', 'public');

// Copia lo que hay en public/ (manifest e icono) a dist/
if (fs.existsSync(publicDir)) {
  fs.cpSync(publicDir, dist, { recursive: true });
}

// Añade al HTML las etiquetas que iPhone necesita para instalar la app
const htmlPath = path.join(dist, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');
const tags = `
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="Mówi" />
    <meta name="theme-color" content="#0284C7" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
`;
if (!html.includes('apple-mobile-web-app-capable')) {
  html = html.replace('</head>', tags + '  </head>');
}
fs.writeFileSync(htmlPath, html);
console.log('postbuild: etiquetas añadidas a dist/index.html');
