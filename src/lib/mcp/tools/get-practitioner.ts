import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_practitioner",
  title: "Get practitioner",
  description:
    "Return practitioner details for Body Belonging Clinic (Lauren Lynch), including credentials stated factually.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const practitioner = {
      name: "Lauren Lynch",
      pronouns: null,
      identity: "A proud Yorta Yorta woman.",
      credentials: [
        "Accredited Mental Health Social Worker (AASW)",
        "ANZAED Credentialed Eating Disorder Clinician",
      ],
      approach:
        "Neuro-affirming, weight-neutral, trauma-informed, culturally safe. Works with ADHD, emotional regulation, and eating-disorder-safe care.",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(practitioner, null, 2) }],
      structuredContent: practitioner,
    };
  },
});
