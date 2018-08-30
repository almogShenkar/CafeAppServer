/**
 * DataObject - created to store request/response Json data - imporve code readability only - nothing special
 * input:json as data
 */
function DataObject(data){
    this.data=data;
    
    this.getData=()=>{
        return this.data;
    }
    
    this.deletePassword=()=>{
        this.data.password="****";
    }
}
module.exports = DataObject;
