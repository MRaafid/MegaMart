class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    
    search(){
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: 'i'
            }
        } : {}

        console.log(keyword);

        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const queryCopy = {...this.queryString};

        // removing field from the query
        const removingField = ['keyword', 'limit', 'page']
        removingField.forEach(field => delete queryCopy[field]);

        // advanced filter for price, ratings etc
        let queryString = JSON.stringify(queryCopy)
        queryString = queryString.replace(/\b(gt|gte|lte|lt)\b/g, match => `$${match}`)

        this.query = this.query.find(JSON.parse(queryString));
        return this;
    }

    pagination(resultsPerPage){
        const currentPage = Number(this.queryString.page) || 1;
        const skip = (currentPage - 1) * resultsPerPage;

        this.query = this.query.limit(resultsPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;