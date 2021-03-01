$.fn.SD_ACTIONS = {};
 
$.fn.addAction = function(id,callback){
    this.SD_ACTIONS[id+"_before"] = function(t){};
    this.SD_ACTIONS[id] = callback;
    this.SD_ACTIONS[id+"_after"] = function(t,r){};
}

$.fn.doAction = function(id){
    var self = this;
    new Promise(function(resolve,reject){
        try {
            resolve( self.SD_ACTIONS[id+"_before"](self) );
        } catch (error) {
            reject(error);
        }
    })
    .then(function(r){
        new Promise(function(resolve,reject){
            try {
                resolve( self.SD_ACTIONS[id](self,r) );
            } catch (error) {
                reject(error);
            }
        })
        .then(function(r){
            try {
               self.SD_ACTIONS[id+"_after"](self,r);
            } catch (error) {
                console.error(error);
            } 
        })
        .catch(function(error){
            console.error(error);
        });
    })
    .catch(function(error){
        console.error(error);
    });
}

$.fn.onActionBefore = function(id,callback){
    if( this.SD_ACTIONS[id+"_before"] != undefined){
        this.SD_ACTIONS[id+"_before"] = callback;
    }else{
        console.error(`'${id}' Action is undefined!`);
    }
}

$.fn.onActionAfter = function(id,callback){
    if( this.SD_ACTIONS[id+"_after"] != undefined){
        this.SD_ACTIONS[id+"_after"] = callback;
    }else{
        console.error(`'${id}' Action is undefined!`);
    }
}

$.fn.isAction = function(id){
    if( this.SD_ACTIONS[id] != undefined){
        return true;
    }
    return false;
}