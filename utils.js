const exec = async function (fn, res){
    let status = 200;
        let data = {};
        try {
          data = await fn();
        }catch (e) {
          status = e.status || 500;
          data = { message: e.message, status: false };
        }finally {
          res.status(status).json(data);
        }
}

module.exports = { exec }