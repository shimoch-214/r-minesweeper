import { useEffect, useRef, useState } from "react";
import { useMineSweeperCtx } from "../../provider";

export function MineSweeperTimer(): JSX.Element {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(0);
  const { mineSweeper: ms } = useMineSweeperCtx();

  useEffect(() => {
    if (ms.status === "Failed" || ms.status === "Success") {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  }, [ms]);

  useEffect(() => {
    if (ms.status === "Init") {
      setTime(0);
    }
  }, [ms]);

  useEffect(() => {
    if (ms.status === "Started" && !isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }
  }, [ms, isRunning]);

  return <p>{Math.round(time / 1000)}</p>;
}
