import React, { Component } from 'react';
import logo from './nn_logo.png';
import './App.css';

class App extends Component {
  constructor (props) {
    super (props);
    const MyContract = window.web3.eth.contract ([
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "createAccount",
		"outputs": [
			{
				"name": "_accountId",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			},
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "editAccount",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "resetAccount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAccountCount",
		"outputs": [
			{
				"name": "_count",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getAccountName",
		"outputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]);

    this.state = {
      ContractInstance: MyContract.at('0x021aac0ca930eb8a56d26e0228bb29bc3de89b78'),
    }
    this.queryResetAccount = this.queryResetAccount.bind(this);
    this.queryGetAccountCount = this.queryGetAccountCount.bind(this);
    this.handleGetAccountNameSubmit = this.handleGetAccountNameSubmit.bind (this);
    this.handleContractAccountSubmit = this.handleContractAccountSubmit.bind (this);
    this.handleEditAccountSubmit = this.handleEditAccountSubmit.bind (this);
  }

  queryResetAccount () {
    const { resetAccount } = this.state.ContractInstance;

    resetAccount ((err) => {
      if (err) console.error('An error occured:::', err);
      console.log('All accounts have been reset');
    })
  }

  queryGetAccountCount () {
    const { getAccountCount } = this.state.ContractInstance;

    getAccountCount ((err, _count) => {
      if (err) console.error('An error occured:::', err);
      console.log('This is our account count:::', _count);
    })
  }

  handleGetAccountNameSubmit (event) {
    event.preventDefault ();

    const { getAccountName } = this.state.ContractInstance;
    const { accountId: _id } = this.state;

    getAccountName (
      _id, (err, result) => {
        console.log ('Account name is:::', result);
      }
    )
  }

  handleContractAccountSubmit (event) {
    event.preventDefault ();

    const { createAccount } = this.state.ContractInstance;
    const { newAccount: _name } = this.state;

    createAccount (
      _name,
      {
        gas: 300000,
        from: window.web3.eth.accounts[0],
        value: window.web3.toWei (0.01, 'ether')
      }, (err, result) => {
        console.log ('Smart contract account is adding.');
      }
    )
  }

  handleEditAccountSubmit (event) {
    event.preventDefault ();

    const { editAccount } = this.state.ContractInstance;
    const { accountId: _id } = this.state;
    const { accountName: _name } = this.state;

    editAccount (
      _id,
      _name,
      {
        gas: 300000,
        from: window.web3.eth.accounts[0],
        value: window.web3.toWei (0.01, 'ether')
      }, (err, result) => {
        console.log ('Smart contract account is adding.');
      }
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Toban System Prototype</h1>
        </header>
        <br />
        <br />
        <button onClick={ this.queryResetAccount }> Reset All Account </button>
        <br />
        <br />
        <br />
        <button onClick={ this.queryGetAccountCount }> Get Account Count </button>
        <br />
        <br />
        <form onSubmit={ this.handleGetAccountNameSubmit }>
          <input
            type="text"
            name="state-change"
            placeholder="Enter account id..."
            value ={ this.state.accountId }
            onChange={ event => this.setState ({ accountId: event.target.value }) } />
          <button type="submit"> Search For Account </button>
        </form>
        <br />
        <br />
        <form onSubmit={ this.handleContractAccountSubmit }>
          <input
            type="text"
            name="state-change"
            placeholder="Enter new account name..."
            value ={ this.state.newAccount }
            onChange={ event => this.setState ({ newAccount: event.target.value }) } />
          <button type="submit"> Create New Account </button>
        </form>
        <br />
        <br />
        <br />
        <br />
        <form onSubmit={ this.handleEditAccountSubmit }>
          <input
            type="text"
            name="state-change"
            placeholder="Enter accountId"
            value ={ this.state.accountId }
            onChange={ event => this.setState ({ accountId: event.target.value }) } />
          <input
            type="text"
            name="state-change"
            placeholder="Enter New Account Name"
            value ={ this.state.accountName }
            onChange={ event => this.setState ({ accountName: event.target.value }) } />
          <button type="submit"> Update Account Name </button>
        </form>
      </div>
    );
  }
}

export default App;
