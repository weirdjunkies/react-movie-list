import React from 'react';
import { BrowserRouter as Router , Switch, Route } from 'react-router-dom';
import DetailMovie from './components/DetailMovie';
import MovieList from './components/MovieList';

function App()  {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MovieList}/>
        <Route exact path="/Detail/:imdbID" component={DetailMovie}/>
      </Switch>
    </Router>
  )
}

export default App;
