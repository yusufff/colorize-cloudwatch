/*!
 * License: MIT
 * Author: Yusuf YILDIZ
 * http://github.com/yusufff
 */

const WarningColor = '#FFCC80',
			InfoColor = '#81D4FA',
			DebugColor = '#B0BEC5',
			ErrorColor = '#EF9A9A';

colorize = () => {
	const logGroups = document.querySelectorAll('.cwdb-log-viewer-table-row-group:not(.colored)');

	if ( logGroups.length === 0 ) return false;

	logGroups.forEach(log => {
		const logMessage = log.querySelector('.cwdb-log-viewer-table-column-message');
		if ( logMessage ) {
			const logMessageText = logMessage.innerText;
			let color;
			if ( logMessageText.indexOf('INFO') !== -1 ) {
				color = InfoColor;
			} else if ( logMessageText.indexOf('WARNING') !== -1 ) {
				color = WarningColor;
			} else if ( logMessageText.indexOf('ERROR') !== -1 ) {
				color = ErrorColor;
			} else if ( logMessageText.indexOf('DEBUG') !== -1 ) {
				color = DebugColor;
			}

			log.classList.add('colored');
			log.style.backgroundColor = color;
		}
	})
}

const colorizeInterval = setInterval(() => {
	window.requestAnimationFrame(colorize);
}, 1000)