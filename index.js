const http = require('http');
const path = require('path')
const fs = require('fs')
const fetch = require('node-fetch');
const args = process.argv;
month = args[2]
date = args[3]

fetch(`https://history.muffinlabs.com/date/${month}/${date}`)
    .then((res) => res.json())
    .then((data) => {
        fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data), (err) => {
            if (err) throw err;
        })
    });


const server = http.createServer((req, res) => {
    if (req.url == '/'){
        fs.readFile(path.join(__dirname,'data.json'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'application/json'})
            res.end(content)
        })
        
    }
    
})

server.listen(5000, () => console.log('Running'))

