const authorize = (roles) => {
    return (req, res, next) => {
        if ( !roles.includes(req.user.roles) ) return res.status(403).json({status: "failure", msg: "Unauthorize route, you don't have permission to use this resource!"  })
        next();
    }
}

module.exports = authorize;