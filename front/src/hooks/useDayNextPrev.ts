export function useDayNextPrev(
	selectedDate: Date | null,
	dateNavigate: (date: string) => void,
) {
	function formatDate(date: Date) {
		return date.toISOString().split("T")[0].replaceAll("-", "");
	}

	function previousDay() {
		if (!selectedDate) {
			return null;
		}
		const prev = new Date(selectedDate);

		// last thu is 3 days ago if sunday
		const difference = selectedDate.getDay() === 0 ? 3 : 1;
		prev.setDate(prev.getDate() - difference);

		dateNavigate(formatDate(prev));
	}

	function nextDay() {
		if (!selectedDate) {
			return null;
		}
		const next = new Date(selectedDate);

		// next sunday is 3 days into the future if thu
		const difference = selectedDate.getDay() === 4 ? 3 : 1;
		next.setDate(next.getDate() + difference);

		dateNavigate(formatDate(next));
	}

	return { previousDay, nextDay };
}
