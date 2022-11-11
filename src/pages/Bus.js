import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import instance from '../api/Api_instance';
import Modal from 'react-bootstrap/Modal';

const Bus = () => {
  const [companyName, setCompanyName] = useState("");
  const [licensePlate, setLicensePlate] = useState("")
  const [driverName, setDriverName] = useState("")
  const [busCapacity, setBusCapacity] = useState("")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [bus, setBus] = useState([]);

  const handleChange = (event) => {
    setCompanyName(event.target.value);
    setLicensePlate(event.target.value);
    setDriverName(event.target.value);
    setBusCapacity(event.target.value);
   
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = JSON.stringify({
      "companyName": companyName,
      "licensePlate": licensePlate,
      "driverName": driverName,
      "busCapacity": busCapacity
    });
  console.log(data);
  // await instance({
  //   url: "bus/",
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   data: formData
  // }).then((res) => {
  //   console.log(res);
  // });
 
}


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

  const mappedBus = bus.map((bus, index) => {
    return (
      <tr key={bus.id}>
        <td>{index + 1}</td>
        <td className='text-capitalize'>{bus.companyName}</td>
        <td className='uppercase'>{bus.licensePlate}</td>
        <td>{bus.driverName}</td>
        <td>{bus.busCapacity}</td>
      </tr>
    );
  });
  return (
    <div className='container py-5'>
      <div className='mb-3'>
        <h3 className="card-header d-flex justify-content-between align-items-center text-white">
          Bus List
          <button type="button" className="btn btn-sm btn-secondary px-3 py-2"  onClick={handleShow}>Add Bus</button>
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='very-dark  text-white'>
          <Modal.Title>Add Bus</Modal.Title>
        </Modal.Header>
        <Modal.Body className='very-dark'>
          <form className='very-dark text-white' onSubmit={handleSubmit}>
            <div className="form-group col-md-6 mb-2">
              <label>Company Name</label>
              <input type="text" className="form-control bg-dark text-white" id=""  name='companyName' value={companyName}
        onChange={handleChange}/>
            </div>
            <div className="form-group col-md-6 mb-2">
              <label>License Plate</label>
              <input type="text" className="form-control bg-dark text-white" placeholder="ABC-123-DE" name='licensePlate' value={licensePlate}
        onChange={handleChange}/>
            </div>
            <div className="form-group col-md-6 mb-2">
              <label>Driver Name</label>
              <input type="text" className="form-control bg-dark text-white" id="" name='driverName' value={driverName}
        onChange={handleChange}/>
            </div>
            <div className="form-group col-md-6 mb-2">
              <label>Bus Capacity</label>
              <input type="number" className="form-control bg-dark text-white" id="" name='busCapacity' value={busCapacity}
        onChange={handleChange}/>
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
    </div>
  )
}

export default Bus