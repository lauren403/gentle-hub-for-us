import { defineMcp } from "@lovable.dev/mcp-js";
import getApproachTool from "./tools/get-approach";
import getBookingInfoTool from "./tools/get-booking-info";
import getClinicInfoTool from "./tools/get-clinic-info";
import getCrisisLinesTool from "./tools/get-crisis-lines";
import getPractitionerTool from "./tools/get-practitioner";

export default defineMcp({
  name: "body-belonging-adhd-hub",
  title: "Body Belonging Clinic — ADHD Hub",
  version: "0.1.0",
  instructions:
    "Public read-only tools for Body Belonging Clinic (Perth, Australia; telehealth Australia-wide). Use these to answer questions about the clinic, the practitioner Lauren Lynch, booking, the Body Belonging practice framework, and Australian crisis support lines. The clinic does not diagnose ADHD or prescribe medication. Always state that Medicare rebates MAY apply with an eligible plan — never guaranteed. This is not a crisis service; in an emergency call 000.",
  tools: [
    getClinicInfoTool,
    getPractitionerTool,
    getBookingInfoTool,
    getApproachTool,
    getCrisisLinesTool,
  ],
});
