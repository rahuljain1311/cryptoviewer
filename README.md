# Crypto

Tech Stack: NodeJS, Angular, Mysql, Hapi, Typescript(Typechecking on BE).

Docker
1. docker build -t crypto .

2. docker run -p 80:5000 crypto

Website will start at http://localhost


Local Development

1. `brew install mysql`. Update your local credentials in config/config.js file under `local` environment

2. install node v6.11.2 (LTS) and npm

3. Clone the repo

4. Login to local mysql server. Create a database named `crypto_values`.

5. npm install

6. npm install -g bower

7. bower install

8. `npm run migrate-local`

9. `npm run local-start` and server will start running on 5000, API documentation on 5001.

Website will start at http://localhost:5000

# To check type errors in typescript (BE)

To run Typescript(BE) shell locally use ts-node

To check if your current changes are acceptable and dont throw any warning in TypeScript do `tsc -w -p .` in root directory of the folder

