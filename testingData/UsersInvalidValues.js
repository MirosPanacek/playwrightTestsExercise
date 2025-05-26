export const newUsersInvalid = [
  {
    description: "invalid user - missing `name` field",
    payload: {
      name: "morpheus",
    }
  },
  {
    description: "invalid user - missing `job` field",
    payload: {
      job: "Developer"
    }
  },
  {
    description: "invalid user - empty payload",
    payload: {}
  },
  {
    description: "invalid user - int in fields",
    payload: {
      name: 124,
      job: 150
    }
  },
  {
    description: "invalid user - int in field name",
    payload: {
      name: "Tereza",
      job: 150
    }
  },
  {
    description: "invalid user -  int in field job",
    payload: {
      name: 12,
      job: "Doctor"
    }
  },
  {
    description: "invalid user - empty values in fields",
    payload: {
      name: "",
      job: ""
    }
  },
   {
    description: "invalid user - null values in fields",
    payload: {
      name: null,
      job: null
    }
  },
  {
    description: "invalid user - boolean",
    payload: {
      name: true,
      job: true
    }
  },
  {
    description: "invalid user - long strings (255 characters, including special characters)",
    payload: {
      name: "A'%\"".padEnd(256, "a"),
      job: "B\"%'".padEnd(256, "b")
    }
  },
  {
    description: "invalid user - extra field",
    payload: {
      name: "Johan",
      job: "Leader",
      age: 48,
    }
  },
];