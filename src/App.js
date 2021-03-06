import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const BANNERMUTATION = gql`
  mutation UpdateBannerComponents(
    $id: ID!
    $brTitle: String
    $brSubtitle: String
  ) {
    updatebannerComponents(
      where: { id: $id }
      data: { brTitle: $brTitle, brSubtitle: $brSubtitle }
    ) {
      id
      brTitle
      brSubtitle
    }
  }
`;

const bannerQuery = gql`
  query BannerComponents {
    bannerComponents {
      id
      brTitle
      brSubtitle
    }
  }
`;
function App() {
  const [form, setForm] = useState({
    brTitle: "",
    brSubtitle: "",
  });
  const { loading, error, data } = useQuery(bannerQuery);
  const [updatebannerComponents, { errorBr }] = useMutation(BANNERMUTATION, {
    refetchQueries: ["BannerComponents"],
  });
  console.log(errorBr);
  // console.log(data.bannerComponents[0]);
  const handleInputOnChange = ({ currentTarget: { name, value } }) =>
    setForm((state) => ({ ...state, [name]: value }));

  // const handleSubmit = (e, item) => {

  // };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {error}</p>;
  return (
    <div className="App">
      {data.bannerComponents.map((item, i) => (
        <div key={i}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updatebannerComponents({
                variables: {
                  id: item.id,
                  brTitle: form.brTitle,
                  brSubtitle: form.brSubtitle,
                },
              });
              console.log(form.brSubtitle, form.brTitle);
              setForm({
                brTitle: "",
                brSubtitle: "",
              });
            }}
          >
            <input
              type="text"
              name="brTitle"
              onChange={handleInputOnChange}
              value={form.brTitle}
            />
            <input
              type="text"
              name="brSubtitle"
              onChange={handleInputOnChange}
              value={form.brSubtitle}
            />
            <input type="submit" value="SUBMIT" />
          </form>

          <p>{item.brTitle}</p>
          <p>{item.brSubtitle}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
