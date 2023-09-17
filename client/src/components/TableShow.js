import React, { useState, useEffect } from "react";
import { Table, Switch, Space, Button } from "antd";


// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(
//       `selectedRowKeys: ${selectedRowKeys}`,
//       "selectedRows: ",
//       selectedRows
//     );
//   },
//   onSelect: (record, selected, selectedRows) => {
//     console.log(record, selected, selectedRows);
//   },
//   onSelectAll: (selected, selectedRows, changeRows) => {
//     console.log(selected, selectedRows, changeRows);
//   },
// };




const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const handleAction = (record) => {
    console.log("Action clicked for record:", record);
  }


  

  




const TabelShow = ({columns, dataSource, rowSelection}) => {
 
  

 
 

  return (
   


      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="_id"
        onChange={onChange}
        scroll={{
          x: 1000,
        }}
       
        components={{
          header: {
            cell: (props) => (
              <th className="custom-header-cell " {...props} />
            ),
          },
        }}
        rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
        // pagination={{pageSize:6}}
       
        className="relative font-publicsans !text-[#574E7B]"
  
        
      />
 
  );
};
export default TabelShow;
