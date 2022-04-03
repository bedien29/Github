const jwt = require('jsonwebtoken');

exports.checkLogin = function (req, res, next) {
    const { session } = req;
    const url = req.originalUrl.toLowerCase();

    if (!session) {
        if (url.includes('dang-nhap')) {
            next();
        } else {
            res.redirect('/dang-nhap');
        }
    } else {
        const { token } = session;
        if (!token) {
            if (url.includes('dang-nhap')) {
                next();
            } else {
                res.redirect('/dang-nhap');
            }
        } else {
            jwt.verify(token, 'myKey', function (error, decoded) {
                if (error) {
                    if (url.includes('dang-nhap')) {
                        next();
                    } else {
                        res.redirect('/dang-nhap');
                    }
                } else {
                    if (url.includes('dang-nhap')) {
                        res.redirect('/san-pham');
                    } else {
                        next();
                    }
                }
            })
        }
    }
}