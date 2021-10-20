import { Provider, atom } from "jotai";
import React from "react";

export const countAtom = atom(50);

export default function GlobalState({ children }) {
	return <Provider>{children}</Provider>;
}
