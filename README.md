# Crypto

1. `brew install mysql`

2. install node v6.11.2 (LTS) and npm

3. Clone the repo

5. change directory to client folder. `cd client`, then do `yarn install` and then do `yarn run build-dev`. Change directory back to root `cd ..`.

6. Login to local mysql server. Create a database named `crypto_values`. Update the credentials to login into mysql in config/config.js file. Remember not to push this file with your changed password of local mysql server. To achieve this do 
    git update-index --assume-unchanged config/config.js

9. yarn install

10. `npm run migrate-local`

11. `npm run local-start` and server will start running on 5000, API documentation on 5001.

# Local Development in typescript (BE)

To run Typescript(BE) shell locally use ts-node

To check if your current changes are acceptable and dont throw any warning in TypeScript do `tsc -w -p .` in root directory of the folder

