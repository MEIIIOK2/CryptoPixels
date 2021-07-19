import React from 'react';
import '../visuals/Pixel.css'

class Pixel extends React.Component{

    constructor(props){
        super(props);
        this.state={
            color:'lightskyblue'
        }
    }
     
    
    render(){
        
        return(
            // <div className='pixel' style={{backgroundColor:this.props.col}} onClick={()=> console.log(this.props.numbr)}></div>
            <div className='pixel' style={{backgroundColor:this.props.col}} onClick={()=> {this.props.updatePixel(this.props.numbr)}}></div>
        );
    } 
}
export default Pixel;