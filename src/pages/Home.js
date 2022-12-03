import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import instance from '../api/Api_instance';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

/* eslint eqeqeq: 0 */

const Home = () => {
    const navigate = useNavigate()
    // useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("user"))
    // if (user == null) {
    //     navigate("/login")
    // }
    // if (user?.role === 1) {
    //     navigate("/home");
    //     } 
    // });
    // const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [page, setPage] = useState([]);
    const [busTicket, setBusTicket] = useState([]);
    const getData = async () => {
        // setLoading(true);
        await instance({
            url: `busticket?page=${currentPage}`,
            method: "GET",
        }).then((res) => {
            setBusTicket(res.data.busticket.data);
            // setLoading(false);
            setPage(res.data.busticket);
        });

    };

    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, []);
    const mappedBusTicket = busTicket.map((busTicket, index) => {
        return (
            <tr key={busTicket.id}>
                <td className='bg-white text-black'>{index + 1}</td>
                <td>{busTicket.user.name}</td>
                <td>{busTicket.user.email}</td>
                <td>{busTicket.bus_schedule.take_off}</td>
                <td>{busTicket.bus_schedule.destination}</td>
                <td>{busTicket.bus_schedule.take_off_time}</td>
                <td>{busTicket.bus_schedule.drop_off_time}</td>
                <td>{busTicket.price}</td>
                <td>{busTicket.reference}</td>
            </tr>
        );
    });
    
    function pagination(index) {
        setCurrentPage(index)
        getData();
    };

    return (
        <>
            <NavBar />
            <div className='w-100'>
                <div className='fill container py-5'>
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
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            {[...Array.from(Array(page.last_page).keys())].map((num, index) => <li className={`page-item ${currentPage == index + 1 ? "active" : ""}`} key={index}><button onClick={() => { pagination(index + 1); }} className="page-link">{index + 1}</button></li>)}
                            {/* eslint-disable-next-line */}
                        </ul>
                        <h5 className='text-center text-white'>showing range {page.from} - {page.to} of {page.total}</h5>
                    </nav>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home