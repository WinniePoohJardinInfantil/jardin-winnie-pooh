"use client";
import Lottie from "lottie-react";
import { CSSProperties } from "react";

interface LottieProps {
  animationData: Record<string, unknown>; 
  className?: string;
  style?: CSSProperties; // Añadimos esta línea para que acepte estilos de React
}

export default function LottieAnimation({ animationData, className, style }: LottieProps) {
  return (
    <div className={className} style={style}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}