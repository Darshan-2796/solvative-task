import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./SearchBox.css";

type SeachBoxProps = {
	onSearch: (query: string) => void;
};

const SearchBox = ({ onSearch }: SeachBoxProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [query, setQuery] = useState("");

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value);

		if (event.target.value.length >= 3 || event.target.value.length === 0) {
			onSearch(event.target.value);
		}
	};

	const focusInput = () => {
		inputRef.current!.focus();
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if ((event.ctrlKey || event.metaKey) && event.key === "/") {
				focusInput();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<div className="search-box-container">
			<input
				ref={inputRef}
				className="search-box"
				type="text"
				value={query}
				onChange={handleInputChange}
				placeholder="Search places..."
			/>
			<div className="keyboard-shortcut">Ctrl + /</div>
		</div>
	);
};

export default SearchBox;
