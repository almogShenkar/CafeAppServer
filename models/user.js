function User(data){
    this.data=data;
    
    this.getData=()=>{
        return this.data;
    }
    
    this.deletePassword=()=>{
        this.data.password="****";
    }
}
module.exports = User;
