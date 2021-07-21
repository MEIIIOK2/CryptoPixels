import React from 'react';
import Row from './Row';
import '../visuals/Panel.css'
import Pixel from './Pixel';
const colorslist = ['#FFFFFF','#000000','#ff0221', '#ff4800', '#fccb00', '#4caf50', '#03a9f4', '#5300eb']
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
        
        return colorslist[value];
    }
    clearField(){
        this.state.rows.length=0;
        this.state.pixels.length=0;
        
    }
    
    updateRows(){
        this.clearField();
        
        
        
        for (let j = 0; j < this.props.data.length; j++) {
            this.state.pixels.push(<Pixel key={j} numbr={j} col={this.calculateColor(this.props.data[j]) } updatePixel={this.props.updatePixel} />)
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