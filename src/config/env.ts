const getEnv = (key: string) => {
	const value = process.env[key];
	if (!value) {
		throw new Error(`Environment variable ${key} is not set`);
	}

	return value;
};

export const env = {
	token: getEnv("TOKEN"),
	clientId: getEnv("CLIENT_ID"),
	guildId: getEnv("GUILD_ID"),
};
