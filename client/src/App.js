import React, { useEffect, useState } from "react";
import TabelShow from "./components/TableShow";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlinePlus,
} from "react-icons/ai";
import { TbArrowsSort } from "react-icons/tb";
import { BsDownload } from "react-icons/bs";
import { HiArrowUpTray } from "react-icons/hi2";
import { BsTelephone, BsWhatsapp } from "react-icons/bs";
import { MdOutlineSms } from "react-icons/md";
import { GoMail } from "react-icons/go";
import { RxAvatar } from "react-icons/rx";
import DeleteWarning from "./components/DeleteWarning";
import NewEntry from "./components/NewEntry";
import ViewData from "./components/ViewData";
import axios from "axios";
import exportToExcel from "./components/Export";
import EditEntry from "./components/EditEntry";
import url from "./url";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [fetchData, setFetchData] = useState([]);
  const [isNewEntry, setIsNewEntry] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [rowSelect, setRowSelect] = useState(false);
  const [rowsKey, setRowsKey] = useState([]);
  const columns = [
    {
      title: "Contact",
      dataIndex: "name",
      className: "custom-header",
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: 200,
      render: (text, record) => (
        <div className="flex gap-3 items-center">
          <RxAvatar size={20} color="#574E7B" />
          <span className=" !text-[#574E7B]">{text}</span>
        </div>
      ),
    },
    {
      title: "CTA",
      dataIndex: "cta",
      render: (text, record) => (
        <div className="flex gap-4">
          <BsTelephone color="#574E7B" size={20} />
          <MdOutlineSms color="#574E7B" size={20} />
          <GoMail color="#574E7B" size={20} />
          <BsWhatsapp color="#574E7B" size={20} />
        </div>
      ),
    },
    {
      title: "SPOC",
      dataIndex: "spoc",
      sorter: (a, b) => a.spoc.localeCompare(b.spoc),
      width: 200,
      render: (text, record) => (
        <span className=" !text-[#574E7B]">{text}</span>
      ),
    },
    {
      title: "Mobile",
      dataIndex: "mobileNo",
      sorter: (a, b) => a.mobileNo.localeCompare(b.mobileNo),
      render: (text, record) => (
        <span className=" !text-[#574E7B]">{text}</span>
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      render: (text, record) => (
        <span className=" !text-[#574E7B]">{text}</span>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "date",
      sorter: (a, b) => a.date.localeCompare(b.date),
      render: (text, record) => (
        <span className=" !text-[#574E7B]">{text}</span>
      ),
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      fixed: "right",
      width: 150,
      render: (text, record) => (
        <div className="flex gap-4">
          <AiOutlineEye
            color="green"
            className="w-[22px] h-[22px] cursor-pointer"
            onClick={() => {
              setId(record._id);
              setIsView(true);
            }}
          />

          <AiOutlineEdit
            color="blue"
            className="w-[22px] h-[22px] cursor-pointer"
            onClick={() => {
              setId(record._id);
              setIsEdit(true);
            }}
          />

          <AiOutlineDelete
            color="red"
            className="w-[22px] h-[22px] cursor-pointer"
            onClick={() => {
              setIsDelete(true);
              setId(record._id);
            }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setDataSource(fetchData);
    } else {
      const filteredResults = fetchData.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setDataSource(filteredResults);
    }
  }, [searchQuery]);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const { data } = await axios.get(`${url}/api/contacts`);
        console.log(data);
        setFetchData(data.result);
        setDataSource(data.result);
      } catch (error) {
        console.log("data fetch errror", error);
      }
    };

    getCustomers();
    setDataSource(fetchData);
  }, [isNewEntry, isEdit, isDelete, rowSelect]);

  const handleDelete = (id) => {};

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      if (selectedRows.length > 0) {
        setRowSelect(true);
      } else {
        setRowSelect(false);
      }

      // setRowsKey([...rowsKey, selectedRowKeys])
      // const keys = selectedRowKeys.split(',')
      const keys = Object.values(selectedRowKeys);
      setRowsKey(keys);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {},
  };

  const handleSelectedDelete = async () => {
    try {
      await axios.post(`${url}/api/contacts/delete`, {
        ids: rowsKey,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="p-10 flex flex-col gap-3">
        <div className="flex  flex-col md:flex-row gap-7 bg-[#574E7B] justify-between items-center text-white px-2 py-2">
          <p className="">Contacts</p>
          <div className="flex gap-1 items-center">
            <div>
              <input
                type="text"
                placeholder="Placeholder"
                className="rounded-[6px] border-[#DBDADE] border-[1px] h-[33px] px-2 outline-none text-[#574E7B]"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="bg-white h-[33px] px-2 grid place-content-center font-[600] rounded-[4px] cursor-pointer hover:bg-opacity-90 ">
              <HiArrowUpTray color="#574E7B" size={22} />
            </div>

            <div
              className="bg-white h-[33px] px-2 grid place-content-center font-[600] rounded-[4px] cursor-pointer hover:bg-opacity-90 "
              onClick={() => exportToExcel(dataSource)}
            >
              <BsDownload color="#574E7B" size={22} />
            </div>

            <div
              className="bg-white h-[33px] px-2 grid place-content-center font-[600] rounded-[4px] cursor-pointer hover:bg-opacity-90 "
              onClick={() => setIsNewEntry(true)}
            >
              <AiOutlinePlus color="#574E7B" size={22} />
            </div>

            {rowSelect && (
              <button
                className=" h-[33px] px-2 grid place-content-center font-[600] rounded-[4px] cursor-pointer hover:bg-opacity-90 bg-red-500"
                onClick={() => {
                  handleSelectedDelete();
                  setRowSelect(false);
                }}
              >
                Delete Selected
              </button>
            )}
          </div>
        </div>

        <div className="">
          <TabelShow
            columns={columns}
            dataSource={dataSource}
            rowSelection={rowSelection}
          />
        </div>
      </div>
      <DeleteWarning
        isModalOpen={isDelete}
        setIsModalOpen={setIsDelete}
        id={id}
        setId={setId}
      />
      <NewEntry
        isModalOpen={isNewEntry}
        setIsModalOpen={setIsNewEntry}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        id={id}
        setId={setId}
      />

      <EditEntry
        isModalOpen={isEdit}
        setIsModalOpen={setIsEdit}
        id={id}
        setId={setId}
      />

      <ViewData
        isModalOpen={isView}
        setIsModalOpen={setIsView}
        id={id}
        setId={setId}
      />
    </>
  );
};

export default App;
