import { ChatInputCommandInteraction } from "discord.js";
import { CommandBuilder } from "../../command";

export default CommandBuilder.create()
	.setName("pong")
	.setDescription("Responde com Pong!")
	.setExecute(async (interaction: ChatInputCommandInteraction) => {
		await interaction.reply("Pong!");
	})
	.build();