import config from './config'

export default (title = 'TimeKeeper') => {
    return `<!doctype html>
    <html lang='en'>
        <head>
            <meta charset='utf-8'>
            <title>${title}</title>
        </head>
        <body>
            <h2>Hello from ${title}</h2>
            <p>Your user is<br>
            ${config.currentUser.id}<br>
            ${config.currentUser.name}<br>
            ${config.currentUser.sub}<br>
            ${config.currentUser.cli}<br>
            ${config.currentUser.scopes[0].role}:${config.currentUser.scopes[0].action} <br>
            ${config.token}
            <div>
            <a href='/auth/login'><button>Login</button></a>
            &nbsp;&nbsp;
            <a href='/auth/logout'><button>Logout</button></a>
            </div>
            </p>
        </body>
    </html>`
}