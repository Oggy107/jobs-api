const notFound = (req, res, next) => {
    res.status(404).send("<h2>Nothing Here</h2>");
    next();
}

module.exports = notFound;