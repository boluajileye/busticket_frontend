import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import instance from '../api/Api_instance';

const ScheduleList = () => {
    const [busSchedule, setBusSchedule] = useState([]);
    const getBusSchedule = async () => {
        await instance({
            url: "busschedule/",
            method: "GET",
          }).then((res) => {
            
            setBusSchedule(res.data.busschedule);
            console.log(res.data.busschedule);
          });
        
      };
      
      useEffect(() => {
        getBusSchedule();
      }, []);

      const mappedBusSchedule = busSchedule.map((busSchedule, index) =>{
        return (
            <tr key={busSchedule.id}>
                <td>{index+1}</td>
                <td>{busSchedule.take_off}</td>
                <td>{busSchedule.destination}</td>
                <td>{busSchedule.take_off_time}</td>
                <td>{busSchedule.drop_off_time}</td>
                <td>{busSchedule.ticket_price}</td>
                <td className='text-capitalize'>{busSchedule.bus.companyName}</td>
                <td className='uppercase'>{busSchedule.bus.licensePlate}</td>
                <td>{busSchedule.bus.driverName}</td>
                <td>{busSchedule.bus.busCapacity}</td>
            </tr>
        );
      });
  return (
    <div className='container py-5'>
    <Table responsive striped bordered hover variant="dark">
        <thead>
            <tr>
                <th>S/N</th>
                <th>Take Off</th>
                <th>Destination</th>
                <th>Take Off Time</th>
                <th>Drop Off Time</th>   
                <th>Ticket Price</th>                
                <th>Company Name</th>
                <th>License Plate</th>
                <th>Driver Name</th>
                <th>Bus Capacity</th>
            </tr>
        </thead>
        <tbody>
            {mappedBusSchedule}
        </tbody>
    </Table>
</div>
  )
}

export default ScheduleList