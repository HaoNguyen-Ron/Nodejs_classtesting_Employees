
// var indexRouter = require('./modules/index');
// var usersRouter = require('./modules/users');
// var productRouter = require('./modules/product/router');
// var categoryRouter = require('./modules/category/router');
// var suppliersRouter = require('./modules/supplier/router');
// var employeesRouter = require('./modules/employee/router');
// var customerRouter = require('./modules/customer/router');
// var orderRouter = require('./modules/order/router');
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/products', productRouter);
// app.use('/categories', categoryRouter);
// app.use('/suppliers', suppliersRouter);
// app.use('/employees', employeesRouter);
// app.use('/customers', customerRouter);
// app.use('/orders', orderRouter);

//ADD passport control for TOKEN: passport.authenticate('jwt', { session: false })

const passport = require('passport');


const routes = [
    {
        path: '/auth',
        validator: [],
        router: require('./modules/auth/router')
    },
    {
        path: '/products',
        validator: [],
        router: require('./modules/product/router')
    },
    {
        path: '/categories',
        validator: [passport.authenticate('jwt', { session: false })],
        router: require('./modules/category/router')
    },
    {
        path: '/suppliers',
        validator: [passport.authenticate('jwt', { session: false })],
        router: require('./modules/supplier/router')
    },
    {
        path: '/employees',
        validator: [passport.authenticate('jwt', { session: false })],
        router: require('./modules/employee/router')
    },
    {
        path: '/customers',
        validator: [passport.authenticate('jwt', { session: false })],
        router: require('./modules/customer/router')
    },
    {
        path: '/orders',
        validator: [passport.authenticate('jwt', { session: false })],
        router: require('./modules/order/router')
    },
    {
        path: '/questions',
        validator: [],
        router: require('./modules/question/router')
    },
    {
        path: '/Media',
        validator: [passport.authenticate('jwt', { session: false })],
        router: require('./modules/media/router')
    },
];

module.exports = routes

