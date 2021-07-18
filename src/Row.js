import React from 'react';
import Pixel from './Pixel';
class Row extends React.Component{

    constructor(props){
        super(props)
        this.state={
            pixels:[],
        }

        
    }
    
    render(){
        
        return(
            <div className='row'>
                {this.props.pix}
            </div>
            
        );
    }
}
export default Row;