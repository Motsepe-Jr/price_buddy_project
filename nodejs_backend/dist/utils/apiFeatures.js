"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Need to change the type of query to Query/MongooseTypes
class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        const keyword = this.queryStr.query.keyword ? {
            name: {
                $regex: this.queryStr.query.keyword,
                $options: 'i'
            }
        } : {};
        this.query = this.query.find(Object.assign({}, keyword));
        return this;
    }
    filter() {
        const queryCopy = Object.assign({}, this.queryStr.query);
        // remove fileds from the query
        const removeFileds = ['keyword', 'limit', 'page']; // remove this becuase they are not in ur document
        removeFileds.forEach(el => delete queryCopy[el]);
        // advanced filter for price, ratings
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    pagination(resPerpage) {
        const currentPage = Number(this.queryStr.query.page) || 1;
        const skip = resPerpage * (currentPage - 1); // 0 * 4 = 0 --> 1 * 4 = 4, skip the first 4, skip the first something while limit the next by 4
        this.query = this.query.limit(resPerpage).skip(skip);
        return this;
    }
}
exports.default = APIFeatures;
//# sourceMappingURL=apiFeatures.js.map