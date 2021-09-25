FROM ubuntu

# Ensure gatsby is installed
RUN apt-get -qq update  -y     \
    && apt-get -qq install -y  \
        curl                   \
        git

# Use login shell so that nvm works
SHELL ["/bin/bash", "--login", "-c"]

# Gatsby needs Node version of at least 12.13.0
ENV NODE_VERSION="12.22.1"
ENV HOME="/root"
ENV NVM_DIR="$HOME/.nvm"
RUN mkdir $NVM_DIR

# Install nvm with node and npm
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.35.1/install.sh | bash \
    && . /root/.nvm/nvm.sh

# Set up our shell to use NVM
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/v$NODE_VERSION/bin:$PATH
RUN echo '. ~/.nvm/nvm.sh' >> ~/.profile

# Ensure the version of node we want is the default version and installed
RUN nvm install $NODE_VERSION 
RUN nvm alias default $NODE_VERSION 
RUN nvm use default 

# Install Gatsby (needs to run as root to avoid permissions issues)
RUN npm config set user 0
RUN npm config set unsafe-perm true
RUN npm install -g gatsby-cli
RUN gatsby telemetry --disable

# Install yarn, which is better than npm.
RUN npm install -g yarn

# Layer a node_modules volume so that we can install dependencies inside the container,
# and not in the mounted volume, since NTFS is extremely slow and this would take nearly
# forever.  Also, just copy in the package.json/yarn.lock files so that this step can be
# cached unless those files change.
RUN mkdir /app
VOLUME /app
COPY src/gatsby-docs/package.json /app
COPY src/gatsby-docs/yarn.lock /app
VOLUME /app/node_modules
WORKDIR /app
RUN yarn install

# Copy in the main app
COPY src/gatsby-docs /app

# Run the development server
CMD gatsby develop --host 0.0.0.0 --port 9999