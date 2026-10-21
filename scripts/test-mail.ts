import { mailtrapClient, sender } from "../app/lib/mailtrap/mailtrap.config";

async function main() {
    console.log("token starts with:", process.env.MAILTRAP_TOKEN?.slice(0, 4));

  try {
    const res = await mailtrapClient.send({
      from: sender,
      to: [{ email: "shiiqaalow99@gmail.com" }],
      subject: "Mailtrap test",
      text: "If you see this, sending works.",
    });
    console.log("SUCCESS", res);
  } catch (error: any) {
    console.log("FAILED", error?.message);
    console.log("status:", error?.cause?.response?.status);
    console.log("body:", JSON.stringify(error?.cause?.response?.data));
  }
}

main();