import DOMPurify from "dompurify";

export const sanitizeHtml = (html: string): string => {
  if (!html) return "";

  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });
};

export default sanitizeHtml;
