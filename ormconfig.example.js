module.exports = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "",
    password: "",
    database: "",
    entities: [
        "./src/typeorm/entities/*.ts"
    ],
    migrations: [
        "./src/typeorm/migrations/*.ts"
    ],
    cli: {
        migrationsDir: "./src/typeorm/migrations"
    }
}
