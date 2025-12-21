FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    build-essential \
    curl \
    git \
    unzip \
    ripgrep \
    fd-find \
    xclip \
    tmux \
    lua5.1 \
    && ln -s $(which fdfind) /usr/local/bin/fd \
    && curl -sSL https://raw.githubusercontent.com/alacritty/alacritty/master/extra/alacritty.info | tic -x - \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

COPY --from=jdxcode/mise:latest /usr/local/bin/mise /usr/local/bin/mise

USER vscode

RUN echo 'eval "$(mise activate bash)"' >> /home/vscode/.bashrc \
    && echo 'alias v=nvim' >> /home/vscode/.bashrc \
    && echo 'alias vi=nvim' >> /home/vscode/.bashrc \
    && echo 'alias vim=nvim' >> /home/vscode/.bashrc \
    && echo 'if [ -z "$TMUX" ]; then tmux attach-session -t dev || tmux new-session -s dev; fi' >> /home/vscode/.bashrc


