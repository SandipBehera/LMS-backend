import React, { Fragment, useState } from "react";
import DataTable from "react-data-table-component";
import {
 
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Dropdown,
  Tooltip,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiDownload } from "react-icons/fi";
import { Breadcrumbs } from "../../../AbstractElements";
 
const ViewAllBookCategory = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [tooltipOpen, setTooltipOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
 
  const [editableItem, setEditableItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([
    {
      id: 1,
      category: "BB Scheme",
      description: "it is a schr book ",
      status: "Active",
      hidden: false,
    },
    {
      id: 2,
      category: "Beetlejuice",
      description: "1988",
      status: "Active",
      hidden: false,
    },
    {
      id: 3,
      category: "pancha tantra",
      description: "story book",
      status: "Active",
      hidden: false,
    },
    {
      id: 4,
      category: "juice",
      description: "1983",
      status: "Active",
      hidden: false,
    },
    {
      id: 5,
      category: "Beetlejuice",
      description: "1988",
      status: "Active",
      hidden: false,
    },
  ]);
  const [editedData, setEditedData] = useState({
    category: "",
    description: "",
    status: "",
  });
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
 
  const toggleStatusDropdown = () => {
    setStatusDropdownOpen(!statusDropdownOpen);
  };
//   const toggleDropdown = (id) => {
//     setDropdownOpen(!dropdownOpen);
//     setSelectedItemId(id);
//   };
 
  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };
 //for edit button
  const handleEdit = (id) => {
    setEditableItem(selectedItemId);
    const bookToEdit = data.find((elem) => elem.id === id);
    setEditedData({
      category: bookToEdit.category,
      description: bookToEdit.description,
      status: bookToEdit.status,
    });
    toggleEditModal();
  };
 
  const saveChanges = () => {
   
    const index = data.findIndex((item) => item.id === editableItem);
 
    const updatedData = [...data];
    updatedData[index] = {
      ...data[index],
      category: editedData.category,
      description: editedData.description,
      status: editedData.status,
    };
 
    // Set the updated data
    setData(updatedData);
    toggleEditModal();
    toast.success("Book Category updated Successfully")
  };
//to get edit data
  const handleEditableFormChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //filter functionality
  const filteredData = data.filter(
    (item) =>
      !item.hidden &&
      (item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );
//book will disapear
  const changeStatus = () => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === selectedItemId
          ? { ...item, status: "Inactive", hidden: true }
          : item
      )
    );
    setDropdownOpen(false);
  };
 
  //const filteredData = data.filter((item) => !item.hidden);
  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };
  const columns = [
    {
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Book Category",
      selector: (row) => row.category,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Status",
      cell: (row) => (
        <Button color={row.status === "Active" ? "success" : "secondary"} className="px-3">
          {row.status}
        </Button>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        // <ButtonDropdown
        //   isOpen={dropdownOpen && selectedItemId === row.id}
        //   toggle={() => toggleDropdown(row.id)}
        // >
        //   <DropdownToggle caret color="primary">
        //     Actions
        //   </DropdownToggle>
        //   <DropdownMenu>
        //     <DropdownItem onClick={() => handleEdit(row.id)}>Edit</DropdownItem>
        //     <DropdownItem onClick={changeStatus}>Inactivate</DropdownItem>
        //   </DropdownMenu>
        // </ButtonDropdown>
        <Dropdown
        isOpen={activeDropdown === row.id}
        toggle={() => toggleDropdown(row.id)}
      >
        <DropdownToggle caret>Action</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => handleEdit(row.id)}>Edit</DropdownItem>
          <DropdownItem onClick={() => changeStatus(row.id)}>Inactivate</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      ),
    },
  ];
  const toggleTooltip = () => {
    setTooltipOpen(!tooltipOpen);
  };
  return (
    <Fragment>
      <Breadcrumbs
        parent="Book Management"
        mainTitle="View All Category"
        title="View All Category"
      />
 
      <div className="d-flex justify-content-end align-items-center m-4">
        <Button color="info" className="mx-4">
          Bulk Upload
        </Button>
        <FiDownload  id="downloadIcon"  className="mx-4 text-primary" style={{fontSize:"1.8rem"}} />
          <Tooltip
        placement="bottom"
        isOpen={tooltipOpen}
        target="downloadIcon"
        toggle={toggleTooltip}
      >
        Download
      </Tooltip>
        <Input className="mx-4"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "250px" }} // Adjust the width as needed
        />
      </div>
      <DataTable columns={columns} data={filteredData} pagination />
 
      {/* Edit Modal */}
      <Modal isOpen={editModalOpen} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Book</ModalHeader>
        <ModalBody>
          {/* Add your form for editing here */}
          <Form>
            <FormGroup>
              <Label for="bookCategory">Book Category</Label>
              <Input
                type="text"
                name="category"
                id="bookCategory"
                placeholder="Enter book category"
                value={editedData.category}
                onChange={handleEditableFormChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                placeholder="Enter book description"
                value={editedData.description}
                onChange={handleEditableFormChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="status">Status</Label>
              <Dropdown isOpen={statusDropdownOpen} toggle={toggleStatusDropdown}>
                <DropdownToggle caret>
                  {editedData.status}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => setEditedData({ ...editedData, status: 'Active' })}>Active</DropdownItem>
                  <DropdownItem onClick={() => setEditedData({ ...editedData, status: 'Inactive' })}>Inactive</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={saveChanges}>
            Save Changes
          </Button>
          <Button color="secondary" onClick={toggleEditModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};
 
export default ViewAllBookCategory;