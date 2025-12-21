#!/bin/bash
set -e

echo "Starting toolchain setup..."

# 1. Ensure Mise is in the PATH
export PATH="$HOME/.local/share/mise/bin:/usr/local/bin:$PATH"

# 2. Install core tools via Mise
mise trust
mise install --yes

# 3. Setup LazyVim
if [ ! -d "$HOME/.config/nvim" ]; then
  echo "Installing LazyVim..."
  git clone https://github.com/LazyVim/starter $HOME/.config/nvim
  rm -rf $HOME/.config/nvim/.git
fi

echo "Toolchain setup complete. You can now initialize Astro manually."
