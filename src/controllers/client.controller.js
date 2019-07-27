// import adss from '../public/home.html'
import path from 'path';

exports.home = async function (req, res, next) {
    return res.sendFile(path.join(__dirname, '../public/html/home.html'));
};

