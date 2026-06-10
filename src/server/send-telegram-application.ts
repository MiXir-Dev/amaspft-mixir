import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const applicationSchema = z.object({
  name: z.string().trim().min(1).max(100),
  instagram: z.string().trim().max(60),
  xHandle: z.string().trim().max(60),
  age: z.string().trim().min(1).max(3),
  country: z.string().trim().min(1).max(100),
  experience: z.enum(["new", "intermediate", "experienced"]),
});

type ApplicationData = z.infer<typeof applicationSchema>;

const cleanHandle = (value: string) => {
  return value
    .trim()
    .replace(/^https?:\/\/(www\.)?(instagram\.com|x\.com|twitter\.com)\//i, "")
    .replace(/^@+/, "")
    .replace(/^\/+/, "")
    .split("?")[0]
    .split("/")[0]
    .trim();
};

const escapeHtml = (value: string) => {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
};

const EXPERIENCE_LABELS: Record<ApplicationData["experience"], string> = {
  new: "New",
  intermediate: "Intermediate",
  experienced: "Experienced",
};

const getExperienceLabel = (experience: ApplicationData["experience"]) => {
  return EXPERIENCE_LABELS[experience];
};

const buildInstagramUrl = (handle: string) => {
  return `https://www.instagram.com/${encodeURIComponent(handle)}`;
};

const buildXUrl = (handle: string) => {
  return `https://x.com/${encodeURIComponent(handle)}`;
};

const buildTelegramMessage = (data: ApplicationData) => {
  const instagram = cleanHandle(data.instagram);
  const xHandle = cleanHandle(data.xHandle);

  const contactLines: string[] = [];

  if (instagram) {
    contactLines.push(
      `<b>Instagram:</b> <a href="${buildInstagramUrl(instagram)}">@${escapeHtml(instagram)}</a>`,
    );
  }

  if (xHandle) {
    contactLines.push(
      `<b>X:</b> <a href="${buildXUrl(xHandle)}">@${escapeHtml(xHandle)}</a>`,
    );
  }

  return [
    "<b>New Mentorship Application</b>",
    "",
    `<b>Name:</b> ${escapeHtml(data.name)}`,
    `<b>Age:</b> ${escapeHtml(data.age)}`,
    `<b>Country:</b> ${escapeHtml(data.country)}`,
    `<b>Experience:</b> ${getExperienceLabel(data.experience)}`,
    "",
    "<b>Contact</b>",
    ...contactLines,
  ].join("\n");
};

export const sendTelegramApplication = createServerFn({ method: "POST" })
  .validator((data: unknown) => applicationSchema.parse(data))
  .handler(async ({ data }) => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    console.log("Telegram application server function called");

    if (!botToken) {
      console.error("Missing TELEGRAM_BOT_TOKEN");
      throw new Error("Missing TELEGRAM_BOT_TOKEN");
    }

    if (!chatId) {
      console.error("Missing TELEGRAM_CHAT_ID");
      throw new Error("Missing TELEGRAM_CHAT_ID");
    }

    const message = buildTelegramMessage(data);

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );

    const responseText = await response.text();

    if (!response.ok) {
      console.error("Telegram sendMessage failed:", responseText);
      throw new Error(`Telegram sendMessage failed: ${responseText}`);
    }

    console.log("Telegram sendMessage succeeded:", responseText);

    return { ok: true };
  });
