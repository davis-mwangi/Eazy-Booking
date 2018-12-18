export default {
    env: 'test',
    db: 'postgresql://postgres:Mwa-1994@127.0.0.1:5432/eazy_booking_test',
    port: process.env.PORT || 3100 ,
    secret: 'thisismyscretkeyitissupposedtobesecure'
};