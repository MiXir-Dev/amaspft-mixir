import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const applicationSchema = z.object({
  name: z.string().trim().min(1).max(100),
  instagram: z.string().trim().max(60),
  xHandle: z.string().trim().max(60),
  age: z.string().trim().min(1).max(3),
  country: z.string().trim().min(1).max(100),
  experience: z.enum(["new", "intermediate", "experimented"]),
});

type ApplicationData = z.infer<typeof applicationSchema>;

const cleanHandle = (value: string) => {
  return value.trim().replace(/^@+/, "").trim();
};

const escapeHtml = (value: string) => {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
};

const getExperienceLabel = (experience: ApplicationData["experience"]) => {
  if (experience === "experimented") return "expert";
  return experience;
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

  const lines: string[] = [
    "new application",
    escapeHtml(data.name),
  ];

  if (instagram) {
    lines.push(
      `<a href="${buildInstagramUrl(instagram)}">@${escapeHtml(instagram)}</a> (ig)`,
    );
  }

  if (xHandle) {
    lines.push(
      `<a href="${buildXUrl(xHandle)}">@${escapeHtml(xHandle)}</a> (x)`,
    );
  }

  lines.push(
    `${escapeHtml(data.age)} years old [${getExperienceLabel(data.experience)}]`,
  );

  lines.push(escapeHtml(data.country));

  return lines.join("\n");
};

export const sendTelegramApplication = createServerFn({ method: "POST" })
  .validator((data: unknown) => applicationSchema.parse(data))
  .handler(async ({ data }) => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      throw new Error("Missing Telegram environment variables.");
    }

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: buildTelegramMessage(data),
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Telegram message failed: ${errorText}`);
    }

    return { ok: true };
  });
