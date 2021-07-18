import Web3 from 'web3';
import React,{ Component } from 'react';
import './App.css'
import mycontract from './contracts/SimpleStorage.json'
import Panel from './Panel';
const w3=new Web3(window.ethereum)
var txt ='hui'

if(window.ethereum){
  txt = 'installed'
}
else{
  txt='uninstalled'
}
const contract = new w3.eth.Contract(mycontract,'0xDb4d081CE103cFdA3331D7C3092B1e6213eDb98A')

class App extends Component {

  async componentWillMount() {
    await this.getDataneeded()
  }

  componentDidMount(){
    this.interval = setInterval(()=>this.getDataneeded(),3000)
  }
  componentWillUnmount(){
    clearInterval(this.interval)
  }

  async getDataneeded(){
    console.log('updating');
    let accounts = await w3.eth.getAccounts();
    console.log(accounts);
    if (accounts.length>0){
      this.setState({account:accounts[0]});
      let block= await w3.eth.getBlockNumber();
      let bnb = await w3.eth.getBalance(this.state.account);
      this.setState({balance:w3.utils.fromWei(bnb,'ether')});
      this.setState({blocknum:block});
      this.setState({time:Date().toLocaleString()})
      let data = await contract.methods.getData().call()
      this.setState({recdata:data});
      // this.setState(
      //   {recdata:data,
      //   blocknum:block,
      //   balance:w3.utils.fromWei(bnb,'ether'),
      //   account:accounts[0]});
      
      
    }
    
    
  }
  constructor(props) {
    super(props)
    this.state= {
      blocknum:'-',
      balance:'-',
      account:'-',
      time:'-',
      recdata:[],
    }
    
  }
  
  render(){
    console.log('render call');
  return (
    
    <div className='App-header'>
      

      <Panel
          width={10}
          height={10}
          data={this.state.recdata}/>
          

    </div>
  );
  
}

}

async function Getaccount(){
  await window.ethereum.request({method:'eth_requestAccounts'});
  console.log('succesful metamask');
  
}
async function Deposit(){
  var send = contract.methods.deposit().send({from:'0x16F21cCfdfc02ABEb779daf0F415656494386fB3',value:20000000000000000})
}
async function GetBack(){
  var res = contract.methods.send('0x16F21cCfdfc02ABEb779daf0F415656494386fB3',20000000000000000).call()
}
export default App;

