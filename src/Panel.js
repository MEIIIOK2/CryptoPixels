import React from 'react';
import Row from './Row';
import './Panel.css'
import Pixel from './Pixel';
class Panel extends React.Component{
    
    componentDidMount(){
        this.interval = setInterval(()=>this.updateRows(),1000)
      }
      componentWillUnmount(){
        clearInterval(this.interval)
      }
      
    constructor(props){
        super(props)
        this.state={
            rows:[],
            pixels:[],
        }
    }
    
    calculateColor(value){
        
        if(value==="0"){
            return "#61dafb"
        }
        if(value==="1"){
            return "#ff0000"
        }
        else{
            return"#000000"
        }
    }
    clearField(){
        this.state.rows.length=0;
        this.state.pixels.length=0;
        console.log('cleared');
    }
    
    updateRows(){
        this.clearField();
        console.log('further updating');
        
        console.log(this.props.data.length);
        for (let j = 0; j < this.props.data.length; j++) {
            this.state.pixels.push(<Pixel key={j} numbr={j} col={this.calculateColor(this.props.data[j])}/>)
        }
        for(let i =0;i<this.state.pixels.length;i+=45){
            this.state.rows.push(<Row key={i} pix={this.state.pixels.slice(i,i+45)} />);
        }
        
    }
    
    render(){
        
        return(
            <div className='panel'>
                <div className='pixels'>{this.state.rows}</div>
            </div>
        );
    }
}
export default Panel;