---
title: "Three ways for Docker to track code changes"
subtitle: "Automatically restarting the node process inside the container when the code changes"
date: "2023-05-15"
---

## Introduction

**🎯Problem:** We build an image then we build a container from it, now we change our code, but the image that we create from dockerfile was run before we made these changes. So we need to rebuild the image and run a new container from it. But we can use volume or extensions install to solve this problem. I have tried three ways to solve this problem.

In the beginning, we probably used delete image, and rebuild image way.

```bash
docker rm node-app -f

docker build -t node-app-image .
```

But we don't want to do rebuild every time we make a change. So we can use volume to solve this problem. Three wyas to solve this problem.😀♥💡

## 💖 1. Volume - bind mount in docker

We're going to make use of Volume, which is a way to persist data in Docker. We can use volume to map a folder in our local machine to a folder in our container. There is special volume called `bind mound in docker` what it allows us to do is sync a floder in our local host machine with a folder in our docker container. I can do sync work files and sync them into the slash app directory in our container. This is really speed up theh development process.

**First,** delete the container and image.

```bash
docker run -v pathtofolderlocal:pathtofoldercontainer -p 3000:3000 -d --name node-app node-app-image
```

In this time `.` is not working, you have to pass the whole path. `%cd%` is can instead whole path, only working in windows command. `${pwd}` is also instead current working directory in windows powershell. `$(pwd)` is also instead current working directory in linux and mac.

Example:

```bash
docker run -v D:\study\githubprojects\node-docker\:/app:ro -v /app/node_modules --env-file ./.env -p 3000:4000 -d --name node-app node-app-image
```

Probaly get warning, you can ignore it.
check the docker container, if data changes

```cmd
docker exec -it node-app sh
ls
cat index.js
```

remember to do restart the node process. So nodemon will pick up the changes.
nodemon install in devDependencies, so we don't want it in production.

```bash
npm install nodemon --save-dev
```

in package.json

```json
"scripts": {
    "start": "node index.js",
    "dev": "nodemon -L index.js"
  },
```

`-L` flag is for nodemon to work in windows for docker.

In dockerfile, `CMD ['npm', 'run', 'dev']`

> **CHECK MY REPO, I HAVE DONE THIS WAY** [**HERE**](https://github.com/yanliu1111/Docker-DevOps-with-Nodejs-Express)

## 💛 2. Use Extensions - trigger Task on Save

Install this extension, it will do is trigger some tasks to run any tasks that you define anytime you save a file. We can create a task that's restarts our backend service for us and everytime we save a file in vs code, this can restart our backend for us.

**Process:**<br>
1 Copy extension path to `extensions.json` which is under `.vscode` folder. `"gruntfuggly.triggertaskonsave"`

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "gruntfuggly.triggertaskonsave"
  ]
}
```

2 Create `tasks.json` under `.vscode` folder
`backend` is your service name, you named it.

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "restart backend",
      "type": "shell",
      "command": "docker compose restart backend",
      "presentation": {
        "reveal": "never"
      }
    }
  ]
}
```

Presentation reveal never is to hide the terminal when we run this task.

3 Add in `setting.json` file

```json
{
  "files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true
  },
  "triggerTaskOnSave.tasks": {
    "restart backend": ["src/**/*"]
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

Done, there is some trick, when I change the `index.ts` and want to see my update in frontend, the terminal looked break, but it's not, when I did `docker ps`, the container was still running. So when you change the code, `it looked stopping, but it is not actually stopping`.

> **CHECK MY REPO, I HAVE DONE THIS WAY** [**HERE**](https://github.com/yanliu1111/docker-types-node-postgres-app)

## 💙 3. Create a watch process if you don't use VS code

[Watchy](https://github.com/caseywebdev/watchy) is a utility tool that will listens for any changes to your typescript files and restarts your typescript.

[Watchy](https://github.com/caseywebdev/watchy) is available npm. GitHub repo of the npm, package name is `watchy`. It is similar setup as 2nd way.

```
pnpm add watchy --save-dev
```

In `package.json`, create a script

The detail work process in the creator [repo](https://github.com/caseywebdev/watchy), you can check it.

```json
 "watch": "watchy --no-init-spawn --debounce 1 -w src -- docker compose restart backend"
```

This way is good for developers don't use VS code.

[⬆️ Back to Top](#introduction)
