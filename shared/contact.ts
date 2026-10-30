export const contactTopics = [
  { value: 'general', label: 'General question' },
  { value: 'import', label: 'Document format question' },
  { value: 'feedback', label: 'Product feedback' },
  { value: 'institutions', label: 'Institutional inquiry' },
  { value: 'privacy', label: 'Privacy question' },
] as const
export interface ContactInput {
  name: string
  email: string
  topic: string
  message: string
  consent: boolean
  website: string
  startedAt: number
}
export type ContactErrors = Partial<Record<keyof ContactInput | 'form', string>>
export type ContactMessage = Pick<ContactInput, 'name' | 'email' | 'topic' | 'message' | 'consent'>

function hasControl(text: string, multiline = false): boolean {
  return [...text].some(character => {
    const code = character.charCodeAt(0)
    return code === 127 || (code < 32 && !(multiline && (code === 9 || code === 10)))
  })
}

export function validateContact(input: unknown): { errors: ContactErrors, message?: ContactMessage } {
  const errors: ContactErrors = {}
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { errors: { form: 'Check the form and try again.' } }
  const data = input as Record<string, unknown>
  const allowed = ['name', 'email', 'topic', 'message', 'consent', 'website', 'startedAt']
  if (Object.keys(data).some(key => !allowed.includes(key))) errors.form = 'Check the form and try again.'
  const text = (key: string) => typeof data[key] === 'string' ? (data[key] as string).trim() : ''
  const name = text('name')
  const email = text('email')
  const topic = text('topic')
  const message = text('message').replace(/\r\n?/g, '\n')
  if (name.length < 2 || name.length > 100 || hasControl(name)) errors.name = 'Enter a name between 2 and 100 characters.'
  if (email.length > 254 || hasControl(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email)) errors.email = 'Enter a valid email address.'
  if (!contactTopics.some(item => item.value === topic)) errors.topic = 'Choose a topic.'
  if (message.length < 20 || message.length > 4000 || hasControl(message, true)) errors.message = 'Enter a message between 20 and 4,000 characters.'
  if (data.consent !== true) errors.consent = 'Confirm that these contact details may be used to reply.'
  if (typeof data.website !== 'string' || data.website !== '') errors.form = 'The request could not be submitted. Reload the page and try again.'
  if (Object.keys(errors).length) return { errors }
  return { errors, message: { name, email, topic, message, consent: true } }
}

export function validContactTiming(startedAt: unknown, now: number): boolean {
  return typeof startedAt === 'number' && Number.isFinite(startedAt) && now - startedAt >= 2000 && now - startedAt <= 7_200_000
}
