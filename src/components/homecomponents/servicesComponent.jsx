import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { SERVICESMUTATION } from "../../data/mutations";
import { introQuery } from "../../data/queries";
import { Input } from "../custom-input/custom-input.component";
import CustomButton from "../custom-button/custom-button.component";

function ServiceComponent() {
  const [form, setForm] = useState({
    svrLink1: "",
    svrLink2: "",
    svrLink3: "",
    svrText1: "",
    svrText2: "",
    svrText3: "",
  });
  console.log(form.svrLink1);
  const { loading, error, data } = useQuery(introQuery);
  console.log("data: ", data);
  useEffect(() => {
    data &&
      data.serviceComponents.map((item) => {
        const link1 = item.svrLinkk1;
        const link2 = item.svrLinkk2;
        const link3 = item.svrLinkk3;
        const title1 = item.svrText1;
        const title2 = item.svrText2;
        const title3 = item.svrText3;
        console.log("LINK: ", link1);
        return setForm({
          svrLink1: link1,
          svrLink2: link2,
          svrLink3: link3,
          svrText1: title1,
          svrText2: title2,
          svrText3: title3,
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
        const svr1 = JSON.stringify(form.svrLink1);
        return updateServiceComponent({
          variables: {
            id: item.id,
            svrLinkk1: svr1,
            svrLinkk2: form.svrLink2,
            svrLinkk3: form.svrLink3,
            svrText1: form.svrText1,
            svrText2: form.svrText2,
            svrText3: form.svrText3,
          },
        });
      });
  };
  console.log(form.svrLink1);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`ERROR: ${error}`}</p>;
  return (
    <div className="banner">
      <div className="banner_content">
        <form className="form" id="introform" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="svrText1"
            handleChange={handleInputOnChange}
            value={form.svrText1}
            label="Service title 1"
          />
          <Input
            type="text"
            name="svrLink1"
            handleChange={handleInputOnChange}
            value={form.svrLink1}
            label="Service link 1"
          />
          <Input
            type="text"
            name="svrText2"
            handleChange={handleInputOnChange}
            value={form.svrText2}
            label="Service title 2"
          />
          <Input
            type="text"
            name="svrLink2"
            handleChange={handleInputOnChange}
            value={form.svrLink2}
            label="Service link 2"
          />
          <Input
            type="text"
            name="svrText3"
            handleChange={handleInputOnChange}
            value={form.svrText3}
            label="Service title 3"
          />
          <Input
            type="text"
            name="svrLink3"
            handleChange={handleInputOnChange}
            value={form.svrLink3}
            label="Service link 3"
          />
          <CustomButton type="submit">SAVE</CustomButton>
        </form>
      </div>
    </div>
  );
}

export default ServiceComponent;
