const exec = require('child_process').exec;

let process = exec('dir');

//프로세스가 정상적으로 수행되면
process.stdout.on('data', function(data){
    console.log(data.toString());

});
//수행되지않으면
process.stderr.on('data', function(data){
    console.log(data.toString());
})