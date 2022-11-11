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

  const mappedBusSchedule = busSchedule.map((busSchedule, index) => {
    return (
      <tr key={busSchedule.id}>
        <td>{index + 1}</td>
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
      <div className='mb-3'>
        <h3 className="card-header d-flex justify-content-between align-items-center text-white">
          Bus Schedule List
        </h3>
      </div>
      <Table responsive striped bordered hover variant="dark">
        <thead>
          <tr>
            <th className='bg-white text-black'>S/N</th>
            <th className='bg-white text-black'>Take Off</th>
            <th className='bg-white text-black'>Destination</th>
            <th className='bg-white text-black'>Take Off Time</th>
            <th className='bg-white text-black'>Drop Off Time</th>
            <th className='bg-white text-black'>Ticket Price</th>
            <th className='bg-white text-black'>Company Name</th>
            <th className='bg-white text-black'>License Plate</th>
            <th className='bg-white text-black'>Driver Name</th>
            <th className='bg-white text-black'>Bus Capacity</th>
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