import '../models/person.model'
import '../models/team.model'
import '../models/customer.model'
import '../models/project.model'
import '../models/day.model'

import Repository from './repository'

class UnitOfWork {
    static People = new Repository('Person')
    static Teams = new Repository('Team')
    static Customers = new Repository('Customer')
    static Projects = new Repository('Project')
    static Calendar = new Repository('Day')
}

module.exports = UnitOfWork