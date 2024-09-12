interface ButtonProps {
  className?: string;
  size?: "small" | "medium" | "large";
  fontSize?: "small" | "medium" | "large" | "xlarge";
  color?: "black" | "white";
  backgroundColor?: "PrimaryPink" | "PrimaryBlue" | "LightBlue" | "PrimaryRed";
  border?: string; // 버튼 테두리 속성
  onClick?: () => void;
  // disabled?: boolean; // 비활성화 여부
  children: React.ReactNode; // 버튼 내부 텍스트
}

const Button = ({
  className = "",
  size = "large",
  fontSize = "large",
  color = "white",
  backgroundColor = "PrimaryRed",
  border = "none",
  onClick,
  // disabled = false,
  children,
}: ButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`border cursor-pointer w-16 h-8 rounded-lg text-${fontSize} w-${size} bg-${backgroundColor} text-center content-center border-${border} text-${color} ${className}`}
    >
      {children}
    </div>
  );
};

export default Button;
