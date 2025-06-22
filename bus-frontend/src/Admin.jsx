import React, {Component} from 'react'
import RouteTableRow from './RouteTableRow'
import './Student.css'
import { Button } from 'react-bootstrap'

class Admin extends React.Component {
    constructor(props){
        super(props);
        this.state = props.rows;
    }
    render(){
  return(
    <div>
    <h1 className='heading'>BUS REGISTRATION ADMIN PAGE</h1>
    <table className='routetable'>
      <thead>
        <tr>
          <th>Bus ID</th>
          <th>Route</th>
          <th>Driver</th>
          <th>Bus Number</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {this.state.sort(function(a,b){return(1000000*(a.status-b.status)+a.routenum-b.routenum)}).map((x)=><RouteTableRow num={x.num} route={x.route} driver={x.driver} busnum={x.busnum} status={x.status} key={x.num} admin={1} valid={x.active}/>)}
      </tbody>
    </table>
    <Button variant='success'>+ Add</Button>
    </div>
  )
}
}

export default Admin
