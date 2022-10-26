import nextJest from "next/jest";
const createJestConfig = nextJest({
  dir: "./"
});

const config = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "./components/**",
    "./entities/**",
    "./interfaces/**",
    "./pages/**",
    "./public/**",
    "./services/**",
    "./styles/**"
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10
    }
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx|mjs)$": ["babel-jest", { presets: ["next/babel"] }]
  }
});

export default config;
