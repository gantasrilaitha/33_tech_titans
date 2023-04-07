import React, { useContext, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import Spiner from "../../components/Spiner/Spiner"
import {registerfunc} from "../../services/Apis"
import { ToastContainer, toast } from "react-toastify"
import {useNavigate} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import "./register.css"
import { addData } from '../../components/context/ContextProvider';

const Register = () => {

  const [inputdata, setInputData] = useState({
    pid:"",
    pname:"",
    prname: "",
    email: "",
    domain: "",
    location: ""
  });

  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [showspin, setShowSpin] = useState(true);

  const navigate = useNavigate();

  const { useradd, setUseradd } = useContext(addData);

  // status optios
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];

  // setInput Value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value })
  }

  // status set
  const setStatusValue = (e) => {
    setStatus(e.value)
  }

  // profile set
  const setProfile = (e) => {
    setImage(e.target.files[0])
  }

  //submit userdata
  const submitUserData = async(e) => {
    e.preventDefault();

    const { pid,pname,prname, email,domain, location } = inputdata;

    if (pid === "") {
      toast.error("Project ID is Required !")
    } else if (pname === "") {
      toast.error("Project name is Required !")
    } else if (prname === "") {
      toast.error("Professor name is Required !")
    }
    else if (email === "") {
      toast.error("Email is Required !")
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email !")
    //} else if (mobile === "") {
      //toast.error("Mobile is Required !")
    //} else if (mobile.length > 10) {
    //  toast.error("Enter Valid Mobile!f")
    //} else if (gender === "") {
    //  toast.error("Gender is Required !")
    } else if (status === "") {
      toast.error("Status is Required !")
    } else if (image === "") {
      toast.error("Profile is Required !")
    } else if (location === "") {
      toast.error("location is Required !")
    } else if (domain === "") {
      toast.error("Domain is Required !")
    } 
      else {
      console.log(image);

      const data = new FormData();
      data.append("pid",pid)
      data.append("pname",pname)
      data.append("prname",prname)
      data.append("email",email)
      //data.append("mobile",mobile)
      //data.append("gender",gender)
      data.append("domain",domain)
      data.append("status",status)
      data.append("user_profile",image)
      data.append("location",location)

      const config = {
        "Content-Type":"multipart/form-data"
      }

      const response = await registerfunc(data,config);
      
      if(response.status === 200){
        setInputData({
          ...inputdata,
          pid:"",
          pname:"",
          prname: "",
          email: "",
          domain: "",
          location: ""
        });
        setStatus("");
        setImage("");
        setUseradd(response.data)
        navigate("/");
      }else{
        toast.error("Error!")
      }

    }

  }

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image))
    }

    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, [image])


  return (
    <>
      {
        showspin ? <Spiner /> : <div className="container">
          <h2 className='text-center mt-1'>Register Your Details</h2>
          <Card className='shadow mt-3 p-3'>
            <div className="profile_div text-center">
              <img src={preview ? preview : "/man.png"} alt="img" />
            </div>

            <Form>
              <Row>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Project ID</Form.Label>
                  <Form.Control type="text" name='pid' value={inputdata.pid} onChange={setInputValue} placeholder='Enter Project Id' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control type="text" name='pname' value={inputdata.pname} onChange={setInputValue} placeholder='Enter Project Name' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name='email' value={inputdata.email} onChange={setInputValue} placeholder='Enter Email' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Professor Name</Form.Label>
                  <Form.Control type="text" name='prname' value={inputdata.prname} onChange={setInputValue} placeholder='Enter Professor Name' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Domain</Form.Label>
                  <Form.Control type="text" name='domain' value={inputdata.domain} onChange={setInputValue} placeholder='Enter Domain' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Select Your Status</Form.Label>
                  <Select options={options}  onChange={setStatusValue} />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Select Your Profile</Form.Label>
                  <Form.Control type="file" name='user_profile' onChange={setProfile} placeholder='Select Your Profile' />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Enter Your Location</Form.Label>
                  <Form.Control type="text" name='location' value={inputdata.location} onChange={setInputValue} placeholder='Enter Your Location' />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={submitUserData}>
                  Submit
                </Button>
              </Row>

            </Form>
          </Card>
          <ToastContainer position="top-center" />
        </div>
      }

    </>
  )
}

export default Register