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

    const ToubanContract = window.web3.eth.contract ([
	{
		"constant": false,
		"inputs": [
			{
				"name": "_toubanId",
				"type": "uint256"
			},
			{
				"name": "_Id",
				"type": "uint256"
			}
		],
		"name": "addRota",
		"outputs": [
			{
				"name": "_idCount",
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
				"name": "_toubanId",
				"type": "uint256"
			}
		],
		"name": "completion",
		"outputs": [
			{
				"name": "_nextAccountId",
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
				"name": "_ownerId",
				"type": "uint256"
			},
			{
				"name": "_title",
				"type": "string"
			},
			{
				"name": "_description",
				"type": "string"
			}
		],
		"name": "createTouban",
		"outputs": [
			{
				"name": "_toubanId",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
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
		"inputs": [
			{
				"name": "_toubanId",
				"type": "uint256"
			},
			{
				"name": "_contractAddr",
				"type": "address"
			}
		],
		"name": "getDetail",
		"outputs": [
			{
				"name": "_title",
				"type": "string"
			},
			{
				"name": "_description",
				"type": "string"
			},
			{
				"name": "_currentAccountId",
				"type": "uint256"
			},
			{
				"name": "_nextAccountId",
				"type": "uint256"
			},
			{
				"name": "_prevAccountId",
				"type": "uint256"
			},
			{
				"name": "_compTimestamp",
				"type": "uint256"
			},
			{
				"name": "_idCount",
				"type": "uint256"
			},
			{
				"name": "_ids",
				"type": "uint256[]"
			},
			{
				"name": "_currentName",
				"type": "string"
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
				"name": "_toubanId",
				"type": "uint256"
			}
		],
		"name": "getMembers",
		"outputs": [
			{
				"name": "_ids",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getRotaCount",
		"outputs": [
			{
				"name": "_count",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]);

    this.state = {
      ContractInstance: MyContract.at('0xa4efb592fe77e0e16c565d461ae02833e0c79ebe'),
      ToubanContractInstance: ToubanContract.at('0x4fae6df038fbba2c17866e62208935362a2027d0')
    }
    // Account Smart Contract
    this.queryResetAccount           = this.queryResetAccount.bind(this);
    this.queryGetAccountCount        = this.queryGetAccountCount.bind(this);
    this.handleGetAccountNameSubmit  = this.handleGetAccountNameSubmit.bind (this);
    this.handleContractAccountSubmit = this.handleContractAccountSubmit.bind (this);
    this.handleEditAccountSubmit     = this.handleEditAccountSubmit.bind (this);

    // Touban Smart Contract
    this.queryGetRotaCount        = this.queryGetRotaCount.bind(this);
    this.handleGetMembersSubmit   = this.handleGetMembersSubmit.bind (this);
    this.handleCreateToubanSubmit = this.handleCreateToubanSubmit.bind (this);
    this.handleAddRotaSubmit      = this.handleAddRotaSubmit.bind (this);
    this.handleCompletionSubmit   = this.handleCompletionSubmit.bind (this);
    this.handleGetDetailSubmit    = this.handleGetDetailSubmit.bind (this);
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

    const { createAccount }     = this.state.ContractInstance;
    const { newAccount: _name } = this.state;

    createAccount (
      _name,
      {
        gas: 300000,
        from: window.web3.eth.accounts[0],
        value: window.web3.toWei (0.01, 'ether')
      }, (err, result) => {
        console.log ('Smart contract account is being added.');
      }
    )
  }

  handleEditAccountSubmit (event) {
    event.preventDefault ();

    const { editAccount }        = this.state.ContractInstance;
    const { accountId: _id }     = this.state;
    const { accountName: _name } = this.state;

    editAccount (
      _id,
      _name,
      {
        gas: 300000,
        from: window.web3.eth.accounts[0],
        value: window.web3.toWei (0.01, 'ether')
      }, (err, result) => {
        console.log ('Smart contract account is being edited.');
      }
    )
  }

  // Touban Contract
  handleCreateToubanSubmit (event) {
    event.preventDefault ();

    const { createTouban }       = this.state.ToubanContractInstance;
    const { ownerId: _ownerId }  = this.state;
    const { title: _title }      = this.state;
    const { desc: _description } = this.state;

    createTouban (
      _ownerId,
      _title,
      _description,
      {
        gas: 300000,
        from: window.web3.eth.accounts[0],
        value: window.web3.toWei (0.01, 'ether')
      }, (err, result) => {
        console.log ('Smart contract touban is being added.');
      }
    )
  }

  handleAddRotaSubmit (event) {
    event.preventDefault ();

    const { addRota }             = this.state.ToubanContractInstance;
    const { toubanId: _toubanId } = this.state;
    const { rotaId: _Id }         = this.state;

    addRota (
      _toubanId,
      _Id,
      {
        gas: 300000,
        from: window.web3.eth.accounts[0],
        value: window.web3.toWei (0.01, 'ether')
      }, (err, result) => {
        console.log ('Rota is being added.');
      }
    )
  }

  queryGetRotaCount () {
    const { getRotaCount } = this.state.ToubanContractInstance;

    getRotaCount ((err, _count) => {
      if (err) console.error('An error occured:::', err);
      console.log('This is our Rota count:::', _count);
    })
  }

  handleGetMembersSubmit (event) {
    event.preventDefault ();

    const { getMembers }          = this.state.ToubanContractInstance;
    const { toubanId: _toubanId } = this.state;

    getMembers (
      _toubanId,
      {
        gas: 300000,
        from: window.web3.eth.accounts[0],
        value: window.web3.toWei (0.01, 'ether')
      }, (err, result) => {
        console.log ('Our members are:::', result);
      }
    )
  }

  handleCompletionSubmit (event) {
    event.preventDefault ();

    const { completion } 　　　　　= this.state.ToubanContractInstance;
    const { toubanId: _toubanId } = this.state;

    completion (
      _toubanId,
      {
        gas: 300000,
        from: window.web3.eth.accounts[0],
        value: window.web3.toWei (0.01, 'ether')
      }, (err, result) => {
        console.log ('Next Account will be:::', result);
      }
    )
  }

  handleGetDetailSubmit (event) {
    event.preventDefault ();

    const { getDetail } 　　　　　　= this.state.ToubanContractInstance;
    const { toubanId: _toubanId } = this.state;

    getDetail (
      _toubanId,
      this.state.ContractInstance,
      {
        gas: 300000,
        from: window.web3.eth.accounts[0],
        value: window.web3.toWei (0.01, 'ether')
      }, (err, result) => {
        console.log ('Next Account will be:::', result);
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
        <br />
        <br />
        <br />
        <br />
        <form onSubmit={ this.handleCreateToubanSubmit }>
          <input
            type="text"
            name="state-change"
            placeholder="Enter ownerId"
            value ={ this.state.ownerId }
            onChange={ event => this.setState ({ ownerId: event.target.value }) } />
          <input
            type="text"
            name="state-change"
            placeholder="Enter Touban's Title"
            value ={ this.state.title }
            onChange={ event => this.setState ({ title: event.target.value }) } />
          <input
            type="text"
            name="state-change"
            placeholder="Enter Touban's Description"
            value ={ this.state.desc }
            onChange={ event => this.setState ({ desc: event.target.value }) } />
          <button type="submit"> Create New Touban </button>
        </form>
        <br />
        <br />
        <form onSubmit={ this.handleAddRotaSubmit }>
          <input
            type="text"
            name="state-change"
            placeholder="Enter toubanId"
            value ={ this.state.toubanId }
            onChange={ event => this.setState ({ toubanId: event.target.value }) } />
          <input
            type="text"
            name="state-change"
            placeholder="Enter rotaId"
            value ={ this.state.rotaId }
            onChange={ event => this.setState ({ rotaId: event.target.value }) } />
          <button type="submit"> Create New Rota </button>
        </form>
        <br />
        <br />
        <button onClick={ this.queryGetRotaCount }> Get Rota Count </button>
        <br />
        <br />
        <br />
        <br />
        <form onSubmit={ this.handleCompletionSubmit }>
          <input
            type="text"
            name="state-change"
            placeholder="Enter touban id..."
            value ={ this.state.toubanId }
            onChange={ event => this.setState ({ toubanId: event.target.value }) } />
          <button className="completion-button" type="submit"> Touban Complete! </button>
        </form>
        <br />
        <br />
        <br />
        <br />
        <form onSubmit={ this.handleGetDetailSubmit }>
          <input
            type="text"
            name="state-change"
            placeholder="Enter touban id..."
            value ={ this.state.toubanId }
            onChange={ event => this.setState ({ toubanId: event.target.value }) } />
          <button type="submit"> Get Detail </button>
        </form>
        <br />
        <br />
        <form onSubmit={ this.handleGetMembersSubmit }>
          <input
            type="text"
            name="state-change"
            placeholder="Enter touban id..."
            value ={ this.state.toubanId }
            onChange={ event => this.setState ({ toubanId: event.target.value }) } />
          <button type="submit"> Get Members </button>
        </form>
        <br />
        <br />
      </div>
    );
  }
}

export default App;
