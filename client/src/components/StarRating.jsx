import React, { useState } from 'react';

const StarRating = ({ initialRating = 0, onRate }) => {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(initialRating);

  const handleClick = (value) => {
    setSelected(value);
    onRate(value);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          onClick={() => handleClick(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          style={{ cursor: 'pointer', color: (hovered || selected) >= n ? 'gold' : 'gray', fontSize: '1.2rem' }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
