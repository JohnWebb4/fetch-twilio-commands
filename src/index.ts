import dotenv from "dotenv";
import { UriOptions } from "request";
import request from "request-promise";
import twilio from "twilio";
import { CommandInstance } from "twilio/lib/rest/wireless/v1/command";
import { logger } from "./util/logger";

dotenv.config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const googleAppKey = process.env.GOOGLE_APP_KEY;
const googleAppUrl = process.env.GOOGLE_APP_URL;

const client = twilio(accountSid, authToken);

client.wireless.commands.each(undefined, handleCommand);

async function handleCommand(command: CommandInstance): Promise<void> {
  if (command.command === "You Pressed The Button") {
    handlePressCommand(command);
  }
}

async function handlePressCommand(command: CommandInstance): Promise<void> {
  if (!googleAppKey || !googleAppUrl) {
    logger.log("Missing Google App Url or Key");
    return;
  }

  const options: UriOptions & request.RequestPromiseOptions = {
    body: {
      app_key: googleAppKey,
      command: command.command,
      timestamp: command.dateCreated,
    },
    followAllRedirects: true,
    json: true,
    method: "POST",
    uri: googleAppUrl,
  };

  await request(options)
    .then((value) => logger.log(value))
    .catch((err) => logger.log("Error: ", err));
}
