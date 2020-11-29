import './App.css';
import React, {useEffect, useState} from "react";
import Recipe from './components/Recipe.js';

const App = () => {

  const APP_ID = "2fd38d51";
  const APP_KEY = "0a061e7076e4bab2cd3c05bc0b5a1c52";


  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('cake');

  useEffect(() => {
     getRecipes();  
    }, [query]
  );

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  }; 

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
        <div className="Title">
          Clarice's Cookbook
        </div>
        <form className="search-form" onSubmit={getSearch}>
          <input 
            className="search-bar" 
            type="text" 
            value={search} 
            onChange={updateSearch} 
            />
          <button  className="search-button" type="submit"> 
            Search
          </button>
        </form>
        <div className="recipe">
          {recipes.map(recipe => (
            <Recipe 
              key = {recipe.recipe.label}
              title = {recipe.recipe.label}
              image = {recipe.recipe.image}
              ingredients = {recipe.recipe.ingredients}
            />
          )
          )}
        </div>
        
       
    </div>
  );
}



export default App;
