set -e

export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"

nvm install 24.11.1
nvm use 24.11.1

cd /home/ec2-user/mini-4th-frontend

pkill -f "next start" || true

npx next start -p 3000