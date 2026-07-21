import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_booking_info",
  title: "Get booking info",
  description:
    "Return the booking URL and rebate guidance for Body Belonging Clinic. A free 15-minute intro call is available via the booking page.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const booking = {
      booking_url:
        "https://www.halaxy.com/profile/ms-lauren-lynch/social-worker/1772313",
      intro_call: "Free 15-minute intro call available via the booking page.",
      formats: ["In-person (Nedlands, WA)", "Telehealth Australia-wide"],
      rebates:
        "Medicare rebates MAY apply with an eligible Mental Health Treatment Plan or Eating Disorder Plan. Not guaranteed — check with your GP.",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(booking, null, 2) }],
      structuredContent: booking,
    };
  },
});
