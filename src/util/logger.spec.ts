import { Logger } from "./logger";

// tslint:disable no-console
describe("Logger", () => {
  let realLog: any;

  beforeEach(() => {
    realLog = console.log;

    console.log = jest.fn();
  });

  afterEach(() => {
    console.log = realLog;

    jest.resetAllMocks();
    jest.resetModules();
  });

  describe("when in development", () => {
    let env;
    let logger: Logger;

    beforeEach(async () => {
      env = (await import("dotenv"));

      jest.mock("dotenv", () => ({
        config: jest.fn(),
      }));

      (env.config as any).mockImplementation(() => {
        process.env.IS_DEVELOPMENT = "1";
      });

      logger = (await import("./logger")).logger;
    });

    describe("when I log a message", () => {
      it("should write to console log", () => {
        logger.log("Test");

        expect(console.log as any).toHaveBeenCalledWith("Test");
      });
    });

    describe("when I log multiple elements", () => {
      it("should log multiple elements", () => {
        logger.log("Test", "1", "2", "3");

        expect(console.log as any).toHaveBeenCalledWith("Test", "1", "2", "3");
      });
    });
  });

  describe("when in production", () => {
    let env;
    let logger: Logger;

    beforeEach(async () => {
      env = (await import("dotenv"));

      jest.mock("dotenv", () => ({
        config: jest.fn(),
      }));

      (env.config as any).mockImplementation(() => {
        process.env.IS_DEVELOPMENT = undefined;
      });

      logger = (await import("./logger")).logger;
    });

    describe("when I log a message", () => {
      it("should not log a message", () => {
        logger.log("Test");

        expect(console.log).not.toHaveBeenCalled();
      });
    });
  });
});
