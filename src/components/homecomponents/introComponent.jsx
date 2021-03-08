import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { INTROMUTATION } from "../../data/mutations";
import { introQuery } from "../../data/queries";
import { FormInput } from "../custom-input/custom-input.component";
import CustomButton from "../custom-button/custom-button.component";

function IntroComponent() {
  const [form, setForm] = useState({
    introTitle: "",
    introDesc1: "",
    introDesc2: "",
    introDesc3: "",
  });

  const { loading, error, data } = useQuery(introQuery);
  useEffect(() => {
    data &&
      data.introductionComponents.map((item) => {
        const title = item.introTitle;
        const desc1 = item.introDesc1;
        const desc2 = item.introDesc2;
        const desc3 = item.introDesc3;

        return setForm({
          introTitle: title,
          introDesc1: desc1,
          introDesc2: desc2,
          introDesc3: desc3,
        });
      });
  }, [data]);

  const [updateIntroductionComponent] = useMutation(INTROMUTATION, {
    refetchQueries: ["introductionComponents"],
  });

  const handleInputOnChange = ({ currentTarget: { name, value } }) =>
    setForm((state) => ({ ...state, [name]: value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    data &&
      data.introductionComponents.map((item, i) => {
        console.log(item);
        return updateIntroductionComponent({
          variables: {
            id: item.id,
            introTitle: form.introTitle,
            introDesc1: form.introDesc1,
            introDesc2: form.introDesc2,
            introDesc3: form.introDesc3,
          },
        });
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`ERROR: ${error}`}</p>;
  return (
    <div className="banner">
      <div className="banner_content">
        <form className="form" id="introform" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="introTitle"
            handleChange={handleInputOnChange}
            value={form.introTitle}
            label="Introduction Title"
          />
          <FormInput
            type="text"
            name="introDesc1"
            handleChange={handleInputOnChange}
            value={form.introDesc1}
            label="Introduction Description 1"
          />
          <FormInput
            type="text"
            name="introDesc2"
            handleChange={handleInputOnChange}
            value={form.introDesc2}
            label="Introduction Description 2"
          />
          <FormInput
            type="text"
            name="introDesc3"
            handleChange={handleInputOnChange}
            value={form.introDesc3}
            label="Introduction Description 3"
          />
          <CustomButton type="submit">SAVE</CustomButton>
        </form>
      </div>
    </div>
  );
}

export default IntroComponent;
