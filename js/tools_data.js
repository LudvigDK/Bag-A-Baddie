const TOOLS = [
  {
    type: "function",
    name: "give_number",
    description: "Giver brugeren dit telefonnummer, og lader dem derfor score dig.",
    strict: true,
    parameters: {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "Afslutende besked på samtalen."
        }
      },
      required: ["message"],
      additionalProperties: false
    }
  },
  {
    type: "function",
    name: "reject_user",
    description: "Afviser brugerens forsøg på at score dig, og slut samtalen.",
    strict: true,
    parameters: {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "Afslutende besked på samtalen."
        }
      },
      required: ["message"],
      additionalProperties: false
    }
  }
];