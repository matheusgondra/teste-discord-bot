import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Command } from "./command";

export const loadCommands = async () => {
	const commands = [];
	const foldersPath = path.join(__dirname, 'commands');
	const commandFolders = fs.readdirSync(foldersPath);
	
	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js') || file.endsWith('.ts'));
		for (const file of commandFiles) {
			const filePath = pathToFileURL(path.join(commandsPath, file)).href;
			const { default: command } = await import(filePath);

			if (command instanceof Command) {
				commands.push(command);
			} else {
				console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
			}
		}
	}
	
	return commands;
}