# Simple Todo App with Electron

## Stack
- Electron
- Prisma
- SQLite

## Requirements
- I'm using Nodejs v24.16.0 for this project

## Installation
- Clone this repo
```
git clone https://github.com/lenardatthebreakwater/todo-electron.git
```
- Change directory
```
cd todo-electron
```
- Run npm install
```
npm install
```
- Create a .env file in the root directory with the following
```
DATABASE_URL="file:./todo.db"
```
- Set up database
```
npx prisma generate && npx prisma migrate dev --name init && npx electron-rebuild -f -w better-sqlite3
```

## Usage
- To start the application run
```
npx electron .
```