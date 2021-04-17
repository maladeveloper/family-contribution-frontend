import {Table} from "./Table";



import React from 'react';

class DisplayTable extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            users:null
        }

    }

    render(){
        return(
            <>
  
                <div>
                
                    <Table  submissionStatus={true} headers={this.props.headers} rowData ={this.props.rowData} haveDeleteOption={true} /> 

                </div>

            </>
        )
    }
}


export default DisplayTable;