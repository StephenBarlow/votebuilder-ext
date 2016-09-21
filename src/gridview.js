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
    var key = e.which;

    switch(key) {
      case 46: // .
        beginEntryMode();
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

  var dropdown = activeRow.find("select[name*='ResultID']").first();
  dropdown[0].selectedIndex = -1;
  fireChangeEvent(dropdown[0]);
  activeRow.find('select').prop('disabled', false);
  endEntryMode();
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
