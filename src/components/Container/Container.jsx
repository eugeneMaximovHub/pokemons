import React from 'react';
import Header from './Header';
import Categories from './Categories';
import SelectItems from './SelectItems';
import View from "./View";

const Container = ({pokemonsList}) => {

let arrayForSelectItems = pokemonsList;


const [myState, setMyState] = React.useState();

  return (
    <div className="container">
      <Header />
      <div className="wrapper">
        <Categories className = "categories"  />
        <SelectItems  pokemonsList = {arrayForSelectItems} deepState ={setMyState}  />
        <View myState = {myState} pokiDescription = {arrayForSelectItems[myState-1]}/>
      </div>
    </div>
  );
};

export default Container;
