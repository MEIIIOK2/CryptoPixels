import Web3 from 'web3';
import React,{ Component } from 'react';
import '../visuals/App.css'
import mycontract from '../contracts/SimpleStorage.json'
import Panel from './Panel';
import ConnectMetamask from './ConnectMetamask';
import Selector from './Selector';

var w3;
var contract;
if(window.ethereum){
  w3 =new Web3(window.ethereum);
  contract = new w3.eth.Contract(mycontract,'0x9b16E90cbA40f471C920B9950fDC8DFc44524364');

}



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
    if(w3){
      let accounts = await w3.eth.getAccounts();
    
    if (accounts.length>0){
      this.setState({account:accounts[0]});
      let block= await w3.eth.getBlockNumber();
      let bnb = await w3.eth.getBalance(this.state.account);
      this.setState({balance:w3.utils.fromWei(bnb,'ether')});
      this.setState({blocknum:block});
      this.setState({time:Date().toLocaleString()})
      let leng = await contract.methods.getLen().call()
      let numofchunks = 0;
      
      if(leng%1000 === 0){
        numofchunks = leng/1000;
        
      }
      else{
        numofchunks = Math.round(leng/1000)+1;
      }
      
      let chunkydata=[]
      // var t0 = performance.now()
      for(let i =0;i<numofchunks;i++){
        let chunk = await contract.methods.getChunk(i).call()
        
        chunkydata = chunkydata.concat(chunk);
      }
      // var t1 = performance.now()
      // console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
      
      // let data =["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0",]
      this.setState({recdata:chunkydata});
      // this.setState(
      //   {recdata:data,
      //   blocknum:block,
      //   balance:w3.utils.fromWei(bnb,'ether'),
      //   account:accounts[0]});
    }
    else{
      //Getaccount()
    }
    }
    
    
    
  }

  updateSelectedPixel = (value) =>{
    this.setState({seletcedpixel:value})
  }
  constructor(props) {
    super(props)
    this.state= {
      blocknum:'-',
      balance:'-',
      account:'-',
      time:'-',
      recdata:[],
      seletcedpixel:0,
    }
    
  }
  
  render(){
    
  return (
    
    <div className='App-header'>
      <ConnectMetamask web3={w3}/>
      <div className = 'Toolbar'>
        
        <Selector currpixel={this.state.seletcedpixel} contract={contract} account={this.state.account}/>
        
      </div>
      
      <Panel
          width={10}
          height={10}
          data={this.state.recdata}
          updatePixel={this.updateSelectedPixel} />
          

    </div>
  );
  
}

}

// async function Getaccount(){
//   await window.ethereum.request({method:'eth_requestAccounts'});
// }
// async function Deposit(){
//   var send = contract.methods.deposit().send({from:'0x16F21cCfdfc02ABEb779daf0F415656494386fB3',value:20000000000000000})
// }
// async function GetBack(){
//   var res = contract.methods.send('0x16F21cCfdfc02ABEb779daf0F415656494386fB3',20000000000000000).call()
// }
export default App;

