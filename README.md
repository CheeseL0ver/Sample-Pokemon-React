# Sample Pokemon React 
A sample JS application built using Node and React to display information from the Pokemon series.

## Prerequisites
* Install **mysql**
- Install **npm**
- Install **npx**

## Setup 

- Download this source code into a working directory.

- Install the requirements using npm for the client:

```cd client && make install```

- Install the requirements using npm for the server:

```cd server && make install
```

This will install all the required packages and libraries for using both the Node.js server and the React client.

- Update both the **knexfile.js** and **routes.js** to use the correct mysql credentials:

 `cd server`

 `vim knexfile.js`

 `vim routes.js`

## Database setup

Log into mysql client
``` mysql -u {user} -p
```

Create database
``` CREATE DATABASE {db_name};
```

>**Note:** You can name the database whatever, however the code, by default, is expecting it to be named **Knex** if you do change the name you will need to update both the **knexfile.js** file and the **routes.js** file.

Create Database Tables:
```cd server && npx knex migrate:latest
```

Populate Database Data:
```cd server && npx knex seed:run
```
>**Note** If you need to reset all of the data in the database you can run the above command

##Usage
Run the server using the following command:

```cd server && npm start```

The server will run on localhost:3001

Start the client using the following command:

```cd client && npm start
```

Visit localhost:3000 to see the running website!


## Thanks
* [Pokeapi](https://github.com/PokeAPI/pokeapi/) for all the Pokemon data and sprites.

