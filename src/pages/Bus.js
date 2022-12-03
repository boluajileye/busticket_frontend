import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import instance from '../api/Api_instance';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
// import Skeleton from "react-loading-skeleton";
/* eslint eqeqeq: 0 */

const Bus = () => {
  const navigate = useNavigate()
    useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user == null) {
        navigate("/login")
    }
    if (user.role == 1) {
      navigate("/home");
      } 
    });
  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [licensePlate, setLicensePlate] = useState("")
  const [driverName, setDriverName] = useState("")
  const [busCapacity, setBusCapacity] = useState("")
  const [alert, setAlert] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [bus, setBus] = useState([]);
  const [refresh, setRefresh] = useState(false);
  // const [displayAlert, setDisplayAlert] = useState(true);


  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = JSON.stringify({
      "companyName": companyName,
      "licensePlate": licensePlate,
      "driverName": driverName,
      "busCapacity": busCapacity
    });
    console.log(data);
    await instance({
      url: "bus-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    }).then((res) => {
      console.log(res);
      setAlert(res.data.message)
      setRefresh(true);
      setBusCapacity('');
      setCompanyName('');
      setDriverName('');
      setLicensePlate('')
    });

  }


  const getBus = async () => {
    await instance({
      url: `bus?page=${currentPage}`,
      method: "GET",
    }).then((res) => {
      setBus(res.data.bus.data);
      setPage(res.data.bus);
      // console.log(res.data.bus);
    });

  };

  useEffect(() => {
    getBus();
    // eslint-disable-next-line
  }, [refresh]);

  const mappedBus = bus.map((bus, index) => {
    return (
      <tr key={bus.id}>
        <td className='bg-white text-black'>{index + 1}</td>
        <td className='text-capitalize'>{bus.companyName}</td>
        <td className='uppercase'>{bus.licensePlate}</td>
        <td>{bus.driverName}</td>
        <td>{bus.busCapacity}</td>
      </tr>
    );
  });

  function pagination(index) {
    setCurrentPage(index)
    getBus();
  };

  return (
    <>
      <NavBar />
      <div className='w-100'>
        <div className='container py-5'>
          {alert ?
            <Alert className='col-sm' key="success" variant="success" onClose={() => setShow(false)} transition dismissible>
              {alert}
            </Alert>
            : <div></div>}
          <div className='mb-3'>

            <h3 className="card-header d-flex justify-content-between align-items-center text-white">
              Bus List

              <button type="button" className="btn btn-sm btn-secondary px-3 py-2" onClick={handleShow}>Add Bus</button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className='very-dark  text-white'>
                  <Modal.Title>Add Bus</Modal.Title>
                </Modal.Header>
                <Modal.Body className='very-dark'>
                  <form className='very-dark text-white' onSubmit={handleSubmit}>
                    <div className="form-group col-md-6 mb-2">
                      <label>Company Name</label>
                      <input type="text" className="form-control bg-dark text-white" id="" name='companyName' value={companyName}
                        onChange={e => setCompanyName(e.target.value)} />
                    </div>
                    <div className="form-group col-md-6 mb-2">
                      <label>License Plate</label>
                      <input type="text" className="form-control bg-dark text-white" placeholder="ABC-123-DE" name='licensePlate' value={licensePlate}
                        onChange={e => setLicensePlate(e.target.value)} />
                    </div>
                    <div className="form-group col-md-6 mb-2">
                      <label>Driver Name</label>
                      <input type="text" className="form-control bg-dark text-white" id="" name='driverName' value={driverName}
                        onChange={e => setDriverName(e.target.value)} />
                    </div>
                    <div className="form-group col-md-6 mb-2">
                      <label>Bus Capacity</label>
                      <input type="number" className="form-control bg-dark text-white" id="" name='busCapacity' value={busCapacity}
                        onChange={e => setBusCapacity(e.target.value)} />
                    </div>
                    <button onClick={handleClose} type="submit" className="btn btn-secondary">Add Bus</button>
                  </form>
                </Modal.Body>
              </Modal>
            </h3>
          </div>
          <Table responsive striped bordered hover variant="dark">
            <thead>
              <tr>
                <th className='bg-white text-black'>S/N</th>
                <th className='bg-white text-black'>Company Name</th>
                <th className='bg-white text-black'>License Plate</th>
                <th className='bg-white text-black'>Driver Name</th>
                <th className='bg-white text-black'>Bus Capacity</th>
              </tr>
            </thead>
            <tbody>
              {mappedBus}
            </tbody>
          </Table>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              {[...Array.from(Array(page.last_page).keys())].map((num, index) => <li className={`page-item ${currentPage == index + 1 ? "active" : ""}`} key={index}><button onClick={() => { pagination(index + 1); }} className="page-link">{index + 1}</button></li>)}
            </ul>
            <h5 className='text-center text-white'>showing range {page.from} - {page.to} of {page.total}</h5>
          </nav>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Bus