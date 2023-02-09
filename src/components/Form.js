import React,{Fragment,useState} from 'react';
import classes from './Form.module.css';
const Form=(props)=>{
    const [title,setTitle]=useState('');
    const[open,setOpen]=useState('');
    const [date,setDate]=useState('');
    const ExecuteTitle=(event)=>{
        setTitle(event.target.value)
    }
    const ExecuteOpen=(event)=>{
        setOpen(event.target.value);
    }
    const ExecuteDate=(event)=>{
        setDate(event.target.value);
    }
    const eventHandler=(event)=>{
        event.preventDefault();
        const movie={
            title:title,
            OpeningText:open,
            releaseDate:new Date(date)
        }
        
        props.onAddMovie(movie);

    }

    return(
        <form onSubmit={eventHandler}  >
            <div className={classes['form-list']}>
                <div>
                <label style={{textAlign:'start'}}>Title</label>
                <input type='text' style={{width:'500px'}} onChange={ExecuteTitle} /><br/>
                &nbsp;
                </div>
                <div>
                <label>Opening Text</label>
                <input type='text' style={{width:'430px',height:'100px'}} onChange={ExecuteOpen} /><br/>
                &nbsp;
                </div>
                <label>Realease Date</label>
                <input type='date' style={{width:'400px'}} onChange={ExecuteDate} /><br/>
                <button type='submit'>Add Movies</button>
            </div>
        </form>
       

    )
}
export default Form;