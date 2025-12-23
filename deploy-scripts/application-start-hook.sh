#!/bin/bash
set -e

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm install 25.2.1
nvm use 25.2.1

cd /home/ubuntu/mini-4th-frontend

pkill -f "next start" || true 
pkill node || true

npm install

nohup npx next start -p 80 > /home/ubuntu/next.log 2>&1 &
