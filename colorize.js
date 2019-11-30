/*!
 * License: MIT
 * Author: Yusuf YILDIZ
 * http://github.com/yusufff
 */

const WarningColor = "#FFCC80",
  InfoColor = "#81D4FA",
  DebugColor = "#B0BEC5",
  ErrorColor = "#EF9A9A";

colorize = () => {
  const iframe = document.getElementById("microConsole-Logs");
  if (!iframe) return false;
  const innerDocument = iframe.contentDocument
    ? iframe.contentDocument
    : iframe.contentWindow;
  if (!innerDocument) return false;
  const logMessages = innerDocument.querySelectorAll(
    ".awsui-table-row:not(.colored)"
  );
  if (logMessages.length === 0) return false;

  logMessages.forEach(log => {
    const logMessageText = log.innerText;
    if (logMessageText) {
      let color;
      if (logMessageText.indexOf("INFO") !== -1) {
        color = InfoColor;
      } else if (logMessageText.indexOf("WARNING") !== -1) {
        color = WarningColor;
      } else if (logMessageText.indexOf("ERROR") !== -1) {
        color = ErrorColor;
      } else if (logMessageText.indexOf("DEBUG") !== -1) {
        color = DebugColor;
      }

      log.classList.add("colored");
      log.style.backgroundColor = color;
    }
  });
};

const colorizeInterval = setInterval(() => {
  window.requestAnimationFrame(colorize);
}, 1000);
