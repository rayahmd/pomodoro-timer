"use client";

import { useState, useEffect, useRef } from "react";

const Timer = () => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(50);

    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    // pomodoro, short break, long break
    const [mode, setMode] = useState("pomodoro");

    //aktif atau ga di timer
    const toggle = () => {
        setIsActive(!isActive);
    }

    const reset = () => {
        setIsActive(false);
        setSeconds(0);
        setMinutes(50);
        setMode("pomodoro");
    };
    //switch mode
    const switchMode = (newMode: string) => {
        setIsActive(false);
        setMode(newMode);
        if (newMode === "pomodoro") {
            setMinutes(50);
        } else {
            setMinutes(10);
        }
        setSeconds(0);
    };

    //countdown
    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        // Timer selesai
                        setIsActive(false);
                        const audio = new Audio("/sound/alarm.wav");
                        audio.play();

                        if (mode === "pomodoro") {
                            setMode("break");
                            setMinutes(10);
                        } else {
                            setMode("pomodoro");
                            setMinutes(50);
                        }
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(intervalRef.current!);
        }

        return () => clearInterval(intervalRef.current!);
    }, [isActive, minutes, seconds]); // Dependency array

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-300 text-white">
            <h1 className="text-4xl font-bold mb-8">Pomodoro Timer by Rye</h1>

            <div className="bg-blue-500 p-8 w-xl h-1/3 rounded-2xl shadow-lg flex flex-col items-center">
                <div className="flex space-x-4 mb-8">
                    <button onClick={() => switchMode("pomodoro")} className={`px-4 py-2 rounded-full font-semibold ${mode === "pomodoro" ? "bg-green-600 text-white" : "bg-gray-700 text-gray-400"}`}>Pomodoro</button>
                    <button onClick={() => switchMode("break")} className={`px-4 py-2 rounded-full font-semibold ${mode === "break" ? "bg-yellow-600 text-white" : "bg-gray-700 text-gray-400"}`}>Break</button>
                </div>
                <div className="text-8xl font-extrabold mb-12">
                    <span>{minutes < 10 ? `0{$minutes}` : minutes}</span>:<span>{seconds < 10 ? `0${seconds}` : seconds}</span>
                </div>

                <div className="flex space-x-4">
                    <button onClick={toggle} className="px-6 py-3 rounded-md bg-blue-800 hover:bg-blue-600 font-semibold transition-colors duration-200"> {isActive ? "Pause" : "Start"}</button>
                    <button onClick={reset} className="px-6 py-3 rounded-md bg-red-500 hover:bg-red-400 font-semibold transition-colors duration-200">Reset</button>
                </div>
            </div>
        </div>

    );
};

export default Timer;