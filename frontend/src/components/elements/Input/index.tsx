import { useState } from "react";

interface InputProps {
  label?: string;
  className?: string;
  size?: "small" | "medium" | "large";
  fontSize?: "small" | "medium" | "large" | "xlarge";
  borderRadius?: "none" | "small" | "medium" | "large";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
  validate?: (value: string) => string | undefined;
}

const Input = ({
  label = "",
  className = "",
  size = "large",
  fontSize = "large",
  borderRadius = "medium",
  placeholder = "",
  value = "",
  onChange,
  onKeyUp,
  type = "text",
  disabled = false,
  validate,
}: InputProps) => {
  const [error, setError] = useState<string | undefined>(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);

    if (validate) {
      const validationResult = validate(e.target.value);
      setError(validationResult);
    }
  };

  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyUp={onKeyUp}
        disabled={disabled}
        className={`border w-${size} h-8 text-${fontSize} bg-white text-black border-black rounded-${borderRadius} px-4 ${className} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
      {error
        ? validate &&
          value && <p className="text-red-500 text-[12px] mt-1">{error}</p>
        : validate &&
          value && (
            <p className="text-green-500 text-[12px] mt-1">
              사용 가능한 {label} 입니다
            </p>
          )}
    </div>
  );
};

export default Input;
