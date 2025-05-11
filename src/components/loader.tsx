import React from "react";

export default function Loader() {
	return (
		<div className="flex items-center space-x-2 animate-pulse px-4 py-2">
			<div className="w-3 h-3 bg-gray-400 rounded-full"></div>
			<div className="w-3 h-3 bg-gray-400 rounded-full delay-75"></div>
			<div className="w-3 h-3 bg-gray-400 rounded-full delay-150"></div>
		</div>
	);
}
