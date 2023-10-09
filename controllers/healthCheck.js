async function basicHealthCheck(req, res, next) {
    console.log('something')
    res.status(200).json({
        success: true,
        message: "success"
    })
}

module.exports = { basicHealthCheck }