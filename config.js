module.exports = {
    //Datos de la BDD almacenados en variables de entorno
    db_config: {
        host: 'viaduct.proxy.rlwy.net',
        user: 'root',
        password: 'wyzyfxt5a461s8$71dz7d1$xef40tdne',
        database: 'railway',
        port: 50033,
    },
    //Puerto para prod y puerto para local
    PORT: process.env.PORT || 3005,
}