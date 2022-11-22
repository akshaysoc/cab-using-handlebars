const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const Handlebars = require('handlebars');
const cabsignup = require('./data/cabsignup.js');
const path = require('path');

const server = http.createServer(function (req, res) {
    const link = url.parse(req.url, true);
    const query = link.query;
    const page = link.pathname;

    if (page == "/") {
        let t = renderTemplate('cabhome');
        res.end(t);
    }

    else if (page == "/booking") {
        let t = renderTemplate('cabbook');
        res.end(t);
    }

    else if (page == "/signin") {
        let t = renderTemplate('cabsignin');
        res.end(t);
    }

    else if(page.startsWith("/statics")){
        console.log(page);
        let fileName = page.replace("/statics/", "");
        console.log(fileName);
        var file = fs.readFileSync("./statics/"  + fileName);
        res.end(file);
    }

    else if( page.startsWith("/statics/image")){
        console.log(page);
        let fileName = page.replace("/statics/image", "");
        console.log(fileName);
        var file = fs.readFileSync("./statics/image/"  + fileName);
        res.end(file);
    }

    else if (page == "/signup" && req.method == "GET") {
        let template = renderTemplate('cabsignup', {});
        res.end(template);
    }

    else if (page == "/signup" && req.method == "POST") {
        var formData = '';
        req.on('data', function (data) {
            formData += data.toString();
        });

        req.on('end', function () {
        let userData = qs.parse(formData);
        console.log(userData);
        cabsignup.addOne(userData.fullname, userData.mobile_no, userData.email, userData.Password, userData.cpassword, (err, result) => {
                var context = {
                    result: {
                        success: true,
                        errors: []
                    }
                };
                if (err) {
                    console.log(err);
                    context.result.success = false;
                }
                else if(result){
                    console.log("sucess");
                }
                let t = renderTemplate('cabsignup');
                res.end(t);
            });

    });
}
});

server.listen(80);

function renderTemplate(name) {
    var filePath = path.join(__dirname,"templates", name + ".hbs");
    let templateText = fs.readFileSync(filePath, "utf8");
    let template = Handlebars.compile(templateText);
    return template()
}