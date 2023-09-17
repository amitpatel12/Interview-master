import React, { useState, useEffect } from "react";
import { Table, Switch, Space, Button } from "antd";



const TabelShow = ({ columns, dataSource, rowSelection }) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey="_id"
      scroll={{
        x: 1000,
      }}
      components={{
        header: {
          cell: (props) => <th className="custom-header-cell " {...props} />,
        },
      }}
      rowSelection={{
        type: "checkbox",
        ...rowSelection,
      }}
      // pagination={{pageSize:6}}

      className="relative font-publicsans !text-[#574E7B]"
    />
  );
};
export default TabelShow;
