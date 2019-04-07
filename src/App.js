import React from 'react';
import ReactHtmlParser from "react-html-parser";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      inputText : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      outputText: ""
    };
    this.handleSearch = this.handleSearch.bind(this);
  }
  
  /*
   * This function will add words into the existing list
   */
  addClick(){
    this.setState(prevState => ({
      words: [...prevState.words, ""]
    }))
  }
  
  /*
  * Taking input from text box as user .enters data.
  */
  handleChange(i, e) {
    const { words } = this.state;
    let addedWord = e.target.value;
    words[i] = {
      ...words[i],
      addedWord};
    this.setState({words});
  }
  
  /*
  * This function searches words ar per input given by user
  */
  handleSearch(event) {
    const { inputText, words } = this.state;
    let textToMatch = inputText.split(" ");
    let searchedWordsArray = [];

    words.map((word) => {searchedWordsArray.push(word.addedWord.toLowerCase()); return null});

  // looping though list of searched words
    for (let i=0; i<= searchedWordsArray.length-1 ; i++){
      // looping though given input text/paragraph
      for (let j=0;  j<= textToMatch.length-1; j++ ){
        // Check weather the user provided a single string or list of strings
        if(searchedWordsArray[i].split(" ").length === 1 ){
          // Converting string to lowercase and removing punctuations
          // Check if match found for searched word
          if(searchedWordsArray[i] === textToMatch[j].toLowerCase() || searchedWordsArray[i] === textToMatch[j].toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")){
            // If both words are identical , replace all the words with bold element
            textToMatch[j] =  `<Strong>${textToMatch[j]}</Strong>`
          }
        }else {
          // If user searched for group of strings , adding it to parkArray
          let parkArray = searchedWordsArray[i].split(" ");
          // Slicing original input array from searched word till its length
          let subInputTextArray = textToMatch.slice(j, j+parkArray.length);
          // Converting string to lowercase and removing punctuations in subInputTextArray
          for(let m=0;m<=subInputTextArray.length-1 ; m++){
            subInputTextArray[m] = subInputTextArray[m].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
            subInputTextArray[m] = subInputTextArray[m].toLowerCase();
          }
          // check if both array are identical
          if(JSON.stringify(parkArray) === JSON.stringify(subInputTextArray)){
            // If both arrays are identical , replace all the words with bold element
            for(let k=0; k <=parkArray.length-1 ; k++){
              if(parkArray[k] === textToMatch[j+k].toLowerCase() || parkArray[k] === textToMatch[j+k].toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") ){
                textToMatch[j+k] =  `<Strong>${textToMatch[j+k]}</Strong>`
              }
            }
          }
      }
    }
    this.setState({outputText: textToMatch.join(' ')})
  }

    event.preventDefault();
  }

  render() {
    const { inputText, outputText } =  this.state;

     return (
        <div>
          <p>Input:</p><p>{inputText}</p>
          <form onSubmit={this.handleSearch}>
            <AddInputForm words={this.state.words} handleChange={this.handleChange.bind(this)}/>
            <input type='button' value='Add word' onClick={this.addClick.bind(this)}/>
            <input type="submit" value="Search" />
          </form>
          <p>Output:</p><p>{ReactHtmlParser(outputText)}</p>
        </div>
    );
  }
}

export default App;

/*
* This form provides Text Input element
*/

export const AddInputForm = ({ words, handleChange }) => {
  return (
      words.map((value, index) => (
          <div key={index}>
            <input placeholder="Enter a Word" name="word" value={value.addedWord} onChange={handleChange.bind(this, index)} required/>
          </div>
      ))
  )
};