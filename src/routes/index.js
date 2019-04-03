import authRouter from './auth.router'
import teamsRouter from './teams.router'
import peopleRouter from './people.router'
import customersRouter from './customers.router'
import projectsRouter from './projects.router'
import calendarRouter from './calendar.router'

export default (app) => {
    app.use('/', authRouter)
    app.use('/', teamsRouter)
    app.use('/', peopleRouter)
    app.use('/', customersRouter)
    app.use('/', projectsRouter)
    app.use('/', calendarRouter)
}