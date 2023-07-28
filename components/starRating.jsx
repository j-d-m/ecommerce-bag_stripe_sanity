import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const starRating = () => {
  const [rating, setRating] = useState(0);
  const handleRating = (index) => {
    setRating(index);

    // if (setRating === "star") {
    //   return <AiOutlineStar />;
    // } else {
    return (
      <>
        <div className="star-rating">
          {[...Array(5)].map((star, index) => {
            index += 1;

            return (
              <button
                type="button"
                key={index}
                className={index <= rating ? "on" : "off"}
                onClick={() => handleRating(index)}
              >
                <span className="star">{<AiFillStar />}</span>
              </button>
            );
          })}
        </div>
      </>
    );
  };
  // };
};

export default starRating;
// import { useState } from 'react';

// const ProductRating = () => {
//   const [rating, setRating] = useState(0);

//   const handleRatingChange = (value) => {
//     setRating(value);
//     // You can perform any additional actions here, such as submitting the rating to a server.
//   };

//   const renderStars = () => {
//     const stars = [];
//     for (let value = 1; value <= 5; value++) {
//       stars.push(
//         <span
//           key={value}
//           className={`star ${value <= rating ? 'filled' : ''}`}
//           onClick={() => handleRatingChange(value)}
//         >
//           ★
//         </span>
//       );
//     }
//     return stars;
//   };

//   return <div className="product-rating">{renderStars()}</div>;
// };

// export default ProductRating;
