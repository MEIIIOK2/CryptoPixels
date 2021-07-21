import React,{ Component } from 'react';
// import Web3 from 'web3';
// const w3 = new Web3(window.ethereum);
class ConnectMetamask extends Component{

    async checkMetamask(){
        var accounts;
        if(this.props.web3){
            accounts = await this.props.web3.eth.getAccounts();
        }
        else{
            accounts=[];
        }
        
        
        if(!accounts.length>0){
            this.setState({text:'Connect Metamask!!!'})
        }
        else{
            this.setState({text:'Connected'})
            
        }
    }
    async componentDidMount(){
        await this.checkMetamask()
    }
    constructor(props){
        super(props)
        this.state={
            text:'Connect Metamask',
        }

        
    }

    render(){
        return(
            <button className='connect' onClick={()=>getAccount().then(()=> this.checkMetamask())}>{this.state.text}</button>
        );
    }
}
async function getAccount(){
    if(window.ethereum){
        await window.ethereum.request({method:'eth_requestAccounts'});
        
    }
    
  }
export default ConnectMetamask;