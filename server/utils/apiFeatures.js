class ApiFeatures{
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    // search feature
    search(req){
        // console.log(this.query)
        // console.log(this.queryStr)
        const keyword = req.query.keyword ? {
            name:{
                $regex:req.query.keyword,
                $options:'i',
            }
        } : {}
        this.query = this.query.find({...keyword})
        return this
    }

    //filter for category 
    filter(req){
        const copyQuery = {...this.queryStr}
        const removeFields = ["keyword","page","limit"]

        // console.log(copyQuery)
        
        removeFields.map((key) => delete copyQuery[key])
        
        // console.log(" after " , copyQuery)
        let queryStr = JSON.stringify(copyQuery)
        queryStr.replace(/\b()\b/g , (key)=>{
            `$${key}`
        })

        this.query = this.query.find(JSON.parse(queryStr))
        return this
    }

    // pagination
    pagination(req,number_of_elements){
        const currentPage = this.queryStr.page || 1

        const skipEl = number_of_elements * (currentPage-1)
        
        this.query = this.query.limit(number_of_elements).skip(skipEl)
        return this
    }
}

module.exports = ApiFeatures