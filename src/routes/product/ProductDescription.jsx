import React from "react";

const descStyles = {
  textAlign: "left",
  letterSpacing: "0.1rem",
};

const parseDesc = (d) => {
  let lines = d.split("<p>");
  return (
    <div className="h-sub" style={descStyles}>
      {lines.map((l, index) => {
        if (l !== "") {
          if (l.slice(0, 3) === "NNN") {
            return (
              <p key={index}>
                <br></br>
              </p>
            );
          } else if (l.slice(0, 3) === "DOT") {
            return (
              <p key={index}>
                {l.replace("DOT", "• ").slice(0, l.indexOf("<") - 1)}
              </p>
            );
          } else if (l.slice(0, 3) === "DET") {
            return (
              <p key={index}>
                <strong>DETAILS</strong>
              </p>
            );
          } else {
            return <p key={index}>{l.replace("</p>", "")}</p>;
          }
        } else {
          return null;
        }
      })}
    </div>
  );
};

const ProductDescription = (props) => {
  let desc = props.desc;

  return parseDesc(desc);
};

export default ProductDescription;
