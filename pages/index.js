import React, { useRef, useState, useEffect } from "react";
import ModalSetting from "../components/ModalSetting";
import Alarm from "../components/Alarm";
import Navigation from "../components/Navigation";
import Timer from "../components/Timer";
import About from "../components/About";

export default function Home() {
	const [POMODORO, SHORTBREAK, LONGBREAK] = [25, 5, 10];

	const [openSetting, setOpenSetting] = useState(false);
	const [ticking, setTicking] = useState(false);
	const [isTimeUp, setIsTimeUp] = useState(false);

	const [poromodo, setPomodo] = useState(POMODORO);
	const [shortBreak, setShortBreak] = useState(SHORTBREAK);
	const [longBreak, setLongBreak] = useState(LONGBREAK);
	const [seconds, setSeconds] = useState(0);
	const [stage, setStage] = useState(0);
	const [consumedSecond, setConsumedSecond] = useState(0);

	const pomodoroRef = useRef();
	const shortBreakRef = useRef();
	const longBreakRef = useRef();
	const alarmRef = useRef();

	const updateTimeDefaultValue = () => {
		setPomodo(pomodoroRef.current.value);
		setShortBreak(shortBreakRef.current.value);
		setLongBreak(longBreakRef.current.value);
	};

	const getTickingTime = () => {
		const timeStage = {
			0: poromodo,
			1: shortBreak,
			2: longBreak,
		};
		return timeStage[stage];
	};

	const updateMinute = () => {
		const updateStage = {
			0: setPomodo,
			1: setShortBreak,
			2: setLongBreak,
		};
		return updateStage[stage];
	};

	const switchStage = (index) => {
		const isYes =
			consumedSecond && stage !== index
				? confirm("Are you sure you want to switch?")
				: false;
		if (isYes) {
			reset();
			setStage(index);
		} else if (!consumedSecond) {
			setStage(index);
			setIsTimeUp(false);
		}
	};

	const reset = () => {
		setConsumedSecond(0);
		setTicking(false);
		setPomodo(POMODORO);
		setShortBreak(SHORTBREAK);
		setLongBreak(LONGBREAK);
		setSeconds(0);
	};

	const timeUp = () => {
		reset();
		setIsTimeUp(true);
		alarmRef.current.play();
	};

	const clockTicking = () => {
		const minutes = getTickingTime();
		const setMinutes = updateMinute();
		if (minutes === 0 && seconds === 0) {
			timeUp();
		} else if (seconds === 0) {
			setMinutes((minute) => minute - 1);
			setSeconds(59);
		} else {
			setSeconds((second) => second - 1);
		}
	};
	const startTimer = () => {
		setIsTimeUp(false);
		muteAlarm();
		setTicking((ticking) => !ticking);
	};

	const muteAlarm = () => {
		alarmRef.current.pause();
		alarmRef.current.currentTime = 0;
	};

	useEffect(() => {
		window.onbeforeunload = () => {
			return consumedSecond ? "Show warning" : null;
		};

		const timer = setInterval(() => {
			if (ticking) {
				setConsumedSecond((value) => value + 1);
				clockTicking();
			}
		}, 1000);
		if (isTimeUp) {
			clearInterval(timer);
		}
		return () => {
			clearInterval(timer);
		};
	}, [poromodo, shortBreak, longBreak, ticking, seconds]);

	return (
		<>
			<div className="min-h-screen  bg-gray-900 font-inter">
				<div className="max-w-2xl mx-auto min-h-screen flex flex-col">
					<Navigation setOpenSetting={setOpenSetting} />
					<div className="mt-10">
						<Timer
							switchStage={switchStage}
							getTickingTime={getTickingTime}
							stage={stage}
							ticking={ticking}
							startTimer={startTimer}
							seconds={seconds}
							muteAlarm={muteAlarm}
							isTimeUp={isTimeUp}
							reset={reset}
						/>
					</div>
					<About />
				</div>
				<ModalSetting
					openSetting={openSetting}
					setOpenSetting={setOpenSetting}
					pomodoroRef={pomodoroRef}
					shortBreakRef={shortBreakRef}
					longBreakRef={longBreakRef}
					updateTimeDefaultValue={updateTimeDefaultValue}
				/>
				<Alarm ref={alarmRef} />
			</div>
		</>
	);
}
