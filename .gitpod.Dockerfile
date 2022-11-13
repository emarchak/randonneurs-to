FROM gitpod/workspace-full:latest

RUN bash -c 'VERSION=$(<.nvmrc) \
    && source $HOME/.nvm/nvm.sh && nvm install $VERSION \
    && nvm use $VERSION'

RUN echo "nvm use &>/dev/null" >> ~/.bashrc.d/51-nvm-fix
