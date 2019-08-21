exports.allowOnly = function(accessLevel, callback) {
    function checkUserRole(req, res) {
        console.log(req.user.roles)
        if (req.user.roles.indexOf(accessLevel) === -1) {
            return res.sendStatus(403);
        }
        callback(req, res);
    }
    return checkUserRole
}