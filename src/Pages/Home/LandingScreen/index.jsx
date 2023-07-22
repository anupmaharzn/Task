/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import InputField from "../../../components/InputField";
import Form from "../../../components/Form";
import { getItem, removeItem, setItem } from "../../../utils/storageProvider";
import Edit from "../../../assets/icons/edit.svg";
import Delete from "../../../assets/icons/delete.svg";
import Sort from "../../../assets/icons/sort5.svg";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Button from "../../../components/Common/Button";
const index = () => {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState(false);
  // submit handler
  const onSubmit = (data) => {
    const userdata = Object.fromEntries(data.entries());
    setItem(userdata);
    setData(getItem());
  };
  const navigate = useNavigate();
  // data setter for inital render
  useEffect(() => {
    const data = getItem();
    if (data) {
      setData(data);
    }
  }, []);
  // edit handler
  const handleEdit = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to edit?")) {
      navigate(`/profile/${id}`);
    }
  };
  // delete handler
  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete?")) {
      removeItem(id);
    }
    navigate(0);
  };
  // sort handler
  const ascSort = () => {
    const sortedData = data?.sort((a, b) => {
      if (a.Name < b.Name) {
        return -1;
      }
      return 0;
    });
    setData(sortedData);
  };

  const handleSortToggle = () => {
    setSort((prevSort) => !prevSort);
    sort ? ascSort() : setData(getItem());
  };
  return (
    <>
      {/* form section */}
      <div className="form">
        <Form onSubmit={onSubmit}>
          <h1 className="form-title">Form</h1>
          <InputField
            label="Name"
            id="name"
            errorText="* Name should be 3-16 characters and shouldn't include any special character!"
            type="text"
            name="Name"
            placeholder="your name"
            pattern="^[A-Za-z0-9\s]{3,16}$"
            required
          />

          <InputField
            label="Email"
            id="email"
            errorText="* It should be a valid email address! "
            type="email"
            name="Email"
            pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
            placeholder="name@example.com"
            required
          />
          <InputField
            label="Phone Number"
            id="Phone"
            errorText="* Contact should be either Telephone or Mobile Number"
            type="tel"
            name="Phone"
            placeholder="Phone Number"
            pattern="\b\d{7}\b|\b\d{10}\b"
            required
          />
          <InputField label="Date of Birth" type="date" id="DOB" name="DOB" />

          <div className="address-fields">
            <div>
              <div className="address-field">
                <label className="address-label" htmlFor="city">
                  City
                </label>
                <input type="text" placeholder="City" name="City" />
              </div>
              <div className="address-field">
                <label className="address-label" htmlFor="Province">
                  Province
                </label>
                <select name="Province" id="Province">
                  <option value="">Choose Province</option>
                  <option value="Koshi">Koshi</option>
                  <option value="Madhesh">Madhesh</option>
                  <option value="Bagmati">Bagmati</option>
                  <option value="Gandaki">Gandaki</option>
                  <option value="Karnali">Karnali</option>
                  <option value="Sudurpashchim">Sudurpashchim</option>
                </select>
              </div>
            </div>
            <div>
              <div className="address-field">
                <label className="address-label" htmlFor="District">
                  District
                </label>
                <input type="text" placeholder="District" name="District" />
              </div>
              <div className="address-field">
                <label className="address-label" htmlFor="Country">
                  Country
                </label>
                <select name="Country" id="Country" defaultValue="Nepal">
                  <option value="">Choose Country </option>
                  <option value="Nepal" selected>
                    Nepal
                  </option>
                </select>
              </div>
            </div>
          </div>
          <Button type="submit" theme="primary">
            ADD
          </Button>
        </Form>
      </div>
      {/* table section*/}
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>
                Name{" "}
                <span className="table-icon" onClick={handleSortToggle}>
                  <img src={Sort} alt="sort" />
                  <span class="tooltiptext">Sort</span>
                </span>
              </th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Date of Birth</th>
              <th>City</th>
              <th>District</th>
              <th>Province</th>
              <th>Country</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data?.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.Name}</td>
                    <td>{user.Email}</td>
                    <td>{user.Phone}</td>
                    <td>{user.DOB}</td>
                    <td>{user.City}</td>
                    <td>{user.District}</td>
                    <td>{user.Province}</td>
                    <td>{user.Country}</td>
                    <td onClick={(e) => handleEdit(e, user.id)}>
                      <span className="table-icon">
                        <img src={Edit} alt="edit" />
                      </span>
                    </td>
                    <td onClick={(e) => handleDelete(e, user.id)}>
                      {" "}
                      <span className="table-icon">
                        <img src={Delete} alt="delete" />
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={10} className="table-text">
                  No User Data Yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default index;
