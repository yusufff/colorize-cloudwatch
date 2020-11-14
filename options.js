const token = document.querySelector('#LineBreakReplacementToken');
const tokenCheckbox = document.querySelector('#LineBreakReplacementEnabled')

function updatePreview(colorInput) {
    // color input fields are named like 'ErrorBgColor' or 'ErrorColor' / corresponding preview element is named like
    // 'ErrorPreview' => thus we can simply the suffix with 'Preview'
    let previewId = colorInput.id.replace('BgColor', 'Preview').replace('Color', 'Preview');
    let preview = document.querySelector('#' + previewId);
    if (colorInput.id.includes('BgColor')) {
        preview.style.backgroundColor = colorInput.value;
    } else {
        preview.style.color = colorInput.value;
    }
}

function applySettings(settings) {
    colors.forEach(color => {
       color.value = settings[color.id];
       updatePreview(color)
    });
    tokenCheckbox.checked = settings[tokenCheckbox.id];
    token.value = settings[token.id];
    token.disabled = !tokenCheckbox.checked;
}

function reportStatus(statusText) {
    var status = document.querySelector('#status');
    status.textContent = statusText;
    setTimeout(function() { status.textContent = ''; }, 1000);
}

const colors = document.querySelectorAll('input[type=color]');
if (colors.length > 0) {
  colors.forEach(color => {
        color.addEventListener('change', function() {
            updatePreview(this)
        });
  });
}

tokenCheckbox.addEventListener('change', function() { token.disabled = !this.checked; });

// Restores options using the preferences stored in chrome.storage.
document
    .addEventListener('DOMContentLoaded', function () {
        if (chrome.storage) {
            chrome.storage.sync.get({
              settings: settings
            }, function(items) { applySettings(items.settings); });
        }
    });

// Saves options to chrome.storage
document
    .querySelector('#save')
    .addEventListener('click', function() {
        colors.forEach(color => {
            settings[color.id] = color.value;
        });
        settings[tokenCheckbox.id] = tokenCheckbox.checked;
        settings[token.id] = token.value;

        if (chrome.storage) {
            chrome.storage.sync.set({
                settings: settings
            }, function() {
                // Update status to let user know options were saved.
                reportStatus("Options saved.");
            });
        }
    });

// Saves options to chrome.storage
document
    .querySelector('#reset')
    .addEventListener('click', function() {
        applySettings(settings.defaults)

        reportStatus("Options reset.");
    });