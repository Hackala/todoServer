export default {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    secret: 'Time$ch00l',
    token: 'x',
    currentUser: {
        id: '', name: '', sub: '', cli: '', scopes: [{ role: '', action: '', team: '' }]
    },
    // mongoUri: 'mongodb://mistral:Mistral2018@ds020168.mlab.com:20168/mern_db'
    mongo: 'mongodb://localhost:27017/school'
}