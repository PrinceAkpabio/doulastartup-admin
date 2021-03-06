import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { BANNERMUTATION } from "../../data/mutations";
import { bannerQuery } from "../../data/queries";
import { FormInput, Input } from "../custom-input/custom-input.component";
import CustomButton from "../custom-button/custom-button.component";

function BannerComponent() {
  const [form, setForm] = useState({
    brTitle: "",
    brSubtitle: "",
    url: "",
  });
  const { loading, error, data } = useQuery(bannerQuery);
  useEffect(() => {
    data &&
      data.bannerComponents.map((item) => {
        const title = item.brTitle;
        const subtitle = item.brSubtitle;
        const url = item.brImg.url;
        return setForm({
          brTitle: title,
          brSubtitle: subtitle,
          url: url,
        });
      });
  }, [data]);

  const [updateBannerComponent] = useMutation(BANNERMUTATION, {
    refetchQueries: ["bannerComponents"],
  });
  const handleInputOnChange = ({ currentTarget: { name, value } }) =>
    setForm((state) => ({ ...state, [name]: value }));
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error}</p>;
  return (
    <div className="banner">
      {data.bannerComponents.map((item, i) => (
        <div className="banner_content" key={i}>
          <h2>Home Page</h2>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              updateBannerComponent({
                variables: {
                  id: item.id,
                  brTitle: form.brTitle,
                  brSubtitle: form.brSubtitle,
                  brID: item.brImg.id,
                  url: form.brTitle,
                },
              });
            }}
          >
            <img className="form_image" src={form.url} alt="banner img" />
            <Input
              type="file"
              name="url"
              handleChange={handleInputOnChange}
              label="Banner Image"
            />
            <FormInput
              type="text"
              name="brTitle"
              handleChange={handleInputOnChange}
              value={form.brTitle}
              label="Banner Title"
            />
            <FormInput
              type="text"
              name="brSubtitle"
              handleChange={handleInputOnChange}
              value={form.brSubtitle}
              label="Banner Subtitle"
            />
            <CustomButton type="submit">SUBMIT</CustomButton>
          </form>
        </div>
      ))}
    </div>
  );
}

export default BannerComponent;
