const HEADER = ["Submitted at", "Full name", "Email", "What interests you", "Hours per week and start date"];

function neutralize(value) {
  const text = String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function reply(ok) {
  return ContentService.createTextOutput(JSON.stringify({ ok: ok })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (error) {
    return reply(false);
  }
  const fields = [body.name, body.email, body.interest, body.availability];
  if (!fields.every((field) => typeof field === "string")) return reply(false);

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADER);
    sheet.appendRow([new Date()].concat(fields.map(neutralize)));
  } finally {
    lock.releaseLock();
  }
  return reply(true);
}
