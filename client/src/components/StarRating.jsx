import React, { useState } from 'react';
import { Box } from '@mui/material';

const StarRating = ({ initialRating = 0, onRate }) => {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(initialRating);

  const handleClick = (value) => {
    setSelected(value);
    onRate(value);
  };

  return (
    <Box display="flex" gap={0.5}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Box
          key={n}
          component="span"
          onClick={() => handleClick(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          sx={{
            cursor: 'pointer',
            fontSize: '1.5rem',
            color: (hovered || selected) >= n ? 'gold' : 'grey.400',
            transition: 'color 0.2s',
          }}
        >
          ★
        </Box>
      ))}
    </Box>
  );
};

export default StarRating;
