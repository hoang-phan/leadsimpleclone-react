import { TextField } from '@mui/material';

const LSTextField = ({required, label, value, onChange}: {
  required?: boolean,
  label: string,
  value: string,
  onChange: (value: string) => void,
}) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      className="font-semibold w-full min-h-[80px]"
      inputProps={{className: "!bg-[#E9ECF0]"}}
      onChange={({ target }) => onChange(target.value)}
      value={value}
      required={required}
      error={required && !value}
      helperText={required && !value ? `${label} is required` : ""}
    />
  );
};

export default LSTextField;
