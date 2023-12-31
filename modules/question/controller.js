const { getQueryDateTime, fuzzySearch } = require('../../utils');

const {
  Category,
  Supplier,
  Customer,
  Employee,
  Product,
  Order,
} = require('../../model');

module.exports = {
  question1: async (req, res, next) => {
    try {
      const conditionFind = {
        discount: { $lte: 10 },
      };

      let results = await Product.find(conditionFind);
      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question1a: async (req, res, next) => {
    try {
      const { discount } = req.query;
      const conditionFind = {};

      if (discount) conditionFind.discount = { $gte: discount };

      let results = await Product.find(conditionFind).populate("category").populate("supplier");
      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question1b: async (req, res, next) => {
    try {
      const { discount, type } = req.query;
      const conditionFind = {};

      if (discount) {
        switch (Number(type)) {
          case 0:
            conditionFind.discount = { $eq: discount };
            break;

          case 1:
            conditionFind.discount = { $lt: discount };
            break;

          case 2:
            conditionFind.discount = { $lte: discount };
            break;

          case 3:
            conditionFind.discount = { $gt: discount };
            break;

          case 4:
            conditionFind.discount = { $gte: discount };
            break;

          default:
            conditionFind.discount = { $eq: discount };
            break;
        }
      }

      let results = await Product.find(conditionFind).populate("category").populate("supplier");
      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });

    }
  },

  question2: async (req, res, next) => {
    try {
      const conditionFind = {
        stock: { $lte: 5 },
      };

      let results = await Product.find(conditionFind);
      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question2a: async (req, res, next) => {
    try {
      const { stock } = req.query;
      const conditionFind = {};

      if (stock) conditionFind.stock = { $lte: stock };

      let results = await Product.find(conditionFind).populate("category").populate("supplier");
      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question2b: async (req, res, next) => {
    try {
      const { stock, type } = req.query;
      const conditionFind = {};

      if (stock) {
        switch (Number(type)) {
          case 0:
            conditionFind.stock = { $eq: stock };
            break;

          case 1:
            conditionFind.stock = { $lt: stock };
            break;

          case 2:
            conditionFind.stock = { $lte: stock };
            break;

          case 3:
            conditionFind.stock = { $gt: stock };
            break;

          case 4:
            conditionFind.stock = { $gte: stock };
            break;

          default:
            conditionFind.stock = { $eq: stock };
            break;
        }
      }

      let results = await Product.find(conditionFind).populate("category").populate("supplier");
      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });

    }
  },

  question3: async (req, res, next) => {
    try {
      // let discountedPrice = price * (100 - discount) / 100;
      const s = { $subtract: [100, '$discount'] }; // (100 - 10) s => 90

      const m = { $multiply: ['$price', s] }; // price * 90

      const d = { $divide: [m, 100] }; // price * 90 / 100

      const conditionFind = { $expr: { $lte: [d, 1000] } };
      // const conditionFind = { $expr: { $lte: [{ $divide: [{ $multiply: ['$price', { $subtract: [100, '$discount'] }] }, 100] }, 1000] } };
      // const conditionFind = { discount : { $lte: 1000 }}; SAI

      let results = await Product.find(conditionFind)
        .populate("category")
        .populate("supplier")
        // .select('-categoryId -supplierId -description')
        .lean(); // convert data to object

      // const newResults = results.map((item) => {
      //   const dis = item.price * (100 - item.discount) / 100;
      //   return {
      //     ...item,
      //     dis,
      //   }
      // }).filter((item) => item.dis <= 1000);

      // console.log('««««« newResults »»»»»', newResults);

      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },


  //-------------lean
  question3a: async (req, res, next) => {
    try {
      const s = { $subtract: [100, '$discount'] }; // (100 - 10) s => 90

      const m = { $multiply: ['$price', s] }; // price * 90

      const d = { $divide: [m, 100] }; // price * 90 / 100

      const { price } = req.query;

      const conditionFind = { $expr: { $lte: [d, parseFloat(price)] } };

      let results = await Product.find(conditionFind).lean(); // convert data to object

      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question3c: async (req, res, next) => {
    try {
      const s = { $subtract: [100, '$discount'] }; // (100 - 10) s => 90
      const m = { $multiply: ['$price', s] }; // price * 90
      const d = { $divide: [m, 100] }; // price * 90 / 100

      let results = await Product.aggregate()
        .match({ $expr: { $lte: [d, 20000] } });

      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  //-----------------aggregate
  question3d: async (req, res, next) => {
    try {
      const s = { $subtract: [100, '$discount'] }; // (100 - 10) s => 90
      const m = { $multiply: ['$price', s] }; // price * 90
      const d = { $divide: [m, 100] }; // price * 90 / 100

      //-------------Ver-1
      // let results = await Product.aggregate([
      //   { $addFields: { disPrice: d } },
      //   {
      //     $match: { $expr: { $lte: ['$disPrice', 1000] } },
      //   },
      //   {
      //     $project: {
      //       categoryId: 0,
      //       supplierId: 0,
      //       description: 0,
      //     },
      //   },
      // ]);


      //-------------Ver-2 + addField
      let results = await Product.aggregate()
        .addFields({ disPrice: d })
        .match({ $expr: { $lte: ['$disPrice', 10000] } })
        .project({
          categoryId: 0,
          supplierId: 0,
          description: 0,
          isDeleted: 0,
          price: 0,
          discount: 0,
        });

      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question3e: async (req, res, next) => {
    try {
      const s = { $subtract: [100, '$discount'] }; // (100 - 10) s => 90
      const m = { $multiply: ['$price', s] }; // price * 90
      const d = { $divide: [m, 100] }; // price * 90 / 100

      let results = await Product.aggregate()
        .addFields({ disPrice: d })
        .match({ $expr: { $lte: ['$disPrice', 1000] } })
        .lookup({
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'categories',
        })
        .unwind('categories')
        .lookup({
          from: 'suppliers',
          localField: 'supplierId',
          foreignField: '_id',
          as: 'suppliers',
        })
        .unwind('suppliers')
        .project({
          categoryId: 0,
          supplierId: 0,
          description: 0,
          isDeleted: 0,
          suppliers: {
            isDeleted: 0,
            createdAt: 0,
            updatedAt: 0,
          },
        });

      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question4: async (req, res, next) => {
    try {

      const { address, isDeleted } = req.query;
      const conditionFind = {
        address: fuzzySearch(address)
      };

      let results = await Customer.find(conditionFind);

      let total = await Customer.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question5: async (req, res, next) => {
    try {

      const { year } = req.query;
      const conditionFind = {
        $expr: {
          $eq: [{ $year: '$birthday' }, year],
        },
      };
      console.log('««««« conditionFind »»»»»', conditionFind);

      let results = await Customer.find(conditionFind);

      let total = await Customer.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question5a: async (req, res, next) => {
    try {

      const { year } = req.query;
      const conditionFind = {
        $expr: {
          $eq: [{ $year: '$birthday' }, year],
        },
      };

      let results = await Customer.aggregate()
        .match(conditionFind)

      let total = await Customer.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question6: async (req, res, next) => {
    try {
      const { date } = req.query;

      let today;

      if (!date) {
        today = new Date()
      } else {
        today = new Date(date)
      };

      const conditionFind = {
        $expr: {
          $and: [
            {
              $eq: [{ $dayOfMonth: '$birthday' }, { $dayOfMonth: today }],
            },
            { $eq: [{ $month: '$birthday' }, { $month: today }] },
          ],
        },
      };
      console.log('««««« conditionFind »»»»»', conditionFind);

      let results = await Customer.find(conditionFind);

      let total = await Customer.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question7: async (req, res, next) => {
    try {

      const { status } = req.query;
      // const conditionFind = {
      //   // $expr: {
      //   //   $eq: ['$status', status],
      //   //   // $eq: { status }, //...................................????? tại sao không dụng đc như câu 8a
      //   // },
      // };
      const conditionFind = { status };
      console.log('««««« conditionFind »»»»»', conditionFind);

      let results = await Order.find(conditionFind);

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  }, // ????

  question8a: async (req, res, next) => {
    try {
      let { status, date } = req.query;
      const findDate = date ? new Date(date) : new Date();

      const conditionFind = {
        $expr: {
          $and: [
            // { $eq: ['$status', status] },
            { status },
            {
              $eq: [{ $dayOfMonth: '$shippedDate' }, { $dayOfMonth: findDate }],
            },
            { $eq: [{ $month: '$shippedDate' }, { $month: findDate }] },
            { $eq: [{ $year: '$shippedDate' }, { $year: findDate }] },
          ],
        },
      };

      console.log('««««« conditionFind »»»»»', conditionFind);

      let results = await Order.find(conditionFind).lean();

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question8b: async (req, res, next) => {
    try {
      let { status, fromDate, toDate } = req.query;

      fromDate = new Date(fromDate);
      fromDate.setHours(0, 0, 0, 0);

      const tmpToDate = new Date(toDate);
      tmpToDate.setHours(0, 0, 0, 0);
      toDate = new Date(tmpToDate.setDate(tmpToDate.getDate() + 1));

      const compareStatus = { $eq: ['$status', status] };
      const compareFromDate = { $gte: ['$shippedDate', fromDate] };
      const compareToDate = { $lt: ['$shippedDate', toDate] };

      const conditionFind = {
        $expr: { $and: [compareStatus, compareFromDate, compareToDate] },
      };

      let results = await Order.find(conditionFind)
        .populate('productList.product')
        .populate('customer')
        .populate('employee')
        .lean();

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question8c: async (req, res, next) => {
    try {
      let { status, fromDate, toDate } = req.query;

      fromDate = new Date(fromDate);
      fromDate.setHours(0, 0, 0, 0);

      const tmpToDate = new Date(toDate);
      tmpToDate.setHours(0, 0, 0, 0);
      toDate = new Date(tmpToDate.setDate(tmpToDate.getDate() + 1));

      const compareStatus = { $eq: ['$status', status] };
      const compareFromDate = { $gte: ['$shippedDate', fromDate] };
      const compareToDate = { $lt: ['$shippedDate', toDate] };

      const conditionFind = {
        $expr: {
          $or: [
            { $and: [compareStatus, compareFromDate] },
            { $and: [compareStatus, compareToDate] }
          ]
        },
      };

      let results = await Order.find(conditionFind)
        .populate('productList.product')
        .populate('customer')
        .populate('employee')
        .lean();

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question16: async (req, res, next) => {
    try {
      // let results = await Order.aggregate()
      // // .unwind('productList')
      // .lookup({
      //   from: 'customers',
      //   localField: 'customerId',
      //   foreignField: '_id',
      //   as: 'customer',
      // })
      // // .unwind('customer')
      let results = await Order.find().populate('customer')


      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  //-------------------group
  question17: async (req, res, next) => {
    try {

      let results = await Category.aggregate()
        .lookup({
          from: 'products',
          localField: '_id', // TRUY VẤN NGƯỢC!!!
          foreignField: 'categoryId',
          as: 'products',
        })
        .unwind({
          path: '$products',
          preserveNullAndEmptyArrays: true, // GIỮ LẠI NHỮNG CATE KHÔNG CÓ PROD VÌ UNWIND SẼ XÓA MẤT 
        })
        .group({
          _id: '$_id',
          name: { $first: '$name' },
          description: { $first: '$description' },
          totalProduct: {  //ADD FIELD (KHÔNG CẦN PHẢI THÊM METHOD addField)
            // $sum: '$products.stock',
            $sum: {
              $cond: {
                if: { // IF ElSE của mongodb
                  $and: [
                    { $gt: ['$products.stock', 0] },
                  ]
                }, then: 1, else: 0
              }
            },
          },
          totalStock: {  //ADD FIELD (KHÔNG CẦN PHẢI THÊM METHOD addField)
            // $sum: '$products.stock',
            $sum: '$products.stock'
          },
        })
        .sort({
          description: 1,
        });

      let total = await Category.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  //-----------------aggregate reverse (trong bảng này không có liên kết với bảng khác)
  question18: async (req, res, next) => {
    try {

      let results = await Supplier.aggregate()
        .lookup({
          from: 'products',
          localField: '_id', // TRUY VẤN NGƯỢC!!!
          foreignField: 'supplierId',
          as: 'products',
        })
        .unwind({
          path: '$products',
          preserveNullAndEmptyArrays: true, // GIỮ LẠI NHỮNG CATE KHÔNG CÓ PROD VÌ UNWIND SẼ XÓA MẤT 
        })
        .group({
          _id: '$_id',
          name: { $first: '$name' },
          email: { $first: '$email' },
          phoneNumber: { $first: '$phoneNumber' },
          address: { $first: '$address' },
          totalProduct: {  //ADD FIELD (KHÔNG CẦN PHẢI THÊM METHOD addField)
            // $sum: '$products.stock',
            $sum: {
              $cond: {
                if: { // IF ElSE của mongodb
                  $and: [
                    { $gt: ['$products.stock', 0] },
                  ]
                }, then: 1, else: 0
              }
            },
          },
        })
        .sort({
          name: 1,
        });

      let total = await Supplier.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  //-------------------unwind + sort
  question19: async (req, res, next) => {
    try {

      let results = await Supplier.aggregate()
        .lookup({
          from: 'products',
          localField: '_id', // TRUY VẤN NGƯỢC!!!
          foreignField: 'supplierId',
          as: 'products',
        })
        .unwind({
          path: '$products',
          preserveNullAndEmptyArrays: true, // GIỮ LẠI NHỮNG CATE KHÔNG CÓ PROD VÌ UNWIND SẼ XÓA MẤT 
        })
        .group({
          _id: '$_id',
          name: { $first: '$name' },
          email: { $first: '$email' },
          phoneNumber: { $first: '$phoneNumber' },
          address: { $first: '$address' },
          totalProduct: {  //ADD FIELD (KHÔNG CẦN PHẢI THÊM METHOD addField)
            // $sum: '$products.stock',
            $sum: {
              $cond: {
                if: { // IF ElSE của mongodb
                  $and: [
                    { $gt: ['$products.stock', 0] },
                  ]
                }, then: 1, else: 0
              }
            },
          },
        })
        .sort({
          name: 1,
        });

      let total = await Supplier.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  //-------------------query datetime
  question20: async (req, res, next) => {
    try {
      let { fromDate, toDate } = req.query;
      const conditionFind = getQueryDateTime(fromDate, toDate);

      let results = await Order.aggregate()
        .match({
          ...conditionFind,
          status: { $in: ['WAITING'] },
        })
        .unwind('productList')
        .lookup({
          from: 'products',
          localField: 'productList.productId',
          foreignField: '_id',
          as: 'productList.product',
        })
        .unwind('productList.product')
        .group({
          _id: '$productList.productId',
          name: { $first: '$productList.product.name' },
          price: { $first: '$productList.product.price' },
          discount: { $first: '$productList.product.discount' },
          stock: { $first: '$productList.product.stock' },
          countSale: { $sum: '$productList.quantity' },
          count: { $sum: 1 },
        });

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question21: async (req, res, next) => {
    try {
      let { fromDate, toDate } = req.query;
      const conditionFind = getQueryDateTime(fromDate, toDate);

      let results = await Order.aggregate()
        .match({
          ...conditionFind,
          status: { $in: ['WAITING'] },
        })
        .unwind('productList')
        .lookup({
          from: 'customers',
          localField: 'customerId',
          foreignField: '_id',
          as: 'customer',
        })
        .unwind('customer')
        .group({
          _id: '$customer._id',
          firstName: { $first: '$customer.firstName' },
          lastName: { $first: '$customer.lastName' },
          email: { $first: '$customer.email' },
          phoneNumber: { $first: '$customer.phoneNumber' },
          address: { $first: '$customer.address' },
          birthday: { $first: '$customer.birthday' },
        });

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question22: async (req, res, next) => {
    try {
      let { fromDate, toDate } = req.query;
      const conditionFind = getQueryDateTime(fromDate, toDate);

      let results = await Order.aggregate()
        .match({
          ...conditionFind,
          status: { $in: ['WAITING'] },
        })
        .unwind({
          path: '$productList',
          preserveNullAndEmptyArrays: true,
        })
        .addFields({
          total: {
            $divide: [
              {
                $multiply: [
                  '$productList.price',
                  { $subtract: [100, '$productList.discount'] },
                  '$productList.quantity',
                ],
              },
              100,
            ]
          },
        })
        .lookup({
          from: 'customers',
          localField: 'customerId',
          foreignField: '_id',
          as: 'customer',
        })
        .unwind('customer')
        .group({
          _id: '$customer._id',
          firstName: { $first: '$customer.firstName' },
          lastName: { $first: '$customer.lastName' },
          email: { $first: '$customer.email' },
          phoneNumber: { $first: '$customer.phoneNumber' },
          address: { $first: '$customer.address' },
          birthday: { $first: '$customer.birthday' },
          total: { $sum: '$total' },
        })
        .sort({
          total: -1
        })

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  //-----------------addfield total , id:null
  question23: async (req, res, next) => {
    try {

      let results = await Order.aggregate()
        .unwind({
          path: '$productList',
          preserveNullAndEmptyArrays: true,
        })
        .addFields({
          total: {
            $sum: {
              $divide: [
                {
                  $multiply: [
                    '$productList.price',
                    { $subtract: [100, '$productList.discount'] },
                    '$productList.quantity',
                  ],
                },
                100,
              ],
            },
          },
        })
        // tính tổng tiền từng đơn hàng
        .group({
          _id: '$_id',
          total: { $sum: '$total' }
        })
        // tính tổng tất cả đon hàng gộp lại 
        // .group({
        //   _id:null,
        //   total: {$sum: '$total'}
        // })
        .sort({
          total: -1
        })

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question24: async (req, res, next) => {
    try {
      let results = await Employee.aggregate()
        .lookup({
          from: 'orders',
          localField: '_id',
          foreignField: 'employeeId',
          as: 'orders',
        })
        .unwind({
          path: '$orders',
          preserveNullAndEmptyArrays: true,
        })
        .unwind({
          path: '$orders.productList',
          preserveNullAndEmptyArrays: true,
        })
        .addFields({
          total: {
            $divide: [
              {
                $multiply: [
                  '$orders.productList.price',
                  { $subtract: [100, '$orders.productList.discount'] },
                  '$orders.productList.quantity',
                ],
              },
              100,
            ],
          },
        })
        .group({
          _id: '$_id',
          firstName: { $first: '$firstName' },
          lastName: { $first: '$lastName' },
          email: { $first: '$email' },
          phoneNumber: { $first: '$phoneNumber' },
          address: { $first: '$address' },
          birthday: { $first: '$birthday' },
          password: { $first: '$password' },
          total: { $sum: '$total' },
        })
        .sort({
          lastName: 1,
        });

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }

  }, /// khong hien nv so 4 -- Đã giải


  question25: async (req, res, next) => {
    try {
      // const conditionFind = ;

      let results = await Product.aggregate()
        .lookup({
          from: 'orders',
          localField: '_id',
          foreignField: 'productList.productId',
          as: 'orders',
        })
        .match({
          orders: { $size: 0 },
        })
        .project({
          id: 1,
          name: 1,
          price: 1,
          stock: 1,
        })

      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question26: async (req, res, next) => {
    try {
      let { fromDate, toDate } = req.query;
      const conditionFind = getQueryDateTime(fromDate, toDate);

      let results = await Product.aggregate()
        // .lookup({
        //   from: 'products',
        //   localField: '_id',
        //   foreignField: 'supplierId',
        //   as: 'products',
        // })
        // .unwind({
        //   path: '$products',
        //   preserveNullAndEmptyArrays: true,
        // })
        .lookup({
          from: 'orders',
          localField: '_id',
          foreignField: 'productList.productId',
          as: 'orders',
        })
        .unwind({
          path: '$orders',
          preserveNullAndEmptyArrays: true,
        })
        .match({
          $or: [
            {
              $and: [
                { orders: { $ne: null } },
                {
                  $or: [
                    { 'orders.createdDate': { $lte: fromDate } },
                    { 'orders.createdDate': { $gte: toDate } },
                  ],
                },
              ],
            },
            {
              orders: null,
            },
          ],
        })
        .lookup({
          from: 'suppliers',
          localField: 'supplierId',
          foreignField: '_id',
          as: 'suppliers',
        })
        .project({
          _id: 0,
          suppliers: 1,
        })
        .unwind('suppliers')
        .project({
          _id: '$suppliers._id',
          name: '$suppliers.name',
          email: '$suppliers.email',
          phoneNumber: '$suppliers.phoneNumber',
          address: '$suppliers.address',
        })
        .group({
          _id: '$_id',
          name: { $first: '$name' },
          phoneNumber: { $first: '$phoneNumber' },
          email: { $first: '$email' },
          address: { $first: '$address' },
        })

      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  }, // làm sai khong ra ket qua

  question26b: async (req, res, next) => {
    try {
      let { fromDate, toDate } = req.query;
      const conditionFind = getQueryDateTime(fromDate, toDate);

      let results = await Supplier.aggregate()
        .lookup({
          from: 'products',
          localField: '_id',
          foreignField: 'supplierId',
          as: 'products',
        })
        .unwind({
          path: '$products',
          preserveNullAndEmptyArrays: true,
        })
        .lookup({
          from: 'orders',
          localField: 'products._id',
          foreignField: 'productList.productId',
          as: 'orders',
        })
        .unwind({
          path: '$orders',
          preserveNullAndEmptyArrays: true,
        })
        .project({
          name: 1,
          orders: 1
        })
        .match({
          $or: [
            {
              $and: [
                { orders: { $ne: null } },
                {
                  $or: [
                    { 'orders.createdDate': { $lte: fromDate } },
                    { 'orders.createdDate': { $gte: toDate } },
                  ],
                },
              ],
            },
            {
              orders: null,
            },
          ],
        })
        .group({
          _id: '$_id',
          name: { $first: '$name' },
        })

      let total = await Supplier.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  }, 

  //-----------------limit & skip
  question27: async (req, res, next) => {
    try {
      let { fromDate, toDate } = req.query;
      const conditionFind = getQueryDateTime(fromDate, toDate);

      let results = await Order.aggregate()
        .match(conditionFind)
        .unwind('productList')
        .addFields({
          'productList.originalPrice': {
            $divide: [
              {
                $multiply: [
                  '$productList.price',
                  { $subtract: [100, '$productList.discount'] },
                ],
              },
              100,
            ],
          },
        })
        .group({
          _id: '$employeeId',
          totalSales: {
            $sum: { $multiply: ['$productList.originalPrice', '$productList.quantity'] },
          },
        })
        .lookup({
          from: 'employees',
          localField: '_id',
          foreignField: '_id',
          as: 'employees',
        })
        .unwind('employees')
        .project({
          employeeId: '$_id',
          firstName: '$employees.firstName',
          lastName: '$employees.lastName',
          phoneNumber: '$employees.phoneNumber',
          address: '$employees.address',
          email: '$employees.email',
          totalSales: 1,
        })
        .sort({ totalSales: -1 })
        .limit(3)
        .skip(0)

      // .group({
      //   _id: '$totalSales',
      //   employees: { $push: '$$ROOT' },
      // })
      // // .sort({ _id: -1 })


      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question28: async (req, res, next) => {
    try {
      let { fromDate, toDate } = req.query;
      const conditionFind = getQueryDateTime(fromDate, toDate);

      let results = await Order.aggregate()
        .match(conditionFind)
        .unwind('productList')
        .addFields({
          'productList.originalPrice': {
            $divide: [
              {
                $multiply: [
                  '$productList.price',
                  { $subtract: [100, '$productList.discount'] },
                ],
              },
              100,
            ],
          },
        })
        .group({
          _id: '$customerId',
          totalBuy: {
            $sum: { $multiply: ['$productList.originalPrice', '$productList.quantity'] },
          },
        })
        .lookup({
          from: 'customers',
          localField: '_id',
          foreignField: '_id',
          as: 'customer',
        })
        .unwind('customer')
        .project({//...............................??????????
          employeeId: '$_id',
          firstName: '$customers.firstName',
          lastName: '$customers.lastName',
          phoneNumber: '$customers.phoneNumber',
          address: '$customers.address',
          email: '$customers.email',
          totalBuy: 1,
        })
        .sort({ totalBuy: -1 })
        .limit(5)
        .skip(0);


      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  }, //..............??

  question29: async (req, res, next) => {
    try {
      let results = await Product.distinct('discount')

      let total = await Product.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question30: async (req, res, next) => {
    try {
      let results = await Category.aggregate()
        .lookup({
          from: 'products',
          localField: '_id',
          foreignField: 'categoryId',
          as: 'products'
        })
        .unwind({
          path: '$products',
          preserveNullAndEmptyArrays: true,
        })
        .lookup({
          from: 'orders',
          localField: 'products._id',
          foreignField: 'productList.productId',
          as: 'orders'
        })
        .unwind({
          path: '$orders',
          preserveNullAndEmptyArrays: true,
        })
        .unwind({
          path: '$orders.productList',
          preserveNullAndEmptyArrays: true,
        })
        .addFields({
          originalPrice: {
            $divide: [
              {
                $multiply: [
                  '$orders.productList.price',
                  { $subtract: [100, '$orders.productList.discount'] },
                ],
              },
              100,
            ],
          },
          amount: '$orders.productList.quantity',
        })
        .group({
          _id: '$_id',
          name: { $first: '$name' },
          description: { $first: '$description' },
          total: {
            $sum: { $multiply: ['$originalPrice', '$amount'] },
          },
        })
        .sort({
          description: 1
        })

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question31: async (req, res, next) => {
    try {
      let { fromDate, toDate } = req.query;
      const conditionFind = getQueryDateTime(fromDate, toDate);

      let results = await Order.aggregate()
        .match({
          ...conditionFind,
          status: { $in: ['WAITING'] },
        })
        .unwind({
          path: '$productList',
          preserveNullAndEmptyArrays: true,
        })
        .addFields({
          originalPrice: {
            $sum: {
              $divide: [
                {
                  $multiply: [
                    '$productList.price',
                    { $subtract: [100, '$productList.discount'] },
                  ],
                },
                100,
              ],
            },
          },
        })
        .group({
          _id: '$productList._id',
          createdDate: { $first: '$createdDate' },
          shippedDate: { $first: '$shippedDate' },
          status: { $first: '$status' },
          total: {
            $sum: { $multiply: ['$originalPrice', '$productList.quantity'] },
          },
        })

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question32: async (req, res, next) => {
    try {
      let { fromDate, toDate } = req.query;
      const conditionFind = getQueryDateTime(fromDate, toDate);

      let results = await Order.aggregate()
        .match({
          ...conditionFind
        })
        .unwind({
          path: '$productList',
          preserveNullAndEmptyArrays: true,
        })
        .addFields({
          originalPrice: {
            $sum: {
              $divide: [
                {
                  $multiply: [
                    '$productList.price',
                    { $subtract: [100, '$productList.discount'] },
                  ],
                },
                100,
              ],
            },
          },
        })
        .group({
          _id: '$productList._id',
          createdDate: { $first: '$createdDate' },
          shippedDate: { $first: '$shippedDate' },
          status: { $first: '$status' },
          total: {
            $sum: { $multiply: ['$originalPrice', '$productList.quantity'] },
          },
        })
        .sort({
          total: -1
        })

      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question33: async (req, res, next) => {
    try {
      let { fromDate, toDate } = req.query;
      const conditionFind = getQueryDateTime(fromDate, toDate);

      let results = await Order.aggregate()
        .match({
          ...conditionFind
        })
        .unwind({
          path: '$productList',
          preserveNullAndEmptyArrays: true,
        })
        .addFields({
          originalPrice: {
            $sum: {
              $divide: [
                {
                  $multiply: [
                    '$productList.price',
                    { $subtract: [100, '$productList.discount'] }
                  ],
                },
                100,
              ],
            },
          },
        })
        .group({
          _id: '$productList._id',
          createdDate: { $first: '$createdDate' },
          shippedDate: { $first: '$shippedDate' },
          status: { $first: '$status' },
          total: {
            $sum: { $multiply: ['$originalPrice', '$productList.quantity'] },
          },
        })
        .sort({
          total: 1
        })
        .limit(1)
        .skip(0)


      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question34: async (req, res, next) => {
    try {
      let { fromDate, toDate } = req.query;
      const conditionFind = getQueryDateTime(fromDate, toDate);

      let results = await Order.aggregate()
        .match({
          ...conditionFind
        })
        .unwind({
          path: '$productList',
          preserveNullAndEmptyArrays: true,
        })
        .addFields({
          originalPrice: {
            $sum: {
              $divide: [
                {
                  $multiply: [
                    '$productList.price',
                    { $subtract: [100, '$productList.discount'] }
                  ],
                },
                100,
              ],
            },
          },
        })
        .group({
          _id: '$_id',
          createdDate: { $first: '$createdDate' },
          shippedDate: { $first: '$shippedDate' },
          status: { $first: '$status' },
          shippingAddress: { $first: '$shippingAddress' },
          description: { $first: '$description' },
          total: {
            $sum: { $multiply: ['$originalPrice', '$productList.quantity'] },
          },
        })
        .group({
          _id: null,
          avg: { $avg: '$total' },
        })
        .project({
          _id: 0,
          avg: 1,
        })



      let total = await Order.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },



  //-------------------------------------------------------------------------------------------------------------------------------------------//
  questionTest: async (req, res, next) => {
    try {

      let results = await Employee.aggregate()
        .lookup({
          from: 'orders',
          localField: '_id',
          foreignField: 'employeeId',
          as: 'orders',
        })
        .unwind({
          path: '$orders',
          preserveNullAndEmptyArrays: true,
        })
        .unwind({
          path: '$orders.productList',
          preserveNullAndEmptyArrays: true,
        })
        .addFields({
          total: {
            $divide: [
              {
                $multiply: [
                  '$orders.productList.price',
                  { $subtract: [100, '$orders.productList.discount'] },
                  '$orders.productList.quantity',
                ],
              },
              100,
            ],
          },
        })
        .group({
          _id: '$_id',
          firstName: { $first: '$firstName' },
          lastName: { $first: '$lastName' },
          email: { $first: '$email' },
          phoneNumber: { $first: '$phoneNumber' },
          address: { $first: '$address' },
          birthday: { $first: '$birthday' },
          password: { $first: '$password' },
          total: { $sum: '$total' },
        })
        .sort({
          lastName: 1,
        });

      //-------------------------------
      // let results = await Order.find().populate('customers')
      let total = await Employee.countDocuments();

      return res.send({
        code: 200,
        total,
        totalResult: results.length,
        payload: results,
      });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }

  },
};