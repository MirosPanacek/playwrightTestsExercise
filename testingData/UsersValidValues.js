export const newUsersValid = [
  {
    description: "Valid input - standard values",
    payload: {
      name: "morpheus",
      job: "leader"
    }
  },
  {
    description: "Valid input - apostrophes in both fields",
    payload: {
      name: "O'Connor",
      job: "team's leader"
    }
  },
  {
    description: "Valid input - double quotes in both fields",
    payload: {
      name: "\"Trinity\"",
      job: "\"Operator\""
    }
  },
  {
    description: "Valid input - percent signs in both fields",
    payload: {
      name: "100% Neo",
      job: "100% Hacker"
    }
  },
  {
    description: "Valid input - mix of apostrophes, quotes, and percent signs",
    payload: {
      name: "Mr. \"Anderson\" O'Neil",
      job: "Security's \"Top 1%\""
    }
  },
  {
    description: "Valid input - long strings (255 characters, including special characters)",
    payload: {
      name: "A'%\"".padEnd(255, "a"),
      job: "B\"%'".padEnd(255, "b")
    }
  }
];
