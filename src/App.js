import React, { Component } from 'react';
import logo from './logo_nn.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


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
		"payable": false,
		"stateMutability": "nonpayable",
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
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "kill",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
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
		"inputs": [],
		"name": "getAccountList",
		"outputs": [
			{
				"name": "_nameList",
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
		"payable": false,
		"stateMutability": "nonpayable",
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
		"payable": false,
		"stateMutability": "nonpayable",
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
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "kill",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
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
      ContractInstance: MyContract.at('0x56abec0abd2f3fb30ba64ec50c10c14442b7b90d'),
      ToubanContractInstance: ToubanContract.at('0xa1efe9f48b2725053e8be92cbbd5eb11dfc18cda')
    }

    // Account Smart Contract
    this.queryResetAccount           = this.queryResetAccount.bind(this);
    this.queryGetAccountCount        = this.queryGetAccountCount.bind(this);
    this.queryGetAccountList         = this.queryGetAccountList.bind(this);
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
      alert('全てアカウントがリセットされました。');
      console.log('All accounts have been reset');
    })
  }

  queryGetAccountCount () {
    const { getAccountCount } = this.state.ContractInstance;

    getAccountCount ((err, _count) => {
      if (err) console.error('An error occured:::', err);
      alert('現在のアカウントの数: ' + _count.toNumber());
      console.log('This is our account count:::', _count.toNumber());
    })
  }

  queryGetAccountList () {
    const { getAccountList } = this.state.ContractInstance;

    getAccountList ((err, result) => {
      if (err) console.error('An error occured:::', err);
      var list_name = result.split(",");
      var list;
      for (var i = 0; i < list_name.length; i++) {
        list += (i + 1) + " : " + list_name[i] + "\n";
      }
      alert('アカウントリスト: \n"' + list);
    })
  }

  handleGetAccountNameSubmit (event) {
    event.preventDefault ();

    const { getAccountName } = this.state.ContractInstance;
    const { searchAccountId: _id } = this.state;

    getAccountName (
      _id, (err, result) => {
        alert('アカウントの名前: ' + result);
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
      }, (err, _accountId) => {
        alert('新規アカウントが作成されました。');
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
      }, (err, result) => {
        alert('アカウント名が変更されました。');
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
      }, (err, result) => {
        alert('新規当番を作成されました。');
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
      }, (err, result) => {
        console.log ('Rota is being added.');
      }
    )
  }

  queryGetRotaCount () {
    const { getRotaCount } = this.state.ToubanContractInstance;

    getRotaCount ((err, _count) => {
      if (err) console.error('An error occured:::', err);
      console.log('This is our Rota count:::', _count.toNumber());
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
      }, (err, result) => {
        console.log ('Our members are:::', result);
      }
    )
  }

  handleCompletionSubmit (event) {
    event.preventDefault ();

    const { completion } 　　　　　= this.state.ToubanContractInstance;
    const { compToubanId: _toubanId } = this.state;

    completion (
      _toubanId,
      {
        gas: 300000,
      }, (err, result) => {
        alert('当番お疲れ様です。当番の詳細情報をご確認よろしくお願いいたいます。');
        console.log ('Next Account will be:::', result);
      }
    )
  }

  handleGetDetailSubmit (event) {
    event.preventDefault ();

    const { getDetail } 　　　　　　= this.state.ToubanContractInstance;
    const { detailToubanId: _toubanId } = this.state;

    getDetail (
      _toubanId,
      '0x56abec0abd2f3fb30ba64ec50c10c14442b7b90d',
      (err, result) => {
        var duty_title           = result[0];
        var duty_desc            = result[1];
        var current_account_id   = result[2].toNumber();
        var next_account         = result[3].toNumber();
        var prev_account         = result[4].toNumber();
        var compTimestamp        = result[5].toNumber();
        var current_account_name = result[8];
        var member_ids = "";

        var date = new Date(compTimestamp*1000);

        for (var i = 0; i < result[7].length; i++) {
          member_ids += result[7][i] + ",";
        }
        member_ids = member_ids.slice(0, -1);

        var message = "当番の詳細情報は以下となります \n" +
        "当番タイトル:  " + duty_title + "\n" +
        "当番説明:  " + duty_desc + "\n" +
        "現在のアカウントID:  " + current_account_id + "\n" +
        "現在の担当者名:  " + current_account_name + "\n" +
        "次のアカウントID:  " + next_account + "\n" +
        "前のアカウントID:  " + prev_account + "\n" +
        "完了時刻:  " + date + "\n" +
        "参加するメンバのアカウントID: " + member_ids + "\n";
        alert(message);
      }
    )
  }

  render() {
    return (
      <div className="App">
        <div class="container-background">
          <div class="container-fluid p-3 mb-2 text-dark">
            <div class="app-header">
              <br />
              <br />
              <br />
              <br />
              <img src={logo} className="App-logo" alt="logo"/>
              <br />
              <br />
              <h1 className="App-title">Duty Chain System</h1>
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
            <div class="p-3 mb-2 bg-white text-dark">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <span class="glyphicon glyphicon-user"></span>
                  <h1 className="App-title">アカウント管理</h1>
                </div>
                <div class="panel-body">
                  <br />
                  <form onSubmit={ this.handleContractAccountSubmit }>
                    <input
                      type="text"
                      name="create_account"
                      size="40"
                      placeholder="新規アカウント使用者名を入力してください"
                      value ={ this.state.newAccount }
                      onChange={ event => this.setState ({ newAccount: event.target.value }) } />
                    <button type="submit" class="btn btn-outline-success"> 新規アカウント作成 </button>
                  </form>
                  <br />
                  <form onSubmit={ this.handleGetAccountNameSubmit }>
                    <input
                      type="text"
                      name="get_account"
                      size="40"
                      placeholder="検索したいアカウントIDを入力してください"
                      value ={ this.state.searchAccountId }
                      onChange={ event => this.setState ({ searchAccountId: event.target.value }) } />
                    <button class="btn btn-outline-warning" type="submit"> 検索する </button>
                  </form>
                  <br />
                  <form onSubmit={ this.handleEditAccountSubmit }>
                    <input
                      type="text"
                      name="edit_account_id"
                      placeholder="アカウントID"
                      value ={ this.state.accountId }
                      onChange={ event => this.setState ({ accountId: event.target.value }) } />
                    <input
                      type="text"
                      name="edit_account_name"
                      size="40"
                      placeholder="新規名前を入力してください"
                      value ={ this.state.accountName }
                      onChange={ event => this.setState ({ accountName: event.target.value }) } />
                    <button class="btn btn-outline-primary" type="submit"> 名前変更 </button>
                  </form>
                  <br />
                  <br />
                  <button class="btn btn-danger" onClick={ this.queryResetAccount }> アカウントリセット </button>
                  <button class="btn btn-primary" onClick={ this.queryGetAccountCount }> アカウントの数 </button>
                  <button class="btn btn-info" onClick={ this.queryGetAccountList }> アカウントのリスト </button>
                  <br />
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div class="panel-heading">
                  <span class="glyphicon glyphicon-user"></span>
                  <h1 className="App-title">当番管理</h1>
                </div>
                <div class="panel-body">
                  <form onSubmit={ this.handleCreateToubanSubmit }>
                    <input
                      type="text"
                      name="create_duty_owner_id"
                      placeholder="アカウントID"
                      value ={ this.state.ownerId }
                      onChange={ event => this.setState ({ ownerId: event.target.value }) } />
                    <input
                      type="text"
                      name="create_duty_title"
                      placeholder="当番のタイトル"
                      value ={ this.state.title }
                      onChange={ event => this.setState ({ title: event.target.value }) } />
                    <input
                      type="text"
                      name="create_duty_desc"
                      size="30"
                      placeholder="当番の説明を入力してください"
                      value ={ this.state.desc }
                      onChange={ event => this.setState ({ desc: event.target.value }) } />
                    <button class="btn btn-outline-success"　type="submit"> 新規当番の作成 </button>
                  </form>
                  <br />
                  <form onSubmit={ this.handleAddRotaSubmit }>
                    <input
                      type="text"
                      name="add_rota_duty_id"
                      placeholder="当番ID"
                      value ={ this.state.toubanId }
                      onChange={ event => this.setState ({ toubanId: event.target.value }) } />
                    <input
                      type="text"
                      name="add_rota_id"
                      size="40"
                      placeholder="当番に追加するアカウントIDを入力してください"
                      value ={ this.state.rotaId }
                      onChange={ event => this.setState ({ rotaId: event.target.value }) } />
                    <button class="btn btn-outline-warning"　type="submit"> ローテーションに追加 </button>
                  </form>
                  <br />
                  <form onSubmit={ this.handleCompletionSubmit }>
                    <input
                      type="text"
                      name="completion_dudy_id"
                      size="30"
                      placeholder="当番IDを入力してください"
                      value ={ this.state.compToubanId }
                      onChange={ event => this.setState ({ compToubanId: event.target.value }) } />
                    <button class="btn btn-success" type="submit"> 次に回す </button>
                  </form>
                  <br />
                  <form onSubmit={ this.handleGetDetailSubmit }>
                    <input
                      type="text"
                      name="getdetail_duty_id"
                      size="30"
                      placeholder="当番IDを入力してください"
                      value ={ this.state.detailToubanId }
                      onChange={ event => this.setState ({ detailToubanId: event.target.value }) } />
                    <button　class="btn btn-outline-warning" type="submit"> 当番の詳細 </button>
                  </form>

                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
              </div>
            </div>

      </div>
      </div>
      </div>
    );
  }
}

export default App;
