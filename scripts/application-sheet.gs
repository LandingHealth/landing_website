const HEADER = ["Submitted at", "Full name", "Email", "What interests you", "Hours per week and start date", "Resume"];
// Script property RESUME_FOLDER_ID names the Drive folder that receives uploaded resumes.
const RESUME_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

function saveResume(resume, applicant) {
  if (!resume) return "";
  if (typeof resume.data !== "string" || RESUME_TYPES.indexOf(resume.type) === -1) return "";
  const folderId = PropertiesService.getScriptProperties().getProperty("RESUME_FOLDER_ID");
  const folder = folderId ? DriveApp.getFolderById(folderId) : DriveApp.getRootFolder();
  const name = applicant + " - " + String(resume.name || "resume").slice(0, 200);
  const blob = Utilities.newBlob(Utilities.base64Decode(resume.data), resume.type, name);
  return folder.createFile(blob).getUrl();
}

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

  let resumeUrl = "";
  try {
    resumeUrl = saveResume(body.resume, body.name);
  } catch (error) {
    return reply(false);
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADER);
    sheet.appendRow([new Date()].concat(fields.map(neutralize), [resumeUrl]));
  } finally {
    lock.releaseLock();
  }
  return reply(true);
}
