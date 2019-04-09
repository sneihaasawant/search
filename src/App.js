import React from 'react';
import ReactHtmlParser from "react-html-parser";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      inputText : "",
      outputText: ""
    };
    this.handleSearch = this.handleSearch.bind(this);
    Array.prototype.compare = function (array){
      return JSON.stringify(this) === JSON.stringify(array)
    };
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
    words[i] = addedWord;
    this.setState({words});
  }
  /*
* Taking input from text box as user .enters data.
*/
  handleTextChange(e) {
    this.setState({inputText : e.target.value});
  }
  
  
  
  /*
  * This function searches words ar per input given by user
  */
  handleSearch(event) {
    const { inputText, words } = this.state;
    let textToMatch = inputText.split(" ");
    
    let searchedWordsArray = words.map((word) => word.toLowerCase());
    
    for (let i=0; i <= searchedWordsArray.length-1; i++){
      for (let j=0;  j <= textToMatch.length-1; j++ ){
          let parkArray = searchedWordsArray[i].split(" ");
          let subInputTextArray = textToMatch.slice(j, j+parkArray.length);
          if(parkArray.compare(subInputTextArray)){
            for (let k=0; k <=parkArray.length-1 ; k++){
                textToMatch[j+k] = `<Strong>${textToMatch[j+k]}</Strong>`
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
          <h2>Input:</h2><p>{inputText}</p>
          < AddInputTextForm inputTextValue={this.state.inputText} khivi={this.handleTextChange.bind(this)}/>
          <h2>Words To Find</h2>
          <form onSubmit={this.handleSearch}>
            <AddInputForm words={this.state.words} khivi={this.handleChange.bind(this)} />
            <input className="appButton" type='button' value='Add New Word' onClick={this.addClick.bind(this)}/>
            <input className="appButton" type="submit" value="Search" />
          </form>
          <h2>Output:</h2><p>{ReactHtmlParser(outputText)}</p>
        </div>
    );
  }
}

export default App;

/*
* This form provides Text Input element
*/

export const AddInputForm = ({ words, khivi }) => {
  return (
      words.map((value, index) => (
          <div key={index}>
            <input className="appInput" placeholder="Enter a Word" name="word" value={value} onChange={khivi.bind(this, index)} required/>
          </div>
      ))
  )
};

export const AddInputTextForm = ({ inputTextValue , khivi}) => {
  return  <input className="appInput" placeholder="Enter a text" name="textinput" value={inputTextValue} onChange={khivi.bind(this)} required/>
};
