const TOOLS = [
    {
        type: "function",
        name: "give_number",
        description: "Giver brugeren dit telefonnummer, og lader dem derfor score dig.",
        strict: true,
        parameters: {
            type: "object",
            properties: {},
            required: [],
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
            properties: {},
            required: [],
            additionalProperties: false
        }
    }
]