import React,{ Component } from 'react';
import '../visuals/Selector.css'

class Selector extends Component{
    Deposit(contr){
        contr.methods.setPixel(this.props.currpixel,1).send({from:this.props.account,value:100000000000000})
      }
    render(){
        
        // let get =selpix.getPix();
        // console.log(get);
        return(
            <div className = 'selector'>
                <p>{this.props.currpixel}</p>
                <button onClick={() =>this.Deposit(this.props.contract)} >Set Pixel</button>
            </div>
        );
    }
}

export default Selector;