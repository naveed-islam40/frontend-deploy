import * as React from 'react';
import Box from '@mui/material/Box';

export default function DaisyRating({ onChange, lowerLabel, upperLabel }) {
    const [value, setValue] = React.useState(5); // Assuming default value is 1.5 (3 halves)

    const handleRatingChange = (newValue) => {
        setValue(newValue);
        onChange(newValue / 2); // Each step represents half a star
    };

    return (
        <Box sx={{ width: 800, display: 'flex', alignItems: 'center', flexDirection: "column" }}>
            <div className="rating rating-lg rating-half">
                {[...Array(10)].map((_, index) => (
                    <input
                        key={index}
                        type="radio"
                        name="rating-10"
                        className={`mask mask-star-2 bg-orange-400 ${index % 2 === 0 ? 'mask-half-1' : 'mask-half-2'}`}
                        checked={value === index + 1}
                        onChange={() => handleRatingChange(index + 1)}
                    />
                ))}
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, gap: "80px" }}>
                <span className='text-sm text-slate-600 mt-1'>{lowerLabel}</span>
                <span className='text-sm text-slate-600 mt-1'>{upperLabel}</span>
            </Box>
        </Box>
    );
}
