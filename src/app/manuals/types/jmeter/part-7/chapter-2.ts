import type { ChapterRecord } from "../../../types";

/** 7.2 SOAP/XML Requests */
export const chapter = {
  "id": "jm-7-2-soap-xml-requests",
  "title": "7.2 SOAP/XML Requests",
  "minutes": 22,
  "level": "intermediate",
  "phase": "Part 7 · API & Protocol-Specific Testing",
  "partName": "Part 7 · API & Protocol-Specific Testing",
  "overviewText": "SOAP still appears in payroll, banking, and government integrations. You POST an XML envelope with Content-Type text/xml and often SOAPAction. Prefer a plain HTTP Request sampler; validate with XPath Extractor/Assertion. Dedicated SOAP sampler is optional WSDL sugar.",
  "why": "JSON extractors will not parse a SOAP envelope. Legacy HR tax/bank APIs are why XPath from Part 5 exists.",
  "when": "WSDL-driven GetEmployeeRecord-style operations, not modern REST.",
  "practical": {
    "app": "Payroll bank SOAP GetEmployeeRecord",
    "scenario": "Call SOAP with ${authToken} in the header and ${employeeId} in the body.",
    "pass": "You POST the envelope, set SOAPAction, extract with XPath — not JSON Path.",
    "fail": "You attach a JSON Extractor to the XML response."
  },
  "tools": [],
  "customSummary": "- SOAP still appears in legacy enterprise/payroll/banking/government integrations.\n- Structured XML \"envelope\" (Header + Body) defined by a WSDL, sent via HTTP POST with Content-Type: text/xml and often a SOAPAction header.\n- Can use standard HTTP Request sampler (common preference) or dedicated SOAP/XML-RPC Request sampler.\n- Response validation shifts to XPath Extractor/Assertion (from Part 5) since responses are XML, not JSON.",
  "contentMarkdown": "## SOAP is still in the wild\n\nWhile REST/JSON dominates modern API design, SOAP (Simple Object Access Protocol) remains genuinely common in older enterprise systems, certain government/financial integrations, and some legacy HR/payroll platforms — so it's realistic you could encounter a SOAP-based integration point even within a broadly modern system, particularly for something like a payroll module integrating with an older banking or tax-authority API.\n\nSOAP requests differ structurally from REST: instead of a flexible JSON body, SOAP uses a rigidly-structured XML \"envelope,\" with a fixed `<soap:Envelope>` wrapper containing a `<soap:Header>` (often holding auth credentials) and `<soap:Body>` (holding the actual operation and its parameters), and the specific structure required is typically defined by a WSDL (Web Services Description Language) file the service provider publishes.\n\n## HTTP Request with an XML body\n\nIn JMeter, you can technically use a standard HTTP Request sampler for SOAP calls — since SOAP ultimately travels over HTTP POST — by setting the Body Data to the raw XML envelope and setting the Content-Type header to `text/xml` (or `application/soap+xml` depending on the SOAP version) and often a `SOAPAction` header specifying which operation is being invoked:\n\n```xml\n<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n  <soap:Header>\n    <AuthToken>${authToken}</AuthToken>\n  </soap:Header>\n  <soap:Body>\n    <GetEmployeeRecord xmlns=\"http://hrms.example.com/\">\n      <EmployeeId>${employeeId}</EmployeeId>\n    </GetEmployeeRecord>\n  </soap:Body>\n</soap:Envelope>\n```\n\nJMeter also offers a dedicated SOAP/XML-RPC Request sampler, though in current practice many testers still prefer the plain HTTP Request sampler for SOAP since it offers more direct control and consistency with how you'd already be building every other request in the test plan, reserving the dedicated SOAP sampler mainly for cases involving WSDL-based auto-configuration.\n\n## XPath, not JSON Path\n\nRegardless of which sampler you use, response validation shifts from JSON Extractor/Assertion (Part 5, Part 4) to XPath Extractor and XPath Assertion, since the response will itself be XML — this is precisely the scenario flagged back in Part 5 Chapter 1 as XPath Extractor's primary real-world use case, and it's worth revisiting that chapter's XPath syntax notes once you actually have a SOAP response body in front of you to test against.",
  "blocks": [
    {
      "id": "jm-7-2-md-0",
      "type": "overview",
      "heading": "SOAP is still in the wild",
      "content": "While REST/JSON dominates modern API design, SOAP (Simple Object Access Protocol) remains genuinely common in older enterprise systems, certain government/financial integrations, and some legacy HR/payroll platforms — so it's realistic you could encounter a SOAP-based integration point even within a broadly modern system, particularly for something like a payroll module integrating with an older banking or tax-authority API.\n\nSOAP requests differ structurally from REST: instead of a flexible JSON body, SOAP uses a rigidly-structured XML \"envelope,\" with a fixed `<soap:Envelope>` wrapper containing a `<soap:Header>` (often holding auth credentials) and `<soap:Body>` (holding the actual operation and its parameters), and the specific structure required is typically defined by a WSDL (Web Services Description Language) file the service provider publishes.",
      "order": 0
    },
    {
      "id": "jm-7-2-md-1",
      "type": "overview",
      "heading": "HTTP Request with an XML body",
      "content": "In JMeter, you can technically use a standard HTTP Request sampler for SOAP calls — since SOAP ultimately travels over HTTP POST — by setting the Body Data to the raw XML envelope and setting the Content-Type header to `text/xml` (or `application/soap+xml` depending on the SOAP version) and often a `SOAPAction` header specifying which operation is being invoked:\n\n```xml\n<soap:Envelope xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n  <soap:Header>\n    <AuthToken>${authToken}</AuthToken>\n  </soap:Header>\n  <soap:Body>\n    <GetEmployeeRecord xmlns=\"http://hrms.example.com/\">\n      <EmployeeId>${employeeId}</EmployeeId>\n    </GetEmployeeRecord>\n  </soap:Body>\n</soap:Envelope>\n```\n\nJMeter also offers a dedicated SOAP/XML-RPC Request sampler, though in current practice many testers still prefer the plain HTTP Request sampler for SOAP since it offers more direct control and consistency with how you'd already be building every other request in the test plan, reserving the dedicated SOAP sampler mainly for cases involving WSDL-based auto-configuration.",
      "order": 1
    },
    {
      "id": "jm-7-2-md-2",
      "type": "overview",
      "heading": "XPath, not JSON Path",
      "content": "Regardless of which sampler you use, response validation shifts from JSON Extractor/Assertion (Part 5, Part 4) to XPath Extractor and XPath Assertion, since the response will itself be XML — this is precisely the scenario flagged back in Part 5 Chapter 1 as XPath Extractor's primary real-world use case, and it's worth revisiting that chapter's XPath syntax notes once you actually have a SOAP response body in front of you to test against.",
      "order": 2
    }
  ],
  "advantages": [
    "7.2 SOAP/XML Requests — JSON extractors will not parse a SOAP envelope."
  ],
  "limitations": [
    "7.2 SOAP/XML Requests is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
