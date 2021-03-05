module.exports = (data) => {
    return Object.prototype.toString.call(data).split(' ')[1].replace(']', '');
};
