# NF ACL Module

* [Installation](#installation)
* [Command](#command)

<a name="installation"></a>
## Installation

```
npm install --save @codersvn/nodejs-acl
```

If YARN

```
yarn add @codersvn/nodejs-acl
```
#### Configuration

make `.env` file is a copy of `.env.example` and update it with your information

#### Migrate database

```
./node_modules/.bin/sequelize db:migrate
```

#### Install seed data

```
./node_modules/.bin/sequelize db:seed:all
```