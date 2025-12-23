#!/bin/bash
set -e

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm install 25.2.1
nvm use 25.2.1

cd /home/ubuntu/mini-4th-frontend

npm install

npx next start -p 3000