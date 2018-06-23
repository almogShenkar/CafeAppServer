function orderlist(data){
    this.data=data;

    this.getData=()=>{
        return this.data;
    }
}


module.exports = orderlist;