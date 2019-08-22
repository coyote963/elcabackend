exports.allowOnly = function(accessLevel, callback) {
    function checkUserRole(req, res) {
        if (req.user.roles.indexOf(accessLevel) === -1) {
            return res.sendStatus(403);
        }
        callback(req, res);
    }
    return checkUserRole
}
