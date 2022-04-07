//HOF -> high Order Functions
const permissionsAdmin = (admin) => {

    return (req, res, next) => {
            if (admin) {
                return next();
            }
            return res.status(401).json({
                error: -1,
                descripcion: 'No eres admin'
            });
        }
        //HTTP Forbidden
}

module.exports = permissionsAdmin;