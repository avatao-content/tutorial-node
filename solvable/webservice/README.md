# Node.js Top 10 Vulnerabilities

## Nodify Features

Nodify is an app that lets you create playlists for yourself from songs (just like Spotify without the playback functionality).

Features:

- [x] Listing of all songs
- [x] Create new playlist
- [x] Add song to playlist
- [x] Make playlist private
- [x] Show profile page
- [x] Log in
- [x] Edit profile (email, name, age, picture)
- [ ] API
    - [ ] list all users
    - [ ] list all songs
    - [ ] list playlists by user

## Prerequisites

You need to have a Node.js installation on your computer. You can check if it present by running `node -v`.

If you install Node it will also install `npm` (node package manager) on your computer.

## Getting Started

This project comes with some built-in scripts for development and distribution. To start working on the project run

```
npm run dev
```

This will start *nodemon*. Nodemon is a tool that will look for changes on the filesystem and restart node whenever something
needs to be recompiled (including static `.css` files).

Whenever you want to build the project for distribution run

```
npm run build
```

This will generate the necessary files into the `dist` folder.

Happy coding!

## Vulnerabilities

- [x] BOLA
  - Call /api/users to find an user
  - Call /api/playlists/:userId with the user
  - Find all the playlists (even the private ones)
- [x] Null Origin
  - Obtain a session token
  - Use it to post form data to `/profile` containing the `id`, `name` and `email` fields
    and with the header: `Allow-Origin: null`
  - The response should contain `Access-Control-Allow-Origin: null`
- [x] Mass Assignment
  - Obtain a session token
  - Obtain the data for an user form `/users`
  - Use it to post form data to `/profile` containing the following fields: `id`, `name`, `email` and the `permissions` field
    with the following value: `CREATE_PLAYLIST,READ_PROFILE,READ_SONGS,READ_PLAYLISTS,UPDATE_PROFILE,UPDATE_PLAYLIST,DELETE_PLAYLIST,LOG_OUT,DELETE_PROFILE`
  - Navigate to `/profile`
  - Click the `Delete Profile` button that just appeared
- [x] Integer Overflow
  - Go to profile
  - Change age to `9007199254740993`
  - After saving you'll see `9007199254740992`
- [x] XSS
  - Navigate to the profile page
  - Change the name to `More info <b onmouseover=alert('Oops!')>here</b>`
  - Click `Go`
- [x] Payload size DOS
  - Navigate to `/profile`
  - Try to upload a file that is too big (2MB+)
- [x] REGEX DOS
  - Navigate to the profile page.
  - Input `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!` into the email field
  - Click `Go`
- [x] Hide Error Details from clients
  - Try to log in with any email other than `john@doe.com`
- [x] X-Powered-By header and other identifying information
  - Navigate to `/`
  - Look at the headers in the debug console and see `X-Powered-By: Express`
- [x] Arbitrary Code Execution with Deserialization
  - Navigate to the profile page
  - Into the "Custom Config" filed input this:
    ```
    {"rce":"_$$ND_FUNC$$_function () {\n    const f = require(\"fs\");\n\n    const p = require(\"path\");\n\n    f.appendFileSync(p.join(__dirname, \"../../../static/haxx.txt\"), \"haxx\");\n  }()"}
    ```
  - Click `Go`
  - Now navigate to `/` and check `/static/haxx`

## Tools

- Nodemon: Hot code replace for node
- Express: Simple web library for node
- Jest: Testing tool for node