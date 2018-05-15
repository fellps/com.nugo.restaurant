const moment = require('moment')

const BusinessResult = {
    success: (ctx, data, message) => {
        return ctx.body = {
            data: data ? data || [] : [],
            error: false,
            requestedAt: moment().format(),
            message: message ? message : 'Success',
            status: 200
        }
    },
    error: (ctx, message) => {
        return ctx.body = {
            error: true,
            requestedAt: moment().format(),
            message: message
        }
    },
}

module.exports = BusinessResult