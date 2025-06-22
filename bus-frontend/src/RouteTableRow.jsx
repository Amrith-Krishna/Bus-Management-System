import React,{Component} from 'react'
import { Button } from 'react-bootstrap'
import './Student.css'
import View from './View';
import Remove from './Remove';

class RouteTableRow extends React.Component{
    constructor(props){
        super(props);
        this.state={
            num: this.props.num,
            route: this.props.route,
            driver: this.props.driver,
            link: this.props.link,
            busnum: this.props.busnum,
            status: "",
            statuscol: "",
            color: "white",
            admin: this.props.admin,
            valid: this.props.valid
        };
        if(this.props.status==0){
            this.state.status="SEATS EMPTY";
            this.state.statuscol="lightgreen";
        }
        else if(this.props.status==1){
            this.state.status="FULL";
            this.state.statuscol="red";
        }
        else{
            this.state.status="UNKNOWN";
            this.state.statuscol="gray";
            this.state.color="gray";
        }
    }
    render(){
        if(!this.state.valid){console.log("invalid");return(<tr></tr>);}
        return(
            <tr style={{color: this.state.color}} id={this.state.num}>
                <td>{this.state.num}</td>
                <td>{this.state.route}</td>
                <td>{this.state.driver}</td>
                <td>{this.state.busnum}</td>
                <td style={{color: this.state.statuscol}}>{this.state.status}</td>
                <td>
                    <View route={this.state.route} driver={this.state.driver} busnum={this.state.busnum}></View>
                    <div id='pad'></div>
                    {this.state.admin==0 &&
                    <Button href='registration.html' variant='success'>
                        Register
                    </Button>}
                    {this.state.admin==1 && <Remove route={this.state.route} busnum={this.state.busnum} driver={this.state.driver} num={this.state.num}/>}
                    </td>
            </tr>
        )
    }
}

export default RouteTableRow;