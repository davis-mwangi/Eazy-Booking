export default {
    env: 'production',
    db: process.env.DATABASE_URL,
    port: process.env.PORT || 3000 ,
    secret: 'thisismyscretkeyitissupposedtobesecure'
};