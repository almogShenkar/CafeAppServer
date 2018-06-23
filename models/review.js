function Review(data){
    this.data=data;

    this.getData=()=>{
        return this.data;
    }
}

module.exports = Review;