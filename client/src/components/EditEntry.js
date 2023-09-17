import React, { useEffect, useState } from "react";
import { Button, Input, Modal } from "antd";
import axios from "axios";
import Form from "./Form";
const EditEntry = ({
  isModalOpen,
  setIsModalOpen,
  id,
  setId,
  
}) => {
  const [formData, setFormData] = useState({
    name: "",
    spoc: "",
    email: "",
    mobileNo: "",
  });

 

 

 
  const handleOk = () => {
    setId('')
 
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setId('')
    setIsModalOpen(false);
  };

 const handleApi = async () => {
    try {
        
            const { data } = await axios.put(
              `http://localhost:8000/api/contacts/${id}`,
              formData
            );
            setId("");
            setIsModalOpen(false);
           
         
      } catch (error) {
        console.log("error during submission", error);
      }
 }

 useEffect(() => {
    const getCustomers = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/contacts/${id}`);

   
      setFormData({
        name: data.result.name,
        email: data.result.email,
        mobileNo: data.result.mobileNo,
        spoc: data.result.spoc
      });
    };
    
    
      getCustomers();
    
  }, [id]);
  return (
    <>
      <Modal
        title="New Entry"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form formData={formData} setFormData={setFormData} handleApi={handleApi} text={"EDIT"}/>
      </Modal>
    </>
  );
};
export default EditEntry;
