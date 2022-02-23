const authorize = (role) => {
    return (req, res, next) => {
        if ( req.user.roles !== role ) return res.status(403).json({status: "failure", msg: "Unauthorize route, you don't have permission to use this resource!"  })
        next();
    }
}

module.exports = authorize;