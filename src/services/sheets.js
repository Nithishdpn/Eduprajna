// Google Apps Script Web App URL
// Replace with your deployed Google Apps Script URL
const SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL || 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

export const submitToSheet = async (sheetName, data) => {
  try {
    const payload = {
      sheet: sheetName,
      timestamp: new Date().toISOString(),
      ...data,
    };

    const response = await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    return { success: true };
  } catch (error) {
    console.error('Sheet submission error:', error);
    return { success: false, error: error.message };
  }
};

export const SHEET_NAMES = {
  ENROLLMENT: 'Enrollments',
  CALLBACK: 'Callbacks',
  HIRING: 'HiringLeads',
  CONTACT: 'ContactForms',
  POPUP: 'PopupLeads',
};
