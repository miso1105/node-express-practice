exports.renderMain = (req, res) => {
    res.render('main'); 
}; 

exports.renderJoin = (req, res, next) => {
    res.render('join')  // views/join.html 렌더링 
};