const colorize = (str: string): string => {
	var hash = 0;
	for (var i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	var color = (hash & 0x00ffffff).toString(16).toUpperCase();
	return "#" + "00000".substring(0, 6 - color.length) + color;
};

export default colorize;
