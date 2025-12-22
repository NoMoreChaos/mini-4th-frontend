set -e

export NVM_DIR="/home/ec2-user/.nvm"
source "$NVM_DIR/nvm.sh"

nvm install 22
nvm use 22

cd /home/ec2-user/mini-4th-frontend

npm install

npx next start -p 3000