import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import instance from '../api/Api_instance';

const Bus = () => {
    const [bus, setBus] = useState([]);
    const getBus = async () => {
        await instance({
            url: "bus/",
            method: "GET",
          }).then((res) => {
            
            setBus(res.data.bus);
            console.log(res.data.bus);
          });
        
      };
      
      useEffect(() => {
        getBus();
      }, []);

      const mappedBus = bus.map((bus, index) =>{
        return (
            <tr key={bus.id}>
                <td>{index+1}</td>
                <td className='text-capitalize'>{bus.companyName}</td>
                <td className='uppercase'>{bus.licensePlate}</td>
                <td>{bus.driverName}</td>
                <td>{bus.busCapacity}</td>
            </tr>
        );
      });
  return (
    <div className='container py-5'>
    <Table striped bordered hover variant="dark">
        <thead>
            <tr>
                <th>S/N</th>
                <th>Company Name</th>
                <th>License Plate</th>
                <th>Driver Name</th>
                <th>Bus Capacity</th>
            </tr>
        </thead>
        <tbody>
            {mappedBus}
        </tbody>
    </Table>
</div>
  )
}

export default Bus