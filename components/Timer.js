import React from "react";
import { FiBellOff } from "react-icons/fi";

export default function Timer({
	stage,
	switchStage,
	getTickingTime,
	seconds,
	ticking,
	startTimer,
	isTimeUp,
	muteAlarm,
	reset,
}) {
	const options = ["Pomodoro", "Short Break", "Long Break"];
	return (
		<div className="w-10/12 mx-auto pt-5 text-white flex flex-col justify-center items-center mt-10">
			<div className="flex gap-5 items-center">
				{options.map((option, index) => {
					return (
						<h1
							key={index}
							className={` ${
								index === stage ? "bg-gray-500 bg-opacity-30" : ""
							} p-1 cursor-pointer transition-all rounded`}
							onClick={() => switchStage(index)}
						>
							{option}
						</h1>
					);
				})}
			</div>
			<div className="mt-10 mb-10">
				<h1 className="text-8xl font-bold select-none m-0">
					{getTickingTime()}:{seconds.toString().padStart(2, "0")}
				</h1>
			</div>
			<div className="flex gap-2 items-center">
				<button
					className="px-16 py-2 text-2xl rounded-md bg-white text-blue-500 uppercase font-bold"
					onClick={startTimer}
				>
					{ticking ? "Stop" : "Start"}
				</button>
				{isTimeUp && (
					<FiBellOff
						className="text-3xl text-white cursor-pointer"
						onClick={muteAlarm}
					/>
				)}
			</div>
			{ticking && (
				<button className="uppercase text-white underline mt-5" onClick={reset}>
					Reset
				</button>
			)}
		</div>
	);
}
