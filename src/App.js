import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovies]=useState([])
  async function FetchHandler(){
    const response= await fetch('https://swapi.dev/api/films/')
    
      const data=await response.json();
    
      const transformedMovies=data.results.map(moviesdata=>{
        return{
          id:moviesdata.episode_id,
          title:moviesdata.title,
          openingText:moviesdata.opening_crawl,
          releaseDate:moviesdata.release_date

        }
 
      })
      setMovies(transformedMovies); 
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
