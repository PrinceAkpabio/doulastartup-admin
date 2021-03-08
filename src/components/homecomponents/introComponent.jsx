import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { BANNERMUTATION } from "../../data/mutations";
import { bannerQuery, assetsQuery } from "../../data/queries";
import { FormInput, Input } from "../custom-input/custom-input.component";
import CustomButton from "../custom-button/custom-button.component";

function IntroComponent() {
  const [form, setForm] = useState({
    brTitle: "",
    brSubtitle: "",
    brBtnText: "",
    brBtnLink: "",
    imgID: "",
  });

  const { loading, error, data } = useQuery(bannerQuery);
  const { data: assetData } = useQuery(assetsQuery);
  useEffect(() => {
    data &&
      data.bannerComponents.map((item) => {
        const title = item.brTitle;
        const subtitle = item.brSubtitle;
        const id = item.brImg.id;
        const btn = item.brBtnLinkk;
        const btnTxt = item.brBtnText;
        console.log("btn link: ", item.brBtnLinkk);

        return setForm({
          brTitle: title,
          brSubtitle: subtitle,
          brBtnText: btnTxt,
          brBtnLink: btn,
          imgID: id,
        });
      });
  }, [data]);
  console.log("btn link: ", form.brBtnLink);
  console.log("btn text: ", form.brBtnText);
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
                  brBtnLinkk: form.brBtnLink,
                  brBtnText: form.brBtnText,
                  brID: form.imgID,
                },
              });
            }}
          >
            <h6 id="banner-img">BANNER IMAGE</h6>
            <img className="form_image" src={item.brImg.url} alt="banner img" />

            <ul className="assetsList">
              {assetData &&
                assetData.assets.map((asset) => (
                  <li className="asset" key={asset.id}>
                    <Input
                      name="imgID"
                      value={asset.id}
                      handleChange={handleInputOnChange}
                      type="radio"
                    />
                    <img className="asset_image" src={asset.url} alt="assets" />
                  </li>
                ))}
            </ul>
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

            <Input
              type="text"
              name="brBtnText"
              handleChange={handleInputOnChange}
              value={form.brBtnText}
              label="Banner button text"
            />
            <Input
              type="text"
              name="brBtnLink"
              handleChange={handleInputOnChange}
              value={form.brBtnLink}
              label="Banner button link"
            />
            <CustomButton type="submit">SAVE</CustomButton>
          </form>
        </div>
      ))}
    </div>
  );
}

export default IntroComponent;
