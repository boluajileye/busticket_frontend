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
    const mappedBusTicket = busTicket.map((busTicket, index) => {
        return (
            <tr key={busTicket.id}>
                <td>{index + 1}</td>
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
            <div className='mb-3'>
                <h3 className="card-header d-flex justify-content-between align-items-center text-white">
                    Bus Ticket List
                </h3>
            </div>
            <Table responsive striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th className='bg-white text-black'>S/N</th>
                        <th className='bg-white text-black'>Buyer Name</th>
                        <th className='bg-white text-black'>Buyer Email</th>
                        <th className='bg-white text-black'>Take Off</th>
                        <th className='bg-white text-black'>Destination</th>
                        <th className='bg-white text-black'>Take Off Time</th>
                        <th className='bg-white text-black'>Drop Off Time</th>
                        <th className='bg-white text-black'>Ticket Price</th>
                        <th className='bg-white text-black'>Reference</th>
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