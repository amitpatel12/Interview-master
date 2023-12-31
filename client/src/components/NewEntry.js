import React, { useEffect, useState } from "react";
import { Button, Input, Modal } from "antd";
import axios from "axios";
import Form from "./Form";
import { format } from "date-fns";
import url from "../url";
const NewEntry = ({
  isModalOpen,
  setIsModalOpen
}) => {
  const [formData, setFormData] = useState({
    name: "",
    spoc: "",
    email: "",
    mobileNo: "",
    date: "",
  });

 

 

 
  const handleOk = () => {
  
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    
    setIsModalOpen(false);
  };

 const handleApi = async () => {
    try {
      
          const { data } = await axios.post(
            `${url}/api/contacts`,
            formData
          );
       
        setFormData({ name: "", spoc: "", email: "", mobileNo: "" });
        setIsModalOpen(false);
      } catch (error) {
        console.log("error during submission", error);
      }
 }
  return (
    <>
      <Modal
        title="New Entry"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form formData={formData} setFormData={setFormData} handleApi={handleApi} text={"ADD"}/>
      </Modal>
    </>
  );
};
export default NewEntry;
