if command -v rover &> /dev/null; then
    echo "Rover CLI is already installed ✓"
else
    echo "Rover CLI not found. Installing..."
    curl -sSL https://rover.apollo.dev/nix/latest | sh
    echo "Rover CLI installed successfully ✓"
fi

echo "Downloading Apollo MCP Server..."
curl -sSL https://mcp.apollo.dev/download/nix/latest | sh

echo "Installing npm packages..."
cd dev/flyby
npm install
cd ../..

echo "Installing chokidar globally..."
npm i chokidar-cli -g

# Create an empty `apps` dir so that chokidar is notified about the first build
mkdir apps

echo "\n"
echo "\n"
echo "You're all installed and ready to go! 🚀"
echo "\n"
echo "To get started, follow the README instructions."
echo "Happy building! 🚀"
