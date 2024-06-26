export const debounce = <T extends (...args: never[]) => void>(
	callback: T,
	delay: number
): ((...args: Parameters<T>) => void) => {
	let timer: ReturnType<typeof setTimeout>;
	return (...args: Parameters<T>) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			callback(...args);
		}, delay);
	};
};
