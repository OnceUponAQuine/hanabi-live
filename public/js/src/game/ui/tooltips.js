// Imports
const globals = require('./globals');

exports.init = (element, content, delayed, customContent) => {
    element.on('mousemove', function mouseMove() {
        globals.activeHover = this;
        if (!delayed) {
            show(this);
        } else {
            setTimeout(() => {
                show(this);
            }, globals.tooltipDelay);
        }
    });
    element.on('mouseout', () => {
        globals.activeHover = null;
        $(`#tooltip-${element.tooltipName}`).tooltipster('close');
    });
    if (!customContent) {
        content = `<span style="font-size: 0.75em;"><i class="fas fa-info-circle fa-sm"></i> &nbsp;${content}</span>`;
    }
    $(`#tooltip-${element.tooltipName}`).tooltipster('instance').content(content);
};

const show = (element) => {
    // Don't do anything if we are no longer in the game
    if (globals.lobby.currentScreen !== 'game') {
        return;
    }

    // Don't do anything if the user has moved the mouse away in the meantime
    if (globals.activeHover !== element) {
        return;
    }

    // Don't do anything if this element has an arrow that is showing
    if (element.arrow && element.arrow.getVisible()) {
        return;
    }

    const tooltip = $(`#tooltip-${element.tooltipName}`);
    const pos = element.getAbsolutePosition();
    const tooltipX = element.getWidth() / 2 + pos.x;
    tooltip.css('left', tooltipX);
    tooltip.css('top', pos.y);
    tooltip.tooltipster('open');
};
exports.show = show;
