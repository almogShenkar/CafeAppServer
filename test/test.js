const should = require("should");
const request = require("request");
const expect = require("chai").expect;
const ProductionUrl = "https://cafeappserver.herokuapp.com";
const DevUrl = "http://localhost:3000";


/*
describe('GET /api/users',()=>{
    it('returns all users',(done)=>{
        request.get({uri:ProductionUrl+'/api/users/'},(err,response,body)=>{
            (response.statusCode).should.equal(200);
            expect(body).to.have.length>1;
            done();
        });
    });
});


describe('GET /api/users/:id',()=>{
    it('returns one user',(done)=>{
        request.get({uri:ProductionUrl+'/api/users/'+'1'},(err,response,body)=>{
            (response.statusCode).should.equal(200);
            expect(body).to.have.length==1;
            done();
        });
        
    });
});

describe('GET /api/users/:role',()=>{
    it('returns all by role',(done)=>{
        let role="Student";
        request.get({uri:ProductionUrl+'/api/users/role/'+role},(err,response,body)=>{
            (response.statusCode).should.equal(200);
            expect(body.role).equal=role;
            done();
        });
        
    });
});


describe('GET /api/items',()=>{
    it('returns all items',(done)=>{
        request.get({uri:ProductionUrl+'/api/items'},(err,response,body)=>{
            (response.statusCode).should.equal(200);
            expect(body).to.have.length>1;
            done();
        });
        
    });
});


describe('POST /api/items',()=>{
    it('returns all items',(done)=>{
        let jsonData={
            "supid": 1,
            "name": "Super Doppio test",
            "description": "Two shots of espersso straight",
            "qty": 666,
            "url": "items-drinks/1.png",
            "price": 6.5,
            "type": "Drinks",
            "ispublished": 1,
            "preptime": 1};
        request.post({uri:ProductionUrl+'/api/items',body:jsonData,json:true},(err,response,body)=>{
             (response.statusCode).should.equal(200);
             done();
        });
    });
});


describe('PUT /api/items',()=>{
    it('returns all items',(done)=>{
        let jsonData={
            "itemid": 1,
            "supid": 1,
            "name": "Doppio",
            "description": "double shot, extracted using a double coffee filter in the portafilter",
            "qty": 111,
            "url": "items-drinks/1.png",
            "price": 5,
            "type": "Drinks",
            "ispublished": 1,
            "preptime": 1
            };
            jsonData.qty=Math.floor(Math.random() * 201);
        request.put({uri:ProductionUrl+'/api/items',body:jsonData,json:true},(err,response,body)=>{
             (response.statusCode).should.equal(200);
             expect(body).to.deep.equal({ changedRows: 1 });
             done();
        });
        
    });
});



describe('GET /api/reviewlists',()=>{
    it('returns all reviewlists',(done)=>{
        request.get({uri:ProductionUrl+'/api/reviewlists'},(err,response,body)=>{
             (response.statusCode).should.equal(200);
             expect(body).to.have.length>1;
             done();
        });
        
    });
});


describe('PUT /api/reviews',()=>{
    it('returns all reviews',(done)=>{
        let jsonData={
            "revid": 22,
            "userid": 1,
            "rlid": 24,
            "stars": 3,
            "comment": "new comment updated via test"
        }
        jsonData.comment+=Math.floor(Math.random() * 10).toString;
        request.put({uri:ProductionUrl+'/api/reviews',body:jsonData,json:true},(err,response,body)=>{
             (response.statusCode).should.equal(200);
             expect(body).to.deep.equal({ changedRows: 1 });
             done();
        });
        
    });
});



describe('POST /api/login',()=>{
    it('returns all reviews',(done)=>{
        let jsonData={
            "email":"almogassu@gmail.com",
            "password":"0000"
        }
        jsonData.comment+=Math.floor(Math.random() * 10).toString;
        request.post({uri:ProductionUrl+'/api/login',body:jsonData,json:true},(err,response,body)=>{
             (response.statusCode).should.equal(200);
             expect(body).to.deep.equal({ userid: 1102 });
             done();
        });
        
    });
});

describe('GET /api/ordereditems',()=>{
    it('returns all ordereditem',(done)=>{
        request.get({uri:ProductionUrl+'/api/ordereditems'},(err,response,body)=>{
             (response.statusCode).should.equal(200);
             done();
        });
        
    });
});



describe('GET /api/ordereditems',()=>{
    it('returns all ordereditem',(done)=>{
        request.get({uri:ProductionUrl+'/api/query/orderlistreportFromDateToDate?param1=2018-06-21T15:32:00.000Z&param2=2018-08-21T15:32:00.000Z'},(err,response,body)=>{
             (response.statusCode).should.equal(200);
             done();
        });
        
    });
});

*/


describe('POST /api/suppliers',()=>{
    it('returns all suppliers',(done)=>{
        let jsonData={
            "name": "Elite",
            "phone": "05445556655",
            "email": "CocaCCola@gmail.com"};
        jsonData.phone=(Number(jsonData.phone)-1).toString();
        request.post({uri:ProductionUrl+'/api/suppliers',body:jsonData,json:true},(err,response,body)=>{
             (response.statusCode).should.equal(200);
             done();
        });
    });
});
