import React from 'react'
import RouteTableRow from './RouteTableRow'
import './Student.css'
import {arr} from './Arr.js'
import 'bootstrap/dist/css/bootstrap.min.css';


function Student() {
  return(
    <div>
    <h1 className='heading'>STUDENT BUS REGISTRATION</h1>
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
        {arr.sort(function(a,b){return(1000000*(a.status-b.status)+a.routenum-b.routenum)}).map((x)=><RouteTableRow num={x.num} route={x.route} driver={x.driver} busnum={x.busnum} status={x.status} key={x.num}admin={0} valid={x.active}/>)}
      </tbody>
    </table>
    </div>
  )
}

export default Student;
