set -e

export NVM_DIR="/home/ubuntu/.nvm"
source "$NVM_DIR/nvm.sh"

nvm install 25.2.1
nvm use 25.2.1

cd /home/ubuntu/mini-4th-frontend

npm install

npx next start -p 3000