import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_approach",
  title: "Get the Body Belonging Model",
  description:
    "Return a summary of the Body Belonging Model — the clinic's neuro-affirming, eating-disorder-safe framework — plus a link to the full white paper.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const approach = {
      name: "The Body Belonging Model",
      summary:
        "ADHD is treated as a whole-of-you, self-regulation and emotional-regulation difference — not just an attention problem. We work with one system (mind, body, nervous system) rather than three separate problems.",
      principles: [
        "One system, not three problems — ADHD, food, and belonging are treated together.",
        "Neuro-affirming: difference, not deficit.",
        "Eating-disorder-safe: weight-neutral, additive (add, don't cut), no calorie or weight talk.",
        "Culturally safe and LGBTQIA+ affirming.",
        "Medication isn't the whole story — pro-treatment, not anti-medication.",
      ],
      white_paper_url: "https://www.bodybelongingclinic.com.au/adhd/body-belonging-model.pdf",
      approach_page: "https://www.bodybelongingclinic.com.au/adhd/approach",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(approach, null, 2) }],
      structuredContent: approach,
    };
  },
});
