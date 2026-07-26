import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_approach",
  title: "Get the Body Belonging practice framework",
  description:
    "Return a scope-aware summary of the Body Belonging practice framework and a link to its working paper.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const approach = {
      name: "The Body Belonging practice framework",
      summary:
        "A therapeutic framework for exploring how attention, emotion, eating, identity and context may interact. It is not a validated stand-alone treatment model or a biological explanation of ADHD.",
      principles: [
        "Connected experiences, not a single cause.",
        "Neuro-affirming: difference, not deficit.",
        "Designed to reduce common eating-disorder-related risks: weight-neutral, additive and non-restrictive.",
        "Aboriginal-led and LGBTQIA+ affirming; cultural safety is determined by the person receiving the service.",
        "Therapy can complement medical treatment and does not replace assessment, prescribing or review.",
      ],
      evaluation_status: "Independent multidisciplinary review and outcome evaluation pending.",
      white_paper_url: "https://adhd.bodybelongingclinic.com.au/body-belonging-model.pdf",
      approach_page: "https://adhd.bodybelongingclinic.com.au/approach",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(approach, null, 2) }],
      structuredContent: approach,
    };
  },
});
