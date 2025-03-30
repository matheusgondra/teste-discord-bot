import { client } from "./client";
import { loadCommands } from "./loader";

const main = async () => {
	const commands = await loadCommands();

	client.setCommands(commands);

	client.onInteraction(async (interaction) => {
		if (!interaction.isCommand()) {
			return;
		}

		const command = client.getCommand(interaction.commandName);
		if (!command) {
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.log("error", error);
		}
	});
	
	await client.login();
}

main();