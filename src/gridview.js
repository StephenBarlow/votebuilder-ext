var activeRow = null;
var gridViewSelector = '#ctl00_ContentPlaceHolderVANPage_gvList tr:not(.thead):not(.tfoot)';
var entryMode = false;

$(document).ready(function() {

  // Certain keys aren't handled by keypress events
  $(window).keydown(function(e) {
    switch(e.which) {
      case 27: // esc
        endEntryMode();
        break;
      default:
        break;
    }
  });

  $(window).keypress(function(e) {

    // Don't listen to keyboard input if user is currently typing in textbox
    var focused = $(document.activeElement);
    if (focused.prop('nodeName') == 'TEXTAREA') {
      return;
    }

    var key = e.which;

    switch(key) {
      case 46: // .
        beginEntryMode();
        break;
      case 68: // D
        handleDemocrat();
        break;
      case 76: // L
        handleLaterVolunteer();
        break;
      case 77: // M
        handleMaybeVolunteer();
        break;
      case 78: // N
        handleNoVolunteer();
        break;
      case 89: // Y
        handleYesVolunteer();
        break;
      case 99: // c
        handleClear();
        break;
      case 100: // d
        handleDisconnected();
        break;
      case 106: // j
        rowUp();
        break;
      case 107: // k
        rowDown();
        break;
      case 109: // m
        handleMoved();
        break;
      case 110: // n
        handleNotHome();
        break;
      case 114: // r
        handleRefused();
        break;
      case 119: // w
        handleWrongNumber();
        break;
      default:
        break;
    }
  });
});

function handleClear() {
  if (activeRow == null || !entryMode) {
    return;
  }

  var dropdowns = activeRow.find("select");
  dropdowns.each(function() {
    $(this)[0].selectedIndex = -1;
    fireChangeEvent($(this)[0]);
  });
  activeRow.find('select').prop('disabled', false);
  endEntryMode();
}

function handleDemocrat() {
  if (activeRow == null || !entryMode) {
    return;
  }

  var dropdown = activeRow.find("select[name*='218380']").first();
  dropdown.val('920208');
  fireChangeEvent(dropdown[0]);
  endEntryMode();
  rowDown();
}

function handleNotHome() {
  if (activeRow == null || !entryMode) {
    return;
  }

  var dropdown = activeRow.find("select[name*='ResultID']").first();
  dropdown.val('1');
  fireChangeEvent(dropdown[0]);
  endEntryMode();
  rowDown();
}

function handleNoVolunteer() {
  if (activeRow == null || !entryMode) {
    return;
  }

  var dropdown = activeRow.find("select[name*='218386']").first();
  dropdown.val('920245');
  fireChangeEvent(dropdown[0]);
  endEntryMode();
  rowDown();
}

function handleYesVolunteer() {
  if (activeRow == null || !entryMode) {
    return;
  }

  var dropdown = activeRow.find("select[name*='218386']").first();
  dropdown.val('920243');
  fireChangeEvent(dropdown[0]);
  endEntryMode();
  rowDown();
}

function handleMaybeVolunteer() {
  if (activeRow == null || !entryMode) {
    return;
  }

  var dropdown = activeRow.find("select[name*='218386']").first();
  dropdown.val('920244');
  fireChangeEvent(dropdown[0]);
  endEntryMode();
  rowDown();
}

function handleLaterVolunteer() {
  if (activeRow == null || !entryMode) {
    return;
  }

  var dropdown = activeRow.find("select[name*='218386']").first();
  dropdown.val('920246');
  fireChangeEvent(dropdown[0]);
  endEntryMode();
  rowDown();
}

function handleRefused() {
  if (activeRow == null || !entryMode) {
    return;
  }

  var dropdown = activeRow.find("select[name*='ResultID']").first();
  dropdown.val('2');
  fireChangeEvent(dropdown[0]);
  endEntryMode();
  rowDown();
}

function handleMoved() {
  if (activeRow == null || !entryMode) {
    return;
  }

  var dropdown = activeRow.find("select[name*='ResultID']").first();
  dropdown.val('5').change();
  fireChangeEvent(dropdown[0]);
  endEntryMode();
  rowDown();
}

function handleWrongNumber() {
  if (activeRow == null || !entryMode) {
    return;
  }

  var dropdown = activeRow.find("select[name*='ResultID']").first();
  dropdown.val('20');
  fireChangeEvent(dropdown[0]);
  endEntryMode();
  rowDown();
}

function handleDisconnected() {
  if (activeRow == null || !entryMode) {
    return;
  }

  var dropdown = activeRow.find("select[name*='ResultID']").first();
  dropdown.val('25');
  fireChangeEvent(dropdown[0]);
  endEntryMode();
  rowDown();
}

function beginEntryMode() {
  if (entryMode) {
    return;
  }

  if (activeRow == null) {
    return;
  }

  activeRow.addClass('editrow');
  entryMode = true;
}

function endEntryMode() {
  entryMode = false;
  $(gridViewSelector).removeClass('editrow');
}

function fireChangeEvent(changedElement) {
  var changeEvent = document.createEvent("HTMLEvents");
  changeEvent.initEvent("change", true, true);
  changedElement.dispatchEvent(changeEvent);
}

function rowDown() {
  if (activeRow == null) {
    activeRow = $(gridViewSelector).first();
  } else {
    var newRow = activeRow.next(gridViewSelector).first();
    if (newRow.length != 0) {
      activeRow = newRow;
    }
  }
  updateActiveRow();
}

function rowUp() {
  if (activeRow == null) {
    activeRow = $(gridViewSelector).first();
  } else {
    var newRow = activeRow.prev(gridViewSelector).first();
    if (newRow.length != 0) {
      activeRow = newRow;
    }
  }
  updateActiveRow();
}

function updateActiveRow() {
  entryMode = false;
  $(gridViewSelector).removeClass('activerow');
  $(gridViewSelector).removeClass('editrow');
  activeRow.addClass('activerow');
}
