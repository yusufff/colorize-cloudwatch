/*!
 * License: MIT
 * Author: Yusuf YILDIZ
 * http://github.com/yusufff
 */

const WarningBgColor = "#FFFF80",
  InfoBgColor = "#EAFAEA",
  DebugBgColor = "#FFFFFF",
  ErrorBgColor = "#FF0000",
  TraceBgColor = "#FFFFFF",
  DefaultBgColor = "#FFFFFF",
  WarningColor = "#000000",
  InfoColor = "#000000",
  DebugColor = "#4DC3FF",
  ErrorColor = "#FFFFFF",
  TraceColor = "#AAAAAA",
  DefaultColor = "#000000";

colorize = () => {
  const iframe = document.getElementById("microConsole-Logs");
  if (!iframe) return false;
  const innerDocument = iframe.contentDocument
    ? iframe.contentDocument
    : iframe.contentWindow;
  if (!innerDocument) return false;

  colorizeLogGroup(innerDocument);
  colorizeLogInsights(innerDocument);

};

function colorizeLogGroup(innerDocument) {
    const logMessages = innerDocument.querySelectorAll(".awsui-table-row");
    if (logMessages.length === 0) return false;

    logMessages.forEach(log => {
        const logMessageText = log.innerText;
        if (logMessageText) {
          let result = getColorsByLogLevel(logMessageText)

          log.classList.add("colored");
          log.style.color = result.color;
          log.style.backgroundColor = result.bgColor;
          const cells = log.querySelectorAll("td");
          cells.forEach(cell => {
              cell.style.borderBottom = "1px solid #AAAAAA";
          });
        }
    });
}

function colorizeLogInsights(innerDocument) {
    const logMessagesInsightView = innerDocument.querySelectorAll(".logs-table__body-row");
    if (logMessagesInsightView.length === 0) return false;

    logMessagesInsightView.forEach(log => {
        const logMessageText = log.innerText;
        if (logMessageText) {
          let result = getColorsByLogLevel(logMessageText)

          const cells = log.querySelectorAll(".logs-table__body-cell");
          cells.forEach(cell => {
            cell.style.color = result.color;
            cell.style.backgroundColor = result.bgColor;
          });
          log.style.color = result.color;
          log.style.backgroundColor = result.bgColor;
          log.style.borderBottom = "1px solid #AAAAAA";
        }
    });
}

function getColorsByLogLevel(logMessageText) {
  var result = {}
  if (logMessageText.indexOf("INFO") !== -1) {
    result.color = InfoColor;
    result.bgColor = InfoBgColor;
  } else if (logMessageText.indexOf("WARN") !== -1) {
    result.color = WarningColor;
    result.bgColor = WarningBgColor;
  } else if (logMessageText.indexOf("ERROR") !== -1) {
    result.color = ErrorColor;
    result.bgColor = ErrorBgColor;
  } else if (logMessageText.indexOf("DEBUG") !== -1) {
    result.color = DebugColor;
    result.bgColor = DebugBgColor;
  } else if (logMessageText.indexOf("TRACE") !== -1) {
    result.color = TraceColor;
    result.bgColor = TraceBgColor;
  } else {
    result.color = DefaultColor;
    result.bgColor = DefaultBgColor;
  }
  return result;
}

const colorizeInterval = setInterval(() => {
  window.requestAnimationFrame(colorize);
}, 1000);
