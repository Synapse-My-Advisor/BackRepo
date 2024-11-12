export function loggerMiddle(req, res, next) {
    if (!req.body.nome) {
        return res.send('name error').status(400);
    }

    if (!req.body.email) {
        return res.send('email error').status(400);
    }
    
    next();
};