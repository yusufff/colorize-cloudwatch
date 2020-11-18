/*!
 * License: MIT
 * Author: Yusuf YILDIZ
 * http://github.com/yusufff
 */

function loadSettings() {
    chrome.storage.sync.get({
      settings: settings
    }, function(items) { settings = items.settings; });
}

function getColorsByLogLevel(logMessageText) {
  var result = {}
  if (logMessageText.indexOf("INFO") !== -1) {
    result.color = settings.InfoColor;
    result.bgColor = settings.InfoBgColor;
  } else if (logMessageText.indexOf("WARN") !== -1) {
    result.color = settings.WarningColor;
    result.bgColor = settings.WarningBgColor;
  } else if (logMessageText.indexOf("ERROR") !== -1) {
    result.color = settings.ErrorColor;
    result.bgColor = settings.ErrorBgColor;
  } else if (logMessageText.indexOf("FATAL") !== -1) {
      result.color = settings.ErrorColor;
      result.bgColor = settings.ErrorBgColor;
  } else if (logMessageText.indexOf("DEBUG") !== -1) {
    result.color = settings.DebugColor;
    result.bgColor = settings.DebugBgColor;
  } else if (logMessageText.indexOf("TRACE") !== -1) {
    result.color = settings.TraceColor;
    result.bgColor = settings.TraceBgColor;
  } else {
    result.color = settings.DefaultColor;
    result.bgColor = settings.DefaultBgColor;
  }
  return result;
}

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
                  if (settings.LineBreakReplacementEnabled) {
                     detail.innerHTML = detail.innerHTML.replaceAll(settings.LineBreakReplacementToken, '<br/>');
                  }
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
                if (settings.LineBreakReplacementEnabled) {
                    detail.innerHTML = detail.innerHTML.replaceAll(settings.LineBreakReplacementToken, '<br/>');
                }
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

const colorizeInterval = setInterval(() => {
  loadSettings();
  window.requestAnimationFrame(colorize);
}, 1000);
