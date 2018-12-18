export default {
    env: 'development',
    db: 'postgresql://postgres:Mwa-1994@127.0.0.1:5432/eazy_booking',
    port: process.env.PORT || 3000 ,
    secret: 'thisismyscretkeyitissupposedtobesecure'
};