import { createHmac } from "node:crypto"
import { faker } from "@faker-js/faker"
import 'dotenv/config'

export interface EventPayload {
  event_id: string
  name: string
  description: string
  date: string
  location: string
  totalTickets: number
}

export function generateEventPayload(): EventPayload {
  const event_id = `evt_${faker.string.alphanumeric({ length: 12 }).toLowerCase()}`
  return {
    event_id,
    name: faker.company.catchPhrase(),
    description: faker.lorem.paragraph(),
    date: faker.date.soon({ days: 365 }).toISOString(),
    location: faker.location.city(),
    totalTickets: faker.number.int({ min: 50, max: 500 }),
  }
}

async function main(): Promise<void> {
  const url = "http://localhost:3000/api/webhooks/events"
  const secret = process.env.WEBHOOK_SECRET
  if (!secret) {
    console.error("Set WEBHOOK_SECRET in your environment or .env file.")
    process.exit(1)
  }

  const payload = generateEventPayload()
  const body = JSON.stringify(payload)
  const signature = createHmac("sha256", secret).update(body).digest("hex")

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-signature": signature,
    },
    body,
  })

  const text = await res.text()
  console.log(`Response status: ${res.status}`)
  console.log(text)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})


