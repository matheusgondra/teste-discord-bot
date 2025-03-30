import { SlashCommandBuilder } from "discord.js";
import { CommandBuilder } from "../../command";

export default CommandBuilder.create()
	.setName("echo")
	.setDescription("Responde alguma coisa")
	.addOption("content", "O conteúdo que o bot deve responder")
	.setExecute(async (interaction) => {
		await interaction.reply(interaction.options.getString("content", true));
	})
	.build();