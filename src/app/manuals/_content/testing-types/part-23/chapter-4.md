---
id: "tt-voice-conversational-ui-testing"
overlayNo: 92
title: "Voice / Conversational UI Testing"
minutes: 25
partName: "Part 23 · Incremental Integration, Spike, Session & Voice"
level: "intermediate"
overviewText: "Voice and conversational UI testing verifies intents, multi-turn context, and the words the user receives — not only that the API behind the bot still works."
why: "A correct leave API can still be wrapped by a bot that maps “sick leave” to casual, drops follow-up context, or guesses on unknown intents."
when: "As soon as a bot or voice skill is in scope, and whenever intents, utterances, or backend contracts change — including fallback and correction turns."
practical: {"app":"HRMS Leave-Balance Chatbot","scenario":"Botium convo: remaining leave, follow-up sick leave, plus a nonsense utterance.","fail":"Follow-up starts a new session; first turn returns casual balance when the user asked for sick leave.","pass":"Intents split, context kept, unknown-intent fallback passes on the same convo after the fix."}
advantages: ["Catches wrong answers, dropped context, and brittle NLU that API or UI tests never see","Botium (Community Edition) turns a conversation into a repeatable script, so a wording or intent change cannot silently break the happy path","Forces explicit coverage of fallback and clarification turns, which are where users actually get stuck","The same convo file documents the intended dialogue for product and support, not only for QA"]
limitations: ["Scripted convos still miss live speech noise, accents, and barge-in unless you add a real voice channel and audio tests","NLU is probabilistic — a passing utterance set is not every phrasing a user will try","Botium Community Edition covers the dialogue core; vendor-specific voice hardware and wake-words need extra tooling","A green bot test does not prove the leave engine itself is correct — that remains a payroll/leave functional concern"]
---

## Script the dialogue, including fallback

Assert the bot’s words and context, not only HTTP 200.
