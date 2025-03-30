import { ChatInputCommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";

interface CommandData {
	name: string;
	description: string;
	toJSON: () => object;
}

interface CommandOptions {
	data: CommandData;
	execute: (Interaction: ChatInputCommandInteraction) => void;
}

interface CommandOption {
	name: string;
	description: string;
}

export class CommandBuilder {
	private name: string;
	private description: string;
	private execute: (interaction: ChatInputCommandInteraction) => void;
	private options: CommandOption[];

	constructor() {
		this.name = "";
		this.description = "";
		this.execute = () => {};
		this.options = [];
	}

	static create() {
		return new CommandBuilder();
	}

	setName(name: string) {
		this.name = name;
		return this;
	}

	setDescription(description: string) {
		this.description = description;
		return this;
	}

	setExecute(execute: (Interaction: ChatInputCommandInteraction) => void) {
		this.execute = execute;
		return this;
	}

	addOption(name: string, description?: string) {
		this.options.push({ name, description: description || "Sem descrição" });
		return this;
	}

	build() {
		const slashCommand = new SlashCommandBuilder()
			.setName(this.name)
			.setDescription(this.description);

		this.options.forEach(option => {
			slashCommand.addStringOption(optionBuilder => optionBuilder.setName(option.name).setDescription(option.description));
		});

		return new Command({
			data: { 
				name: this.name,
				description: this.description,
				toJSON: () => slashCommand.toJSON()
			},
			execute: this.execute
		});
	}
}

export class Command {
	data: CommandData;
	execute: (Interaction: ChatInputCommandInteraction) => void;

	constructor({ data, execute }: CommandOptions) {
		this.data = data;
		this.execute = execute;
	}
}