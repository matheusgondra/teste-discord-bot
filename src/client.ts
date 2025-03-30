import { ChatInputCommandInteraction, Collection, Client as DiscordClient, Events, GatewayIntentBits, Interaction, REST, Routes } from "discord.js";
import { env } from "./config/env";
import { Command } from "./command";

interface ClientOptions {
	discordToken: string;
}

class Client extends DiscordClient {
	private readonly discordToken: string;
	private readonly commands = new Collection<string, any>();

	constructor({ discordToken }: ClientOptions) {
		super({
			intents: [GatewayIntentBits.Guilds]
		});
		
		this.discordToken = discordToken;

		this.once(Events.ClientReady, (client) => {
			console.log(`Logged in as ${client.user.tag}`);
		});
	}

	onInteraction(callback: (interation: Interaction) => Promise<void>) {
		this.on(Events.InteractionCreate, callback);
	}	

	getCommand(name: string) {
		return this.commands.get(name);
	}

	setCommands(commands: Command[]) {
		commands.forEach(command => this.commands.set(command.data.name, command));
		this.deployCommands(commands);
	}

	private async deployCommands(commands: Command[]) {
		const rest = new REST({ version: "10" }).setToken(this.discordToken);

		try {
			await rest.put(
				Routes.applicationGuildCommands(env.clientId, env.guildId),
				{ body: commands.map(command => command.data.toJSON()) }
			);

			console.log("Successfully registered application commands.");
		} catch (error) {
			console.error(error);
		}
	}
}

export const client = new Proxy(new Client({ discordToken: env.token }), {
	get(target, prop) {
		if (prop === "login") {
			return async () => {
				const token = Reflect.get(target, "discordToken");
				await target.login(token);
			}
		}

		return Reflect.get(target, prop);
	}
});

export type ClientType = typeof client;