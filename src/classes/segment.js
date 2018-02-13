

class Segment {

    constructor(){
        this.criteria = []
        this.user;
        this.pass = true;
    }

    addRule(rule){
        this.criteria.push([rule]);
    }

    addRules(rules) {
        this.criteria.push(rules);
    }

    setCriteria(criteria){
        this.criteria = criteria
    }

    andSegment(){
        
        return this.criteria.every(c => {
            // console.log(this.user)
            // console.log(c)
            var test = this.orSegment(c)
            // console.log('test', test)
            return test
        })
        return this.pass // all are true
    }

    orSegment(criterion){
        
        return criterion.some(crit => {
            var inSegment = false
            inSegment = crit.value === this.user[crit.param]
            if(crit.op === 'is not'){
                inSegment = !inSegment // flip for is not operator
            }
            // console.log(inSegment)
            return inSegment
        })

    }

    // test a given user (1)
    matchesUser(user){
        this.user = user
        return this.andSegment()
    }

    // return matched users
    matchedUsers(users, criteria = null){
        this.criteria = criteria ? criteria : this.criteria;
        if(this.criteria.length === 0){
            return users
        }
        return users.filter(u => {
            return this.matchesUser(u)
        })
    }

    print(){
        console.log(JSON.stringify(this.criteria))
    }

}

module.exports = Segment;