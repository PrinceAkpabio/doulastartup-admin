import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { BANNERMUTATION } from "../../data/mutations";
import { bannerQuery, assetsQuery } from "../../data/queries";
import { FormInput, Input } from "../custom-input/custom-input.component";
import CustomButton from "../custom-button/custom-button.component";

function BannerComponent() {
  const [form, setForm] = useState({
    brTitle: "",
    brSubtitle: "",
    // url: "",
    imgID: "",
  });
  const { loading, error, data } = useQuery(bannerQuery);
  const { data: assetData } = useQuery(assetsQuery);
  useEffect(() => {
    data &&
      data.bannerComponents.map((item) => {
        const title = item.brTitle;
        const subtitle = item.brSubtitle;
        // const url = item.brImg.url;
        const id = item.brImg.id;
        return setForm({
          brTitle: title,
          brSubtitle: subtitle,
          brID: id,
        });
      });
  }, [data]);
  console.log(form.imgID);
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
                  brID: form.imgID,
                  // url: form.url,
                },
              });
            }}
          >
            <img className="form_image" src={item.brImg.url} alt="banner img" />

            <ul className="assetsList">
              {assetData &&
                assetData.assets.map((asset) => (
                  <li
                    className="asset"
                    key={asset.id}
                    onClick={handleInputOnChange}
                  >
                    <Input
                      name="imgID"
                      value={asset.id}
                      handleChange={handleInputOnChange}
                      type="checkbox"
                    />
                    <img className="asset_image" src={asset.url} alt="assets" />
                  </li>
                ))}
            </ul>

            <Input
              type="File"
              name="url"
              accept="image/png, image/jpeg"
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
