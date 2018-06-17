/*Advanced util queries - Report usage */

var queries = {};

queries.TodayBestUsers= function(queryParams){
    return "SELECT USER.userid , USER.email , USER.firstname , USER.lastname , SUM(ORDERLIST.totalprice) total FROM ORDERLIST LEFT OUTER JOIN USER ON ORDERLIST.userid=USER.userid WHERE DAY(CURDATE())=DAY(ORDERLIST.OL_DTTM) GROUP BY USER.userid ORDER BY total DESC";
};
queries.WeekBestUsers= function(queryParams){
    return "SELECT USER.userid , USER.email , USER.firstname , USER.lastname , SUM(ORDERLIST.totalprice) total FROM ORDERLIST LEFT OUTER JOIN USER ON ORDERLIST.userid=USER.userid WHERE WEEK(CURDATE())=WEEK(ORDERLIST.OL_DTTM) GROUP BY USER.userid ORDER BY total DESC";
};
queries.MonthBestUsers= function(queryParams){
    return "SELECT USER.userid , USER.email , USER.firstname , USER.lastname , SUM(ORDERLIST.totalprice) total FROM ORDERLIST LEFT OUTER JOIN USER ON ORDERLIST.userid=USER.userid WHERE MONTH(curdate())=MONTH(ORDERLIST.OL_DTTM) GROUP BY USER.userid ORDER BY total DESC";
};

queries.TodayBestItems= function(queryParams){
    return "SELECT ITEM.itemid , ITEM.name , SUM(ORDEREDITEM.qty) total, ITEM.price FROM ITEM LEFT OUTER JOIN ORDEREDITEM ON ITEM.itemid=ORDEREDITEM.itemid LEFT OUTER JOIN ORDERLIST ON ORDERLIST.olid=ORDEREDITEM.olid WHERE DAY(CURDATE()) = DAY(ORDERLIST.OL_DTTM) GROUP BY ITEM.itemid ORDER BY ORDEREDITEM.qty DESC";
};
queries.WeekBestItems= function(queryParams){
    return "SELECT ITEM.itemid , ITEM.name , SUM(ORDEREDITEM.qty) total, ITEM.price FROM ITEM LEFT OUTER JOIN ORDEREDITEM ON ITEM.itemid=ORDEREDITEM.itemid LEFT OUTER JOIN ORDERLIST ON ORDERLIST.olid=ORDEREDITEM.olid WHERE WEEK(CURDATE()) = WEEK(ORDERLIST.OL_DTTM) GROUP BY ITEM.itemid ORDER BY ORDEREDITEM.qty DESC";
};
queries.MonthBestItems=function(queryParams){
    return "SELECT ITEM.itemid , ITEM.name , SUM(ORDEREDITEM.qty) total, ITEM.price FROM ITEM LEFT OUTER JOIN ORDEREDITEM ON ITEM.itemid=ORDEREDITEM.itemid LEFT OUTER JOIN ORDERLIST ON ORDERLIST.olid=ORDEREDITEM.olid WHERE MONTH(CURDATE()) = MONTH(ORDERLIST.OL_DTTM) GROUP BY ITEM.itemid ORDER BY ORDEREDITEM.qty DESC";
};

queries.TodayBestSuppliers= function(queryParams){
    return "SELECT ITEM.name , SUM(ITEM.price) total, ITEM.SUPID FROM ORDERLIST LEFT OUTER JOIN ORDEREDITEM ON ORDEREDITEM.OLID = ORDERLIST.OLID LEFT OUTER JOIN ITEM ON ITEM.itemid = ORDEREDITEM.itemid WHERE DAY(CURDATE()) = DAY(ORDERLIST.OL_DTTM) GROUP BY ITEM.SUPID ORDER BY totalprice DESC";
};
queries.WeekBestSuppliers= function(queryParams){
    return "SELECT ITEM.name , SUM(ITEM.price) total, ITEM.SUPID FROM ORDERLIST LEFT OUTER JOIN ORDEREDITEM ON ORDEREDITEM.OLID = ORDERLIST.OLID LEFT OUTER JOIN ITEM ON ITEM.itemid = ORDEREDITEM.itemid WHERE WEEK(CURDATE()) = WEEK(ORDERLIST.OL_DTTM) GROUP BY ITEM.SUPID ORDER BY totalprice DESC";
};
queries.MonthBestSuppliers= function(queryParams){
    return"SELECT ITEM.name , SUM(ITEM.price) total, ITEM.SUPID FROM ORDERLIST LEFT OUTER JOIN ORDEREDITEM ON ORDEREDITEM.OLID = ORDERLIST.OLID LEFT OUTER JOIN ITEM ON ITEM.itemid = ORDEREDITEM.itemid WHERE MONTH(CURDATE()) = MONTH(ORDERLIST.OL_DTTM) GROUP BY ITEM.SUPID ORDER BY totalprice DESC";
};

queries.WeekHardEmployee=function(queryParams){
    return "SELECT EMPLOYEE.firstname , EMPLOYEE.lastname ,COUNT(*) FROM SHIFT LEFT OUTER JOIN EMPLOYEE ON EMPLOYEE.EMPID = SHIFT.EMPID WHERE WEEK(SHIFT.START_DTTM) = WEEK(CURDATE()) GROUP BY EMPLOYEE.EMPID ORDER BY COUNT(*) DESC";
};

queries.MonthHardEmployee= function(queryParams){
    return "SELECT EMPLOYEE.firstname , EMPLOYEE.lastname ,COUNT(*) FROM SHIFT LEFT OUTER JOIN EMPLOYEE ON EMPLOYEE.EMPID = SHIFT.EMPID WHERE MONTH(SHIFT.START_DTTM) = MONTH(CURDATE()) GROUP BY EMPLOYEE.EMPID ORDER BY COUNT(*) DESC";
};

//return firstname,lastname,qtyInOrderlist,totalPrice desc
queries.orderlistreportFromDateToDate= function(queryParams){
    var fromDate= queryParams.param1;
    var toDate= queryParams.param2;
    return "SELECT user.firstname || user.lastname , ORDERLIST.qty FROM ORDERLIST JOIN user ON user.userid=ORDERLIST.userid WHERE ol_dttm BETWEEN DATE(\'"+fromDate+"\') AND DATE(\'"+toDate+"\')  ORDER BY ol_dttm DESC" ;
};

//TODO
//items desc by rank
queries.ItemsByRank= function(queryParams){
    return "SELECT * FROM item ORDER BY ";
};


/* future work
queries.TodayWorstItems="SELECT ITEM.itemid , ITEM.name , SUM(ORDEREDITEM.qty) total, ITEM.price FROM ITEM LEFT OUTER JOIN ORDEREDITEM ON ITEM.itemid=ORDEREDITEM.itemid LEFT OUTER JOIN ORDERLIST ON ORDERLIST.olid=ORDEREDITEM.olid WHERE WEEK(CURDATE()) = WEEK(ORDERLIST.OL_DTTM) GROUP BY ITEM.itemid ORDER BY ORDEREDITEM.qty ";
queries.WeekWorstItems="SELECT ITEM.itemid , ITEM.name , SUM(ORDEREDITEM.qty) total, ITEM.price FROM ORDERLIST LEFT OUTER JOIN ORDEREDITEM ON ORDERLIST.OLID = ORDEREDITEM.OLID LEFT OUTER JOIN ITEM ON ITEM.itemid = ORDEREDITEM.itemid WHERE WEEK(CURDATE()) = WEEK(ORDERLIST.OL_DTTM) GROUP BY ITEM.itemid ORDER BY ORDEREDITEM.qty ASC";
queries.MonthWorstItems="SELECT ITEM.itemid , ITEM.name , SUM(ORDEREDITEM.qty) total, ITEM.price FROM ORDERLIST LEFT OUTER JOIN ORDEREDITEM ON ORDERLIST.OLID = ORDEREDITEM.OLID LEFT OUTER JOIN ITEM ON ITEM.itemid = ORDEREDITEM.itemid WHERE MONTH(CURDATE()) = MONTH(ORDERLIST.OL_DTTM) GROUP BY ITEM.itemid ORDER BY ORDEREDITEM.qty ASC";
*/


module.exports = queries;


