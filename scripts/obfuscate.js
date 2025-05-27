const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

function obfuscateDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      obfuscateDirectory(filePath);
    } else if (file.endsWith('.js') && !file.includes('.min.')) {
      console.log(`Ofuscando: ${filePath}`);
      
      const sourceCode = fs.readFileSync(filePath, 'utf8');
      
      const obfuscationResult = JavaScriptObfuscator.obfuscate(sourceCode, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.4,
        debugProtection: true,
        debugProtectionInterval: 4000,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        numbersToExpressions: true,
        renameGlobals: false,
        selfDefending: true,
        simplify: true,
        splitStrings: true,
        splitStringsChunkLength: 10,
        stringArray: true,
        stringArrayCallsTransform: true,
        stringArrayEncoding: ['base64'],
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayThreshold: 0.75,
        transformObjectKeys: true,
        unicodeEscapeSequence: false
      });
      
      fs.writeFileSync(filePath, obfuscationResult.getObfuscatedCode());
      console.log(`✅ Protegido: ${file}`);
    }
  });
}

// Ofuscar el directorio de build
const buildDir = path.join(__dirname, '../dist/public');
if (fs.existsSync(buildDir)) {
  console.log('🔐 Iniciando protección de código...');
  obfuscateDirectory(buildDir);
  console.log('🎉 ¡Código completamente protegido!');
} else {
  console.log('❌ Directorio de build no encontrado. Ejecuta "npm run build" primero.');
}