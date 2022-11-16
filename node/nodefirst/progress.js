const os = require("os");

let position = os.type().toLocaleLowerCase().indexOf("windows")
if(position >= 0){
    console.log("windows");
}else{
    console.log("windows 아님");
}
