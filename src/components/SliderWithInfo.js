import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

function valuetext(value) {
  return `${value}°C`;
}


export default function SliderWithInfo({label, min , max, step , value , symbol, setValue}) {

  const marks = [
    {
      value: min,
      label: `${symbol} ${min}`,
    },
    {
      value: max,
      label: `${symbol} ${max}`,
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
       <Typography id="input-slider" gutterBottom>
        {label}
        </Typography>
        <div><h3>{symbol} {value}</h3></div>
      <Slider
        aria-label="Small steps"
        defaultValue={value}
        value={value}
        getAriaValueText={valuetext}
        step={step}
        marks = {marks}
        min={min}
        max={max}
        valueLabelDisplay="auto"
        onChange={(e)=>{
          setValue(e.target.value);
        }}
      />
    </Box>
  );
}