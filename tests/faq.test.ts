import assert from 'node:assert/strict'
import { test } from 'node:test'
import { filterFaq, faqItems } from '../app/data/faq.ts'

test('FAQ filtering combines words and category without interpreting HTML', () => {
  assert.equal(filterFaq('  ', 'All topics').length, faqItems.length)
  assert.ok(filterFaq('BROKER partnership', 'Brokers & independence').length > 0)
  assert.equal(filterFaq('<script>alert(1)</script>', 'All topics').length, 0)
  assert.equal(filterFaq('coupon', 'Privacy & availability').length, 0)
  assert.ok(filterFaq('manual', 'Documents & records').length > 0)
})
