/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOneItem, setItem } from "../../utils/storageProvider";
import InputField from "../../components/InputField";
import Form from "../../components/Form";

const index = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  console.log(data);
  useEffect(() => {
    const data = getOneItem(id);
    if (data) {
      setData(data);
    }
  }, [id]);
  const onSubmit = (data) => {
    const editedData = Object.fromEntries(data.entries());
    const value = { ...editedData, id: id };
    setItem(value);
    alert("edited sucessfully");
    setTimeout(() => {
      navigate("/");
    }, 200);
  };
  return (
    <div>
      <div className="form">
        <Form onSubmit={onSubmit}>
          <h1>user info</h1>
          <InputField
            label="Name"
            id="name"
            errorText="* Name should be 3-16 characters and shouldn't include any special character!"
            type="text"
            name="Name"
            placeholder="your name"
            value={data?.Name}
            pattern="^[A-Za-z0-9\s]{3,16}$"
            required
            onChange={(e) => setData({ ...data, Name: e.target.value })}
          />
          <InputField
            label="Email"
            id="email"
            value={data?.Email}
            errorText="* It should be a valid email address! "
            type="email"
            name="Email"
            placeholder="name@example.com"
            required
            pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
            onChange={(e) => setData({ ...data, Email: e.target.value })}
          />
          <InputField
            label="Phone Number"
            id="Phone"
            value={data?.Phone}
            errorText="* Contact should be either Telephone or Mobile Number"
            type="tel"
            name="Phone"
            placeholder="Phone Number"
            pattern="\b\d{7}\b|\b\d{10}\b"
            required
            onChange={(e) => setData({ ...data, Phone: e.target.value })}
          />
          <InputField
            label="Date of Birth"
            value={data?.DOB}
            type="date"
            id="DOB"
            name="DOB"
            onChange={(e) => setData({ ...data, DOB: e.target.value })}
          />
          <div>
            <label htmlFor="address">Address</label>
            <div className="address-fields">
              <div className="address-field">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  placeholder="City"
                  name="City"
                  value={data?.City}
                  onChange={(e) => setData({ ...data, City: e.target.value })}
                />
              </div>
              <div className="address-field">
                <label htmlFor="District">District</label>
                <input
                  type="text"
                  placeholder="District"
                  name="District"
                  value={data?.District}
                  onChange={(e) =>
                    setData({ ...data, District: e.target.value })
                  }
                />
              </div>
              <div className="address-field">
                <label htmlFor="Province">Province</label>
                <select
                  name="Province"
                  id="Province"
                  value={data?.Province}
                  onChange={(e) =>
                    setData({ ...data, Province: e.target.value })
                  }
                >
                  <option value="">Choose Province</option>
                  <option value="Koshi">Koshi</option>
                  <option value="Madhesh">Madhesh</option>
                  <option value="Bagmati">Bagmati</option>
                  <option value="Gandaki">Gandaki</option>
                  <option value="Karnali">Karnali</option>
                  <option value="Sudurpashchim">Sudurpashchim</option>
                </select>
              </div>
              <div className="address-field">
                <label htmlFor="Country">Country</label>
                <select name="Country" id="Country" defaultValue="Nepal">
                  <option value="">Choose Country </option>
                  <option value="Nepal" selected>
                    Nepal
                  </option>
                </select>
              </div>
            </div>
          </div>

          <button>Submit</button>
        </Form>
      </div>
    </div>
  );
};

export default index;
