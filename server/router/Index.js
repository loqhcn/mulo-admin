var express = require('express')
var router = express.Router()
var http = require('./../core/http')


router.get('/pages', function (req, res, next) {
    http.get('index/pages').then(_res => {
        res.json(_res)
    }).catch(err => {
        res.json({
            code: 500,
            msg: '',
            err: err
        })
    })
})

module.exports = router

