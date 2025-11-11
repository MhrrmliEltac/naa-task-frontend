import { type UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  error?: string;
}

const FormInput = ({
  id,
  name,
  label,
  type = "text",
  placeholder,
  register,
  error,
}: FormInputProps) => {
  return (
    <label
      htmlFor={id}
      className="flex flex-col gap-2 text-[14px] font-medium font-lato leading-3.5 text-[#374151]"
    >
      {label}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        {...register}
        className="border border-[#F7F7F7] rounded-[10px] outline-none p-3"
      />
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </label>
  );
};

export default FormInput;
