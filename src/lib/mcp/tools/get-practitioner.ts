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
        "Neuroaffirming, weight-neutral and trauma-informed. Aboriginal-led and LGBTQIA+ affirming, with cultural safety defined by the person receiving the service. Eating-disorder-informed support is designed to reduce common risks but is not suitable for everyone.",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(practitioner, null, 2) }],
      structuredContent: practitioner,
    };
  },
});
