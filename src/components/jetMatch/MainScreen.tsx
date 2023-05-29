import React from "react";
interface SquareProps {
  nombre: string;
  inicial: number;
  final: number;
}

export default function MainScreen() {
  return (
    <div className="bg-[#FFFFFF] p-2 flex flex-col items-center justify-center">
      <p className="text-black">MainScreen</p>{" "}
      <p className="text-[#75CCEB]">OLA</p>{" "}
      <Cuadrado nombre="Hola" inicial={12} final={68} />
    </div>
  );
}

const Cuadrado: React.FC<SquareProps> = ({ nombre, inicial, final }) => {
  const cuadrados: JSX.Element[] = [];

  // const totalCuadrados = Math.min(final, inicial + 8); // Asegurarse de que haya como máximo 8 cuadrados por fila
  const totalCuadrados = final;
  for (let i = 0; i < totalCuadrados; i++) {
    const isPintado = i < inicial; // Verificar si el cuadrado debe estar pintado o no

    // width: "20px",
    // height: "20px",
    const estilo = {
      backgroundColor: isPintado ? "#75CCEB" : "transparent",
      border: isPintado ? "1px solid #F2F2F2" : "1px solid #ccc",
      display: "inline-block",
    };

    //   cuadrados.push(<div key={i} style={estilo}></div>);
    cuadrados.push(
      <div key={i} style={estilo} className="cuadricula-item"></div>
    );
  }

  return (
    <div>
      <h3>{nombre}</h3>
      <div className="flex justify-center items-center">
        <div className="cuadricula ">{cuadrados}</div>
      </div>
    </div>
  );
};
