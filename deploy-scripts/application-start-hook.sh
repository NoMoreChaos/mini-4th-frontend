set -e

export NVM_DIR="/home/ec2-user/.nvm"
source "$NVM_DIR/nvm.sh"

nvm install 24.11.1
nvm use 24.11.1

cd /home/ec2-user/mini-4th-frontend

npm install

npx next start -p 3000