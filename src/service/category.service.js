const CategoryModel = require('./../model/category.model');
class CategoryService {
    categoryService;

    constructor() {
        this.categoryService = CategoryModel;
    }

    async getCategories() {
        return await this.categoryService.getAllCategories();
    }
}

module.exports = new CategoryService();