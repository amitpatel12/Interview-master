import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import axios from 'axios';
import url from '../url';
const DeleteWarning = ({isModalOpen, setIsModalOpen, id, setId}) => {

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async() => {
    try {
        await axios.delete(`${url}/api/contacts/${id}`)
        setId('');
        setIsModalOpen(false);
    } catch (error) {
        console.log(error);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
   
      <Modal title="Are You Sure" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
      footer={[
        <Button onClick={handleCancel} className="h-[38px] rounded-[8px] !font-publicsans !font-[500] !text-[15px] !bg-red-500 hover:!bg-opacity-95 !text-white hover:!border-none !border-none w-auto" onClick={handleOk}>
          Continue
        </Button>
      ]}
      >
        <p>After Continue cann't retrive deleted data</p>
       
      </Modal>
    </>
  );
};
export default DeleteWarning;