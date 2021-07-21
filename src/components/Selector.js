import React,{ Component } from 'react';
import {GithubPicker} from 'react-color';
// import '../visuals/Selector.css'
const colorslist = ['#FFFFFF','#000000','#ff0221', '#ff4800', '#fccb00', '#4caf50', '#03a9f4', '#5300eb']
class Selector extends Component{

    

    constructor(props){
        super(props);
        this.state={
            color:0,
        }
    }

    handleChangeComplete =(_color) =>{
        this.setState({color:_color})
        
    }

    setColor(contr){
        if(this.props.account ==='-'){
            console.log("no access to metamask");
            
        }
        else{
            let colnum =0;
            
            for (let i = 0; i < colorslist.length; i++) {
                if(colorslist[i] ===this.state.color.hex){
                    colnum =i;
                }
                
            }
            
            contr.methods.setPixel(this.props.currpixel,colnum).send({from:this.props.account,value:100000000000000})
        }
        
      }
    render(){
        
        // let get =selpix.getPix();
        // console.log(get);
        return(
            <div className = 'selector'>
                <p>{this.props.currpixel}</p>
                <button onClick={() =>this.setColor(this.props.contract)} >Set Pixel</button>
                <GithubPicker triangle={'hide'}width={200} onChange={this.handleChangeComplete} colors={colorslist}/>
            </div>
        );
    }
}

export default Selector;