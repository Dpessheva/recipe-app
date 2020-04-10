import React, {useState} from 'react'
import './App.css';
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Recipe from './components/Recepi';
import Alert from './components/Alert';

export const App = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecepies] = useState([]);
  const [alert, setAlert] = useState('');

  const APP_ID = "57c344a9";
  const APP_KEY = "6df59ea51599f6fdb88aa07b2a727591";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const getData = async () => {
    if (query !== "") {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert("No food with such a name")
      } 
      setRecepies(result.data.hits);
      setAlert('');
      setQuery('');
    } else {
      setAlert("Please fill in the form")
    }
   
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  }

  const onChange = (e) => {
     const input = e.target.value;
    setQuery(input);
  }; 

  return (
    <div className="App">
      <h1 onClick={getData}>Food Searching App</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert !== "" && <Alert alert={alert}/>}
        <input
          type="text"
          placeholder="Search food"
          autoComplete="off"
          onChange={onChange}
          value={query}
        />
        <input type="submit" value="search"/>
      </form>
      <div className="recipes">
        {recipes !== [] && recipes.map(recipe => 
          <Recipe key={uuidv4()} recipe={recipe}/>
        )}
      </div>
    </div>
  )
}

export default App;