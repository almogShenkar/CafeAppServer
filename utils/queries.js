/**
 *Advanced util queries module - example of customization queries
 */


let queries = {};

queries.TodayBestUsers= (queryParams)=>{
    return "SELECT DISTINCT USER.userid , USER.email , USER.firstname , USER.lastname , SUM(ORDERLIST.totalprice) total FROM ORDERLIST LEFT OUTER JOIN USER ON ORDERLIST.userid=USER.userid WHERE DAY(CURDATE())=DAY(ORDERLIST.OL_DTTM) GROUP BY USER.userid ORDER BY total DESC";
};
queries.WeekBestUsers= (queryParams)=>{
    return "SELECT DISTINCT USER.userid , USER.email , USER.firstname , USER.lastname , SUM(ORDERLIST.totalprice) total FROM ORDERLIST LEFT OUTER JOIN USER ON ORDERLIST.userid=USER.userid WHERE WEEK(CURDATE())=WEEK(ORDERLIST.OL_DTTM) GROUP BY USER.userid ORDER BY total DESC";
};
queries.MonthBestUsers= (queryParams)=>{
    return "SELECT DISTINCT USER.userid , USER.email , USER.firstname , USER.lastname , SUM(ORDERLIST.totalprice) total FROM ORDERLIST LEFT OUTER JOIN USER ON ORDERLIST.userid=USER.userid WHERE MONTH(curdate())=MONTH(ORDERLIST.OL_DTTM) GROUP BY USER.userid ORDER BY total DESC";
};

queries.TodayBestItems= (queryParams)=>{
    return "SELECT DISTINCT ITEM.itemid , ITEM.name , SUM(ORDEREDITEM.qty) total, ITEM.price, ITEM.price * SUM(ORDEREDITEM.qty) TotalSum  FROM ITEM LEFT OUTER JOIN ORDEREDITEM ON ITEM.itemid=ORDEREDITEM.itemid LEFT OUTER JOIN ORDERLIST ON ORDERLIST.olid=ORDEREDITEM.olid WHERE DAY(CURDATE()) = DAY(ORDERLIST.OL_DTTM) GROUP BY ITEM.itemid ORDER BY ORDEREDITEM.qty DESC";
};
queries.WeekBestItems= (queryParams)=>{
    return "SELECT DISTINCT ITEM.itemid , ITEM.name , SUM(ORDEREDITEM.qty) total, ITEM.price, ITEM.price * SUM(ORDEREDITEM.qty) TotalSum FROM ITEM LEFT OUTER JOIN ORDEREDITEM ON ITEM.itemid=ORDEREDITEM.itemid LEFT OUTER JOIN ORDERLIST ON ORDERLIST.olid=ORDEREDITEM.olid WHERE WEEK(CURDATE()) = WEEK(ORDERLIST.OL_DTTM) GROUP BY ITEM.itemid ORDER BY ORDEREDITEM.qty DESC";
};
queries.MonthBestItems=(queryParams)=>{
    return "SELECT DISTINCT ITEM.itemid , ITEM.name , SUM(ORDEREDITEM.qty) total, ITEM.price, ITEM.price * SUM(ORDEREDITEM.qty) TotalSum FROM ITEM LEFT OUTER JOIN ORDEREDITEM ON ITEM.itemid=ORDEREDITEM.itemid LEFT OUTER JOIN ORDERLIST ON ORDERLIST.olid=ORDEREDITEM.olid WHERE MONTH(CURDATE()) = MONTH(ORDERLIST.OL_DTTM) GROUP BY ITEM.itemid ORDER BY ORDEREDITEM.qty DESC";
};

queries.TodayBestSuppliers= (queryParams)=>{
    return "SELECT DISTINCT ITEM.name , SUM(ITEM.price) total, ITEM.SUPID FROM ORDERLIST LEFT OUTER JOIN ORDEREDITEM ON ORDEREDITEM.OLID = ORDERLIST.OLID LEFT OUTER JOIN ITEM ON ITEM.itemid = ORDEREDITEM.itemid WHERE DAY(CURDATE()) = DAY(ORDERLIST.OL_DTTM) GROUP BY ITEM.SUPID ORDER BY totalprice DESC";
};
queries.WeekBestSuppliers= (queryParams)=>{
    return "SELECT DISTINCT ITEM.name , SUM(ITEM.price) total, ITEM.SUPID FROM ORDERLIST LEFT OUTER JOIN ORDEREDITEM ON ORDEREDITEM.OLID = ORDERLIST.OLID LEFT OUTER JOIN ITEM ON ITEM.itemid = ORDEREDITEM.itemid WHERE WEEK(CURDATE()) = WEEK(ORDERLIST.OL_DTTM) GROUP BY ITEM.SUPID ORDER BY totalprice DESC";
};
queries.MonthBestSuppliers= (queryParams)=>{
    return"SELECT DISTINCT ITEM.name , SUM(ITEM.price) total, ITEM.SUPID FROM ORDERLIST LEFT OUTER JOIN ORDEREDITEM ON ORDEREDITEM.OLID = ORDERLIST.OLID LEFT OUTER JOIN ITEM ON ITEM.itemid = ORDEREDITEM.itemid WHERE MONTH(CURDATE()) = MONTH(ORDERLIST.OL_DTTM) GROUP BY ITEM.SUPID ORDER BY totalprice DESC";
};

queries.WeekHardEmployee=(queryParams)=>{
    return "SELECT DISTINCT EMPLOYEE.firstname , EMPLOYEE.lastname ,COUNT(*) FROM SHIFT LEFT OUTER JOIN EMPLOYEE ON EMPLOYEE.EMPID = SHIFT.EMPID WHERE WEEK(SHIFT.START_DTTM) = WEEK(CURDATE()) GROUP BY EMPLOYEE.EMPID ORDER BY COUNT(*) DESC";
};

queries.MonthHardEmployee= (queryParams)=>{
    return "SELECT DISTINCT EMPLOYEE.firstname , EMPLOYEE.lastname ,COUNT(*) FROM SHIFT LEFT OUTER JOIN EMPLOYEE ON EMPLOYEE.EMPID = SHIFT.EMPID WHERE MONTH(SHIFT.START_DTTM) = MONTH(CURDATE()) GROUP BY EMPLOYEE.EMPID ORDER BY COUNT(*) DESC";
};

//return firstname,lastname,qtyInOrderlist,totalPrice desc
queries.orderlistreportFromDateToDate= (queryParams)=>{
    let fromDate= queryParams.param1;
    let toDate= queryParams.param2;
    return "SELECT DISTINCT CONCAT(CONCAT(user.firstname,' '),user.lastname) 'fullname',orderlist.userid,olid,ol_dttm,ol_dttm_real,totalprice FROM ORDERLIST JOIN user ON user.userid=ORDERLIST.userid WHERE ol_dttm BETWEEN DATE(\'"+fromDate+"\') AND DATE(\'"+toDate+"\')  ORDER BY ol_dttm DESC" ;
};

//TODO
// items reviews descending by rank
queries.ItemsByRank= (queryParams)=>{
    let itemid=queryParams.param1;
    return "SELECT DISTINCT item.itemid,name,stars,comment FROM review JOIN reviewlist ON review.rlid=reviewlist.rlid JOIN item ON reviewlist.itemid=item.itemid ORDER BY stars DESC";
};


/* future work
queries.TodayWorstItems="SELECT ITEM.itemid , ITEM.name , SUM(ORDEREDITEM.qty) total, ITEM.price FROM ITEM LEFT OUTER JOIN ORDEREDITEM ON ITEM.itemid=ORDEREDITEM.itemid LEFT OUTER JOIN ORDERLIST ON ORDERLIST.olid=ORDEREDITEM.olid WHERE WEEK(CURDATE()) = WEEK(ORDERLIST.OL_DTTM) GROUP BY ITEM.itemid ORDER BY ORDEREDITEM.qty ";
queries.WeekWorstItems="SELECT ITEM.itemid , ITEM.name , SUM(ORDEREDITEM.qty) total, ITEM.price FROM ORDERLIST LEFT OUTER JOIN ORDEREDITEM ON ORDERLIST.OLID = ORDEREDITEM.OLID LEFT OUTER JOIN ITEM ON ITEM.itemid = ORDEREDITEM.itemid WHERE WEEK(CURDATE()) = WEEK(ORDERLIST.OL_DTTM) GROUP BY ITEM.itemid ORDER BY ORDEREDITEM.qty ASC";
queries.MonthWorstItems="SELECT ITEM.itemid , ITEM.name , SUM(ORDEREDITEM.qty) total, ITEM.price FROM ORDERLIST LEFT OUTER JOIN ORDEREDITEM ON ORDERLIST.OLID = ORDEREDITEM.OLID LEFT OUTER JOIN ITEM ON ITEM.itemid = ORDEREDITEM.itemid WHERE MONTH(CURDATE()) = MONTH(ORDERLIST.OL_DTTM) GROUP BY ITEM.itemid ORDER BY ORDEREDITEM.qty ASC";
*/


module.exports = queries;


