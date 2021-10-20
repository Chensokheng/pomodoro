import React from "react";
import { FiSettings, FiAperture } from "react-icons/fi";

function Navigation({ setOpenSetting }) {
	console.log("I rebuild");
	return (
		<>
			<nav className="pt-5 flex justify-between w-11/12 mx-auto">
				<div className="flex gap-1 items-center cursor-pointer">
					<FiAperture className="text-white text-sm" />
					<h1 className="text-white">Daily Focus</h1>
				</div>
				<FiSettings
					className="text-white text-2xl cursor-pointer"
					onClick={() => setOpenSetting(true)}
				/>
			</nav>
		</>
	);
}

export default React.memo(Navigation);
