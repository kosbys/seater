import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<Button
			variant="ghost"
			size="lg"
			onClick={toggleTheme}
			aria-label="Toggle theme"
			className="relative"
		>
			<Sun
				className={`h-8 w-8 size-2 transition-all ${
					theme === "dark" ? "scale-0 rotate-90" : "scale-100 rotate-0"
				}`}
			/>
			<Moon
				className={`absolute h-8 w-8 size-2 transition-all ${
					theme === "dark" ? "scale-100 rotate-0" : "scale-0 -rotate-90"
				}`}
			/>
		</Button>
	);
}

export { ThemeToggle };
