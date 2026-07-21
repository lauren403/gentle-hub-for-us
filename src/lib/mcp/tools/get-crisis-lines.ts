import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_crisis_lines",
  title: "Get Australian crisis lines",
  description:
    "Return Australian crisis and support phone lines. Body Belonging Clinic is not a crisis service.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const lines = {
      note: "Body Belonging Clinic is an education & wellbeing service, not a crisis service.",
      emergency: { name: "Emergency", number: "000" },
      lines: [
        { name: "Lifeline", number: "13 11 14" },
        { name: "13YARN (Aboriginal & Torres Strait Islander support)", number: "13 92 76" },
        { name: "Butterfly Foundation (eating disorders)", number: "1800 33 4673" },
      ],
    };
    return {
      content: [{ type: "text", text: JSON.stringify(lines, null, 2) }],
      structuredContent: lines,
    };
  },
});
