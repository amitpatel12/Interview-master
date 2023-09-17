import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import axios from 'axios';
import url from '../url';
const ViewData = ({isModalOpen, setIsModalOpen, id, setId}) => {
  const [customer, setCustomer] = useState()
 
  const handleOk = () => {
    setId('')
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setId('')
    setIsModalOpen(false);
  };

  useEffect(() => {
        const getCustomers = async () => {
          const { data } = await axios.get(
            `${url}/api/contacts/${id}`,
          );

         setCustomer(data.result)
      
        };
       if(isModalOpen)
          getCustomers();
        
      }, [id]);
  return (
    <>
      
      <Modal title="Customer Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <div className='flex flex-col gap-4'>
            <div className='flex gap-4'>
                <p className='w-[30%]'>Name</p>
                <p>{customer?.name}</p>
            </div>

            <div className='flex gap-4'>
                <p className='w-[30%]'>Spoc</p>
                <p>{customer?.spoc}</p>
            </div>


            <div className='flex gap-4'>
                <p className='w-[30%]'>Mobile Number</p>
                <p>{customer?.mobileNo}</p>
            </div>


            <div className='flex gap-4'>
                <p className='w-[30%]'>Email</p>
                <p>{customer?.email}</p>
            </div>

            <div className='flex gap-4'>
                <p className='w-[30%]'>Created Date</p>
                <p>{customer?.date}</p>
            </div>

            
        </div>
      </Modal>
    </>
  );
};
export default ViewData;