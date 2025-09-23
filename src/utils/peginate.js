export const paginate = async ({
    model,
    query = {},
    page = 1,
    limit = 10,
    selectFields = '',
    populateFields = [],
    sortOption = -1,
}) => {
    const pageNumber = parseInt(page, 10);
    const pageLimit = parseInt(limit, 10);

    if (pageNumber <= 0 || pageLimit <= 0) {
        throw new Error('Invalid page or limit values');
    }

    const skip = (pageNumber - 1) * pageLimit;

    let queryBuilder = model.find(query).select(selectFields).skip(skip).limit(pageLimit).sort({ createdAt: sortOption });

    if (populateFields.length > 0) {
        populateFields.forEach((field) => {
            queryBuilder = queryBuilder.populate(field);
        });
    }

    const [data, totalCount] = await Promise.all([queryBuilder.exec(), model.countDocuments(query)]);
    const totalPages = Math.ceil(totalCount / pageLimit);
    const result = {
        data: data,
        pagination: {
            currentPage: pageNumber,
            totalPages,
            totalRecords: totalCount,
            pageSize: pageLimit,
        },
    };

    return result;
};
