import React from "react";

interface HexagonProps {
  size?: "small" | "medium" | "large" | "xlarge";
  filled?: boolean;
  className?: string;
}

const HexagonBackground: React.FC<HexagonProps> = ({
  size = "medium",
  filled = false,
  className = "",
}) => {
  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-32 h-32",
    xlarge: "w-48 h-48",
  };

  return (
    <div
      className={`
        ${sizeClasses[size]} 
        clip-hexagon 
        ${filled ? "bg-primary" : "border-2 border-gray-300 bg-transparent"} 
        absolute
        ${className}
      `}
    />
  );
};

// ✅ Agregar el layout que faltaba
const HexagonBackgroundLayout: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <HexagonBackground
        size="xlarge"
        filled
        className="top-0 right-0 transform rotate-12"
      />

      <HexagonBackground
        size="large"
        filled
        className="bottom-0 left-0 transform -rotate-12"
      />

      <HexagonBackground
        size="medium"
        className="top-32 right-16 transform rotate-45"
      />
    </div>
  );
};

export { HexagonBackground, HexagonBackgroundLayout };
