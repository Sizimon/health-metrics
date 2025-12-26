interface Config {
    PORT: number;
    ALLOWED_ORIGINS: string[];
}

const config: Config = {
    PORT: 5050,
    ALLOWED_ORIGINS: ['https://szymonsamus.dev', 'https://oktzy.com']
}

export default config;