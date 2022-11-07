import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import instance from '../api/Api_instance';

const Home = () => {
    const [busTicket, setBusTicket] = useState([]);
    const getData = async () => {
        await instance({
            url: "busticket/",
            method: "GET",
          }).then((res) => {
            
            setBusTicket(res.data.busticket);
            console.log(res.data.busticket);
          });
        
      };
      
      useEffect(() => {
        getData();
      }, []);
      const mappedBusTicket = busTicket.map((busTicket, index) =>{
        return (
            <tr key={busTicket.id}>
                <td>{index+1}</td>
                <td>{busTicket.user.name}</td>
                <td>{busTicket.user.email}</td>
                <td>{busTicket.bus_schedule.take_off}</td>
                <td>{busTicket.bus_schedule.destination}</td>
                <td>{busTicket.bus_schedule.take_off_time}</td>
                <td>{busTicket.bus_schedule.drop_off_time}</td>
                <td>{busTicket.price}</td>
                <td>{busTicket.reference}</td>
                {/* <td className='text-capitalize'>{busTicket.bus.companyName}</td>
                <td className='uppercase'>{busTicket.bus.licensePlate}</td>
                <td>{busTicket.bus.driverName}</td>
                <td>{busTicket.bus.busCapacity}</td> */}
            </tr>
        );
      });

    return (
        <div className='container py-5'>
            <Table responsive striped bordered hover variant="dark">
            <thead>
            <tr>
                <th>S/N</th>              
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Take Off</th>
                <th>Destination</th>
                <th>Take Off Time</th>
                <th>Drop Off Time</th>   
                <th>Ticket Price</th>                
                <th>Reference</th>
            </tr>
        </thead>
        <tbody>
            {mappedBusTicket}
        </tbody>
            </Table>
        </div>
    )
}

export default Home