import { useState } from "react";
import "./calculator.css";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const chooseOperation = (op: string) => {
    if (previousValue === null) {
      setPreviousValue(parseFloat(display));
    } else if (operation) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setPreviousValue(result);
      setDisplay(String(result));
    }
    setOperation(op);
    setWaitingForNewValue(true);
  };

  const calculate = (a: number, b: number, op: string) => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return b === 0 ? 0 : a / b;
      default:
        return b;
    }
  };

  const equals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>

      <div className="buttons">
        <button onClick={clear} className="span-two">
          AC
        </button>
        <button onClick={() => chooseOperation("÷")}>÷</button>
        <button onClick={() => chooseOperation("×")}>×</button>

        <button onClick={() => inputNumber("7")}>7</button>
        <button onClick={() => inputNumber("8")}>8</button>
        <button onClick={() => inputNumber("9")}>9</button>
        <button onClick={() => chooseOperation("-")}>−</button>

        <button onClick={() => inputNumber("4")}>4</button>
        <button onClick={() => inputNumber("5")}>5</button>
        <button onClick={() => inputNumber("6")}>6</button>
        <button onClick={() => chooseOperation("+")}>+</button>

        <button onClick={() => inputNumber("1")}>1</button>
        <button onClick={() => inputNumber("2")}>2</button>
        <button onClick={() => inputNumber("3")}>3</button>
        <button onClick={equals} className="equals">
          =
        </button>

        <button onClick={() => inputNumber("0")} className="span-two">
          0
        </button>
        <button onClick={inputDecimal}>.</button>
      </div>
    </div>
  );
};

export default Calculator;
