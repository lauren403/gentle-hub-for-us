import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_clinic_info",
  title: "Get clinic info",
  description:
    "Return Body Belonging Clinic contact details, address, telehealth availability, and identity statement.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: "Body Belonging Clinic",
      tagline:
        "Neuro-affirming ADHD therapy and support — Aboriginal-led, LGBTQIA+ affirming, eating-disorder-informed.",
      address: {
        street: "3A Megalong Street",
        suburb: "Nedlands",
        state: "WA",
        postcode: "6009",
        country: "Australia",
      },
      email: "admin@bodybelongingclinic.com.au",
      telehealth: "Available Australia-wide",
      website: "https://www.bodybelongingclinic.com.au/adhd",
      identity: [
        "Aboriginal-led",
        "LGBTQIA+ affirming",
        "Neurodivergent-affirming",
        "Culturally safe",
      ],
      scope:
        "The clinic provides therapy and support. It does not diagnose ADHD or prescribe medication — it can refer for those.",
      disclaimer: "Education & wellbeing service, not a crisis service. In an emergency call 000.",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
