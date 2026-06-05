const WHATSAPP_NUMBER = '919876543210'; // Replace with actual number

export const openWhatsApp = (message = '') => {
  const defaultMsg = message || 'Hi! I\'m interested in your courses at EduPrajna. Please share more details.';
  const encoded = encodeURIComponent(defaultMsg);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
};

export const openWhatsAppForCourse = (courseName) => {
  const msg = `Hi! I'm interested in the *${courseName}* course at EduPrajna. Please share batch details and enrollment process.`;
  openWhatsApp(msg);
};

export const openWhatsAppHiring = (companyName = '') => {
  const msg = `Hi! ${companyName ? `I'm from ${companyName} and ` : ''}I want to hire trained candidates from EduPrajna. Please share the hiring process.`;
  openWhatsApp(msg);
};
