/*!
 * License: MIT
 * Author: Yusuf YILDIZ
 * http://github.com/yusufff
 */

const WarningBgColor = "#FFFF80",
  InfoBgColor = "#EAFAEA",
  DebugBgColor = "#FFFFFF",
  ErrorBgColor = "#FFB3B3",
  TraceBgColor = "#FFFFFF",
  DefaultBgColor = "#FFFFFF",
  WarningColor = "#000000",
  InfoColor = "#000000",
  DebugColor = "#4DC3FF",
  ErrorColor = "#000000",
  TraceColor = "#888888",
  DefaultColor = "#000000";

const linebreakPattern = "@@"

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

          log.style.color = result.color;
          log.style.backgroundColor = result.bgColor;

          const cells = log.querySelectorAll("td");
          if (cells.length > 0) {
              cells.forEach(cell => {
                  cell.style.borderBottom = "1px solid #AAAAAA";
              });
          }

          const details = log.querySelectorAll(".logs__log-events-table__content:not(.formatted)");
          if (details.length > 0) {
              details.forEach(detail => {
                  detail.innerHTML = detail.innerHTML.replaceAll(linebreakPattern, '<br/>');
                  detail.classList.add("formatted");
              });
          }
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

          // colorize background and text color of row
          log.style.color = result.color;
          log.style.backgroundColor = result.bgColor;
          log.style.borderBottom = "1px solid #AAAAAA";

          // colorize cells of the summary row
          const cells = log.querySelectorAll(".logs-table__body-cell");
          if (cells.length > 0) {
            cells.forEach(cell => {
              cell.style.color = result.color;
              cell.style.backgroundColor = result.bgColor;
            });
          }

          // colorize and format (insert line breaks for @@ tokens) in log details table
          const details = log.querySelectorAll(".logs-insights-expanded-row table:not(.formatted)");
          if (details.length > 0) {
            details.forEach(detail => {
                detail.innerHTML = detail.innerHTML.replaceAll(linebreakPattern, '<br/>');
                detail.style.color = result.color;
                detail.style.backgroundColor = result.bgColor;
                detail.style.width = "95%";
                detail.style.whiteSpace = "initial";
                detail.classList.add("formatted");
            });
          }
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
  } else if (logMessageText.indexOf("FATAL") !== -1) {
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
