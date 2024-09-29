#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Carga nvm si está disponible
nvm use default  # O la versión específica de Node.js que estés usando

cd /home/cristian/Desktop/projects/tienda_andres/code/ta_web
/home/cristian/.local/share/pnpm/pnpm dev
touch something.txt
read -p "Presiona Enter para cerrar..."
