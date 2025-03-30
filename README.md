## Como criar um comando

1. Crie um arquivo dentro da pasta `src/commands`

2. Use o `export default` para exportar um novo comando para o bot. O comando pode ser construido com a classe `CommandBuilder`

```ts
import { ChatInputCommandInteraction } from "discord.js";
import { CommandBuilder } from "../../command";

export default CommandBuilder.create()
	.setName("ping")
	.setDescription("Responde com Pong!")
	.setExecute(async (interaction: ChatInputCommandInteraction) => {
		await interaction.reply("Pong!");
	})
	.build();
```