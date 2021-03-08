import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { SERVICESMUTATION } from "../../data/mutations";
import { introQuery } from "../../data/queries";
import { FormInput } from "../custom-input/custom-input.component";
import CustomButton from "../custom-button/custom-button.component";

function ServiceComponent() {
  const [form, setForm] = useState({
    svrLink1: "",
    svrLink2: "",
    svrLink3: "",
  });

  const { loading, error, data } = useQuery(introQuery);
  console.log("data: ", data);
  useEffect(() => {
    data &&
      data.serviceComponents.map((item) => {
        const link1 = item.svrLink1;
        const link2 = item.svrLink2;
        const link3 = item.svrLink3;

        return setForm({
          svrLink1: link1,
          svrLink2: link2,
          svrLink3: link3,
        });
      });
  }, [data]);

  const [updateServiceComponent] = useMutation(SERVICESMUTATION, {
    refetchQueries: ["serviceComponents"],
  });

  const handleInputOnChange = ({ currentTarget: { name, value } }) =>
    setForm((state) => ({ ...state, [name]: value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    data &&
      data.serviceComponents.map((item, i) => {
        console.log(item);
        return updateServiceComponent({
          variables: {
            id: item.id,
            svrLink1: form.svrLink1,
            svrLink2: form.svrLink2,
            svrLink3: form.svrLink3,
          },
        });
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error}</p>;
  return (
    <div className="banner">
      {data.serviceComponents.map((item, i) => (
        <div className="banner_content" key={i}>
          <form className="form" id="introform" onSubmit={handleSubmit}>
            <FormInput
              type="text"
              name="svrLink1"
              handleChange={handleInputOnChange}
              value={form.svrLink1}
              label="Service link 1"
            />
            <FormInput
              type="text"
              name="svrLink2"
              handleChange={handleInputOnChange}
              value={form.svrLink2}
              label="Service link 2"
            />
            <FormInput
              type="text"
              name="svrLink3"
              handleChange={handleInputOnChange}
              value={form.svrLink3}
              label="Service link 3"
            />
            <CustomButton type="submit">SAVE</CustomButton>
          </form>
        </div>
      ))}
    </div>
  );
}

export default ServiceComponent;
