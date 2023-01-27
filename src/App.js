import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovies]=useState([])
  const [isLoading,setisLoding]=useState(false);
  const [error,setError]=useState(null);
  const [isclose,setisclose]=useState(false);
  async function FetchHandler(){
    setisLoding(true);
    setError(null);
    setisclose(false)
    try{
      const response= await fetch('https://swapi.dev/api/film/')
    
       
      if(!response.ok){
        throw new Error('Somthing went wrong ...Retrying')
      }
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
    catch(error){
      setError(error.message)
    }
    setisLoding(false);
    
  }
  const TimeHandler=()=>{
    setError(null);
    setisclose(true);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchHandler}>Fetch Movies</button>
        <button onClick={TimeHandler}>Cancel</button>
      </section>
      <section>
        {!isLoading&&<MoviesList movies={movies} />}
        {!isLoading&&error&&<p>{error}</p>}
        {isclose&&<p>somthing went wrong</p>}
        {isLoading&&<p>is loading</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
