import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovies]=useState([])
  const [isLoading,setisLoding]=useState(false);
  async function FetchHandler(){
    setisLoding(true);
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
      setisLoding(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading&&<MoviesList movies={movies} />}
        {isLoading&&<p>is loading</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
