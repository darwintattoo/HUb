#!/bin/bash

echo "🔐 TattooStencilPro - Protección de Código"
echo "=========================================="

# Crear build de producción
echo "📦 Creando build optimizado..."
npm run build

# Ejecutar protección
echo "🛡️  Aplicando protección avanzada..."
node scripts/obfuscate.js

echo ""
echo "🎉 ¡Tu aplicación está completamente protegida!"
echo "💡 Ahora tu código JavaScript es ilegible para otros"
echo "🚀 Listo para deployment seguro"