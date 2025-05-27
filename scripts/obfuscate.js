const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

console.log('🔐 TattooStencilPro - Sistema de Protección de Código');
console.log('================================================');

function obfuscateFile(filePath) {
  try {
    const sourceCode = fs.readFileSync(filePath, 'utf8');
    
    // Configuración de máxima protección
    const obfuscationResult = JavaScriptObfuscator.obfuscate(sourceCode, {
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 0.8,
      deadCodeInjection: true,
      deadCodeInjectionThreshold: 0.5,
      debugProtection: true,
      debugProtectionInterval: 3000,
      disableConsoleOutput: true,
      identifierNamesGenerator: 'hexadecimal',
      log: false,
      numbersToExpressions: true,
      renameGlobals: false,
      selfDefending: true,
      simplify: true,
      splitStrings: true,
      splitStringsChunkLength: 8,
      stringArray: true,
      stringArrayCallsTransform: true,
      stringArrayEncoding: ['base64'],
      stringArrayIndexShift: true,
      stringArrayRotate: true,
      stringArrayShuffle: true,
      stringArrayThreshold: 0.8,
      transformObjectKeys: true,
      unicodeEscapeSequence: false
    });
    
    fs.writeFileSync(filePath, obfuscationResult.getObfuscatedCode());
    return true;
  } catch (error) {
    console.log(`❌ Error protegiendo ${filePath}:`, error.message);
    return false;
  }
}

function protectDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`❌ Directorio no encontrado: ${dir}`);
    return;
  }
  
  let protected = 0;
  let total = 0;
  
  function processDirectory(currentDir) {
    const files = fs.readdirSync(currentDir);
    
    files.forEach(file => {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        processDirectory(filePath);
      } else if (file.endsWith('.js') && !file.includes('.min.')) {
        total++;
        console.log(`🛡️  Protegiendo: ${path.relative(dir, filePath)}`);
        
        if (obfuscateFile(filePath)) {
          protected++;
          console.log(`✅ Completado`);
        }
      }
    });
  }
  
  processDirectory(dir);
  
  console.log('================================================');
  console.log(`🎉 Protección completada: ${protected}/${total} archivos`);
  console.log('🔒 Tu código está ahora completamente protegido');
}

// Proteger aplicación
const buildDir = path.join(__dirname, '../dist/public');
protectDirectory(buildDir);