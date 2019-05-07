export default {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    secret: 'Time$ch00l',
    ftpOptions: { host: 'ftp.smarterasp.net', user: 'gigiSchool', password: 'gigiSchool' },
    token: 'x',
    currentUser: {
        id: '', name: '', sub: '', cli: '', scopes: [{ role: '', action: '', team: '' }]
    },
    identity: 'http://ec2-34-221-254-153.us-west-2.compute.amazonaws.com:5000/',
    // identity: 'http://localhost:5000/login',
    mongo: 'mongodb://gigiSchool:Popokatepet1@ds135036.mlab.com:35036/timekeeper'
    // mongo: 'mongodb://localhost:27017/school'
}