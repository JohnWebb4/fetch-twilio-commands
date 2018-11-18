import dotenv from "dotenv";
import twilio from "twilio";
import { CommandInstance } from "twilio/lib/rest/wireless/v1/command";

dotenv.config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = twilio(accountSid, authToken);

client.wireless.commands.each(undefined, handleCommand);

function handleCommand(command: CommandInstance): void {
  if (command.command === "You Pressed The Button") {
    handlePressCommand(command);
  }
}

function handlePressCommand(command: CommandInstance): void {
  
}
