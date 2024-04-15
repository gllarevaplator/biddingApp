import { FormikHandlers } from "formik";
import TextField from "@mui/material/TextField";

interface InputFormProps {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string | number;
  handleChange: FormikHandlers["handleChange"];
  touched: boolean | undefined;
  errors: string | undefined;
}

const InputForm: React.FC<InputFormProps> = ({
  id,
  name,
  type,
  label,
  value,
  handleChange,
  touched,
  errors,
}) => {
  return (
    <>
      <TextField
        error={touched && !!errors}
        helperText={touched && errors ? errors : ""}
        id={id}
        name={name}
        type={type}
        label={label}
        value={value}
        onChange={handleChange}
        variant="outlined"
      />
    </>
  );
};

export default InputForm;
