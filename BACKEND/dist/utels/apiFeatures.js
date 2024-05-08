class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filter() {
        // 1A) FILTERING
        const queryObj = Object.assign({}, this.queryString);
        const excludeFields = ['page', 'sort', 'limit', 'fields']; // Exclude 'category' from excludeFields
        excludeFields.forEach((el) => delete queryObj[el]);
        // 1B) ADVANCED FILTERING
        let query = this.query.find(queryObj); // Construct query object directly
        // Modify queryObj to handle category filtering
        if (this.queryString.category) {
            const categories = this.queryString.category.split(',').map((cat) => cat.trim()); // Split comma-separated categories and remove any leading/trailing whitespace
            query = query.where('category').all(categories); // Add category filter to the query
        }
        this.query = query;
        return this;
    }
    sort() {
        //2) sorting
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        else {
            this.query = this.query.sort('addedAt');
        }
        return this;
    }
    limitFields() {
        //3) FIELD LIMITING
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }
        else {
            this.query = this.query.select('-__v');
        }
        return this;
    }
    paginate() {
        // 3) PAGINATION
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}
export default APIFeatures;
