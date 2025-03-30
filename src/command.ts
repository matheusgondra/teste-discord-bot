import { ChatInputCommandInteraction, Interaction } from "discord.js";

interface CommandData {
	name: string;
	description: string;
	toJSON: () => object;
}

interface CommandOptions {
	data: CommandData;
	execute: (Interaction: ChatInputCommandInteraction) => void;
}

export class CommandBuilder {
	private name: string;
	private description: string;
	private execute: (interaction: ChatInputCommandInteraction) => void;

	constructor() {
		this.name = "";
		this.description = "";
		this.execute = () => {};
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

	build() {
		return new Command({
			data: { 
				name: this.name,
				description: this.description,
				toJSON: () => ({ name: this.name, description: this.description})
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