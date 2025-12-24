export const CONTACT_EMAIL = 'chieflivegaming@gmail.com';

type BuildMailtoOptions = {
  to?: string;
  subject?: string;
  body?: string;
};

export function buildMailto({ to, subject, body }: BuildMailtoOptions = {}) {
  const email = to ?? CONTACT_EMAIL;
  const params = new URLSearchParams();

  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);

  const query = params.toString();
  return query ? `mailto:${email}?${query}` : `mailto:${email}`;
}
