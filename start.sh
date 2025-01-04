#!/bin/bash

# Obtener la ruta del script para manejar rutas relativas
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Ruta relativa del archivo ecosystem.config.js
ECOSYSTEM_CONFIG="${SCRIPT_DIR}/ecosystem.config.js"

# Ejecutar PM2 con el archivo ecosystem.config.js
pm2 start "$ECOSYSTEM_CONFIG"

# Confirmar que el comando fue ejecutado
if [ $? -eq 0 ]; then
    echo "PM2 ha iniciado el archivo de configuración correctamente."
else
    echo "Hubo un problema al iniciar PM2."
    exit 1
fi
