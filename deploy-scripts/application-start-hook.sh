set -e

export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"

nvm use 24.11.1

pkill -f "next start" || true

npx next start -p 3000 &