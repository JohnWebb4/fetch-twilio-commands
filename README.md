# Fetch Twilio Commands

## Purpose: Fetch Twilio commands and Post to a Google App Script

When the server is run it will fetch a historic list of all SMS twilio commands.
After reading the list it traverse the list and search for commands with "You Pressed The Button" as the command name.
For each command with that name it will write the command and the create time to a Google App Script using a POST request.

## Required Accounts to Use

- Google Account
- Twilio Account

## License

[MIT](/LICENSE)
