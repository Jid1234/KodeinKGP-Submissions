import './App.css';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from './abi.json';

function App() {
  const [contract, setContract] = useState();
  const [todoCount, setTodoCount] = useState(0);
  const [inputItem, setInputItem] = useState();
  const [inputListItem, setInputListItem] = useState();
  const [inputListItemRes, setInputListItemRes] = useState();

  const contractExecution = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      const Contract = new ethers.Contract(
        "0xdb172C182785e9F038315aB0AbFF228a9e891bB2",abi,signer);
      setContract(Contract);
    } else {
      console.error("Web3 provider not found. Make sure you have MetaMask or other compatible wallet installed.");
    }
  };

  const getTodoCount = async () => {
    if (contract) {
      const res = await contract.count();
      setTodoCount(Number(res));
    }
  };

  useEffect(() => {
    contractExecution();
  }, []);

  const handleChange = (e) => {
    setInputItem(e.target.value);
  };

  const handleSubmit = async () => {
    if (contract && inputItem) {
      const res = await contract.getTodo(inputItem);
      console.log(res); 
    }
  };

  const handleGetTodoList = async () => {
    if (contract && inputListItem) {
      const res = await contract.todoList(inputListItem - 1);
      setInputListItemRes(res);
    }
  };

  const handleTodoList = (e) => {
    setInputListItem(e.target.value);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1><u><i className='blockchain'>Linking to BlockChain</i></u></h1>
        <div>
        <button onClick={getTodoCount} className = "Count">Get the Count</button> 
        </div>
      <h1>Count of todo : {todoCount}</h1>
      <div>
        <i>Enter the Input value </i>
        <input onChange={handleChange}></input>
        <h1><button onClick={handleSubmit} className='Submit'> Submit</button></h1> 
      </div>
      <div>
        <input onChange={handleTodoList}></input>
        <h1><button onClick={handleGetTodoList} className='todolist'>Get todoList</button></h1>
        <h3 className='listitem'>{inputListItemRes}</h3>
      </div>
      </header>
    </div>
  );
}

export default App;
