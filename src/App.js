import React,{useEffect, useState,useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import Form from './components/Form';

function App() {
  const [movies,setMovies]=useState([])
  const [isLoading,setisLoding]=useState(false);
  const [error,setError]=useState(null);
  const [isclose,setisclose]=useState(false);
  const FetchHandler=useCallback(async()=>{
    setisLoding(true);
    setError(null);
    setisclose(false)
    try{
      const response= await fetch('https://add-movies-c908f-default-rtdb.firebaseio.com/movies.json')
    
       
      if(!response.ok){
        throw new Error('Somthing went wrong ...Retrying')
      }
      const data=await response.json();
      const loadedmovies=[];
      for(const key in data){
        loadedmovies.push({
          id:key,
          title:data[key].title,
          openingText:data[key].openingText,
          releaseDate:data[key].releaseDate
        });
      }
      setMovies(loadedmovies); 
    }
    catch(error){
      setError(error.message)
    }
    setisLoding(false);
    
  },[])
  useEffect(()=>{
    FetchHandler();
  },
  [FetchHandler]

  );
  const TimeHandler=()=>{
    setError(null);
    setisclose(true);
  }
  async function fetchmovieHandler(movie){
    const response=await fetch('https://add-movies-c908f-default-rtdb.firebaseio.com/movies.json',{
      method:'POST',
      body:JSON.stringify(movie),
      headers:{
        'Content-type':'application/json'
      }
    })
    const data=await response.json();
   
  }

  async function deleteItemHandler(goalId){
    setMovies(prevGoals => {
      const updatedGoals = prevGoals.filter(goal => goal.id !== goalId);
      return updatedGoals;
  }); 
  };
 
  return (
    <React.Fragment>
      <section>
        <Form onAddMovie={fetchmovieHandler}/>
      </section>
      <section>
        <button onClick={FetchHandler}>Fetch Movies</button>
        <button onClick={TimeHandler}>Cancel</button>
      </section>
      <section>
        {!isLoading&&<MoviesList movies={movies} onDeleteItem={deleteItemHandler}/>}
        {!isLoading&&error&&<p>{error}</p>}
        {isclose&&<p>somthing went wrong</p>}
        {isLoading&&<p>is loading</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
