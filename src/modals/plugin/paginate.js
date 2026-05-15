const paginate = (schema) => {
  schema.statics.paginate = async function (filter, options) {
    let sort = '';
    if (options.sortBy) {
      options.sortBy.split(',').forEach((sortOption) => {
        const [key, order] = sortOption.split(':');
        sort.push((order === 'desc' ? '-' : '') + key);
      });
      sort = sort.join(' ');
    } else {
      sort = 'createdAt';
    }

    const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
    const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
    const skip = (page - 1) * limit;

    const countPromise = this.countDocuments(filter).exec();
    let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit);

    if (options.populate) {
      options.populate.split(',').forEach((populateOption) => {
        docsPromise = docsPromise.populate(
          populateOption
            .split('.')
            .reverse()
            .reduce((a, b) => ({ path: b, populate: a })),
        );
      });
    }

    docsPromise = docsPromise.exec();

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [totalResults, results] = values;
      const totalPages = Math.ceil(totalResults / limit);
      const result = {
        results,
        page,
        limit,
        totalPages,
        totalResults,
      };
      return Promise.resolve(result);
    });
  };
};

export default paginate;



// const paginate = (schema) => {
//   schema.statics.paginate = async function (filter = {}, options = {}) {
//     let sort = "";
//     if (options.sortBy) {
//       // sortBy=name:asc,createdAt:desc
//       const sorting = options.sortBy
//         .split(",")
//         .map((opt) => {
//           const [field, order] = opt.split(":");
//           return (order === "desc" ? "-" : "") + field;
//         })
//         .join(" ");
//       sort = sorting;
//     } else {
//       sort = "-createdAt";
//     }

//     let select = "";
//     if (options.fields) {
//       select = options.fields.split(",").join(" ");
//     }

//     const limit = parseInt(options.limit, 10) || 10;
//     const page = parseInt(options.page, 10) || 1;
//     const skip = (page - 1) * limit;

//     // 🔍 search support
//     if (options.search && options.searchFields?.length) {
//       const regex = new RegExp(options.search, "i");
//       filter.$or = options.searchFields.map((field) => ({
//         [field]: regex,
//       }));
//     }

//     const countPromise = this.countDocuments(filter);

//     let query = this.find(filter)
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     if (select) {
//       query = query.select(select);
//     }

//     const docsPromise = query.lean();

//     const [totalResults, results] = await Promise.all([
//       countPromise,
//       docsPromise,
//     ]);

//     const totalPages = Math.ceil(totalResults / limit);

//     return {
//       results,
//       pagination: {
//         currentPage: page,
//         limit,
//         totalPages,
//         totalResults,
//       },
//     };
//   };
// };

// export default paginate;