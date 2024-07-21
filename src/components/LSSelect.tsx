import { Select, FormControl, InputLabel, MenuItem, FormHelperText, Typography } from '@mui/material';

const LSSelect = ({id, required, label, value, onChange, options}: {
  id: string,
  required: boolean,
  label: string,
  value: string,
  onChange: (value: string) => void,
  options: ({value: string, label: string, style?: any})[]
}) => {
  const error = required && !value;
  return (
    <FormControl className="w-full min-h-[80px]">
      <InputLabel id={`label-${id}`} error={error} required={required}>{label}</InputLabel>
      <Select
        label={label}
        id={id}
        labelId={`label-${id}`}
        value={value}
        onChange={({ target }) => onChange(target.value)}
        error={error}
        className="bg-[#E9ECF0]"
        required={required}
        renderValue={(val) => {
          const selected = options.find((option) => option.value === val);
          if (!selected) {
            return <Typography sx={{fontStyle: "italic"}}>None</Typography>;
          }
          return <Typography sx={selected.style}>{selected.label}</Typography>;
        }}
      >
        {options.map(({ value, label, style }) =>(
          <MenuItem key={value} value={value} style={style}>{label}</MenuItem>
        ))}
      </Select>
      {error && <FormHelperText error={error}>{label} is required</FormHelperText>}
    </FormControl>
  );
};

export default LSSelect;
