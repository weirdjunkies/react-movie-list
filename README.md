# StockMovie App

a movie finder app connected to OMDb API.

For Bibit / Stockbit Lead React Developer Test - Test 2: Simple Movie Finder App

### Built With

- [Create React App](https://github.com/facebook/create-react-app).
- [Bootstrap 5](https://getbootstrap.com) + [SASS](https://sass-lang.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Redux Saga](https://redux-saga.js.org/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine

### Prerequisites

Make sure you have installed all of the following prerequisites on your local machine:

- Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/hendra-foo/stock-movie-app.git
   ```
2. Move to repo root directory
   ```sh
   cd stock-movie-app
   ```
3. Install NPM packages, this command is similar to `npm install` [read more here](https://docs.npmjs.com/cli/v7/commands/npm-ci)
   ```sh
   npm ci
   ```
4. Run in Development mode
   ```sh
   npm start
   ```
5. You can now view **stock-movie-app** in the browser by going to [http://localhost:3000](http://localhost:3000)

### Testing Your Application

The test only cover reusable Components and Hooks. You can run the test with:

```sh
npm test
```

## Usage

#### Mega Search

You can try search a movie by clicking the **Search Button** on the top right and type the title, the button icon can changing depends on the state, if the Mega Search is closed, it will show **Search** icon, while searching movie will show **Dot Loading** icon, and the last when the Mega Search is opened, it will show a **Close** icon.

For better UX Experience, we don't clear your last search after you close the Mega Search. We also **debounce** and **limit** your search result everytime the search keyword change, so the result will keep under control and you can load more result by **Scrolling to the bottom** of the list.

#### Big Poster

Click on the poster will show a Full Big Poster to your Screen

#### Fully Responsive

Our app also work on all screensize

## Contact

Hendra - [+6283284327733](https://wa.me/6283184327733) - fu.ceyong18@gmail.com

Project Link: [https://github.com/hendra-foo/stock-movie-app](https://github.com/hendra-foo/stock-movie-app)