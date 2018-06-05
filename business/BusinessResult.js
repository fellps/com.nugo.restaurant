const moment = require('moment')

const BusinessResult = {
    success: (ctx, data, message) => {
        ctx.status = 200
        ctx.body = {
            data: data ? data || [] : [],
            error: false,
            requestedAt: moment().format(),
            message: message ? message : 'Success',
        }
        return ctx
    },
    error: (ctx, message) => {
        ctx.status = 500
        ctx.body = {
            error: true,
            requestedAt: moment().format(),
            message: message
        }
        return ctx
    },
}

module.exports = BusinessResult
