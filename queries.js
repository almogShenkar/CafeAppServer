/*Advanced util queries - Report usage */

var queries = {};

queries.todaybestusers="SELECT user.userid , user.email , user.firstname , user.lastname , orderlist.totalprice FROM orderlist LEFT OUTER JOIN user ON orderlist.userid=user.userid WHERE CURDATE()=orderlist.OL_DTTM ORDER BY orderlist.TOTALPRICE DESC";
queries.weekbestusers="SELECT user.userid , user.email , user.firstname , user.lastname , orderlist.totalprice FROM orderlist LEFT OUTER JOIN user ON orderlist.userid=user.userid WHERE WEEK(CURDATE())=WEEK(orderlist.OL_DTTM) ORDER BY orderlist.TOTALPRICE DESC";
queries.monthbestusers="SELECT user.userid , user.email , user.firstname , user.lastname , orderlist.totalprice FROM orderlist LEFT OUTER JOIN user ON orderlist.userid=user.userid WHERE MONTH(curdate())=MONTH(orderlist.OL_DTTM) ORDER BY orderlist.TOTALPRICE DESC";

queries.todaybestitems="SELECT item.itemid , item.name , ordereditem.qty , item.price from orderlist LEFT OUTER JOIN ORDEREDITEM ON orderlist.OLID = ORDEREDITEM.OLID LEFT OUTER JOIN ITEM ON ITEM.ITEMID = ORDEREDITEM.ITEMID WHERE CURDATE() = CAST(orderlist.OL_DTTM AS DATE) ORDER BY ORDEREDITEM.QTY DESC";
queries.weekbestitems="SELECT item.itemid , item.name , ordereditem.qty , item.price from orderlist LEFT OUTER JOIN ORDEREDITEM ON orderlist.OLID = ORDEREDITEM.OLID LEFT OUTER JOIN ITEM ON ITEM.ITEMID = ORDEREDITEM.ITEMID WHERE WEEK(CURDATE()) = WEEK(CAST(orderlist.OL_DTTM AS DATE)) ORDER BY ORDEREDITEM.QTY DESC";
queries.monthbestitems="SELECT item.itemid , item.name , ordereditem.qty , item.price FROM orderlist LEFT OUTER JOIN ORDEREDITEM ON orderlist.OLID = ORDEREDITEM.OLID LEFT OUTER JOIN ITEM ON ITEM.ITEMID = ORDEREDITEM.ITEMID WHERE MONTH(CURDATE()) = MONTH(CAST(orderlist.OL_DTTM AS DATE)) ORDER BY ORDEREDITEM.QTY DESC";

queries.todayworstitems="SELECT item.itemid , item.name , ordereditem.qty , item.price FROM orderlist LEFT OUTER JOIN ORDEREDITEM ON orderlist.OLID = ORDEREDITEM.OLID LEFT OUTER JOIN ITEM ON ITEM.ITEMID = ORDEREDITEM.ITEMID WHERE CURDATE() = CAST(orderlist.OL_DTTM AS DATE) ORDER BY ORDEREDITEM.QTY ASC";
queries.weekworstitems="SELECT item.itemid , item.name , ordereditem.qty , item.price FROM orderlist LEFT OUTER JOIN ORDEREDITEM ON orderlist.OLID = ORDEREDITEM.OLID LEFT OUTER JOIN ITEM ON ITEM.ITEMID = ORDEREDITEM.ITEMID WHERE WEEK(CURDATE()) = WEEK(CAST(orderlist.OL_DTTM AS DATE)) ORDER BY ORDEREDITEM.QTY ASC";
queries.monthworstitems="SELECT item.itemid , item.name , ordereditem.qty , item.price FROM orderlist LEFT OUTER JOIN ORDEREDITEM ON orderlist.OLID = ORDEREDITEM.OLID LEFT OUTER JOIN ITEM ON ITEM.ITEMID = ORDEREDITEM.ITEMID WHERE MONTH(CURDATE()) = MONTH(CAST(orderlist.OL_DTTM AS DATE)) ORDER BY ORDEREDITEM.QTY ASC";

queries.todaybestsuppliers="SELECT item.name , SUM(item.price) , item.supid FROM orderlist LEFT OUTER JOIN ORDEREDITEM ON ORDEREDITEM.OLID = orderlist.OLID LEFT OUTER JOIN ITEM ON ITEM.ITEMID = ORDEREDITEM.ITEMID WHERE CURDATE() = CAST(orderlist.OL_DTTM AS DATE) GROUP BY ITEM.SUPID ORDER BY TOTALPRICE DESC";
queries.weekbestsuppliers="SELECT item.name , SUM(item.price) , item.supid FROM orderlist LEFT OUTER JOIN ORDEREDITEM ON ORDEREDITEM.OLID = orderlist.OLID LEFT OUTER JOIN ITEM ON ITEM.ITEMID = ORDEREDITEM.ITEMID WHERE WEEK(CURDATE()) = WEEK(CAST(orderlist.OL_DTTM AS DATE)) GROUP BY ITEM.SUPID ORDER BY TOTALPRICE DESC";
queries.monthbestsuppliers="SELECT item.name , SUM(item.price) , item.supid FROM orderlist LEFT OUTER JOIN ORDEREDITEM ON ORDEREDITEM.OLID = orderlist.OLID LEFT OUTER JOIN ITEM ON ITEM.ITEMID = ORDEREDITEM.ITEMID WHERE MONTH(CURDATE()) = MONTH(CAST(orderlist.OL_DTTM AS DATE)) GROUP BY ITEM.SUPID ORDER BY TOTALPRICE DESC";

queries.weekhardemployee="SELECT employee.firstname , employee.lastname ,COUNT(*) FROM SHIFT LEFT OUTER JOIN EMPLOYEE ON EMPLOYEE.EMPID = SHIFT.EMPID WHERE WEEK(CAST(SHIFT.START_DTTM AS DATE)) = WEEK(CURDATE()) GROUP BY EMPLOYEE.EMPID ORDER BY COUNT(*) DESC";
queries.monthhardemployee="SELECT employee.firstname , employee.lastname ,COUNT(*) FROM SHIFT LEFT OUTER JOIN EMPLOYEE ON EMPLOYEE.EMPID = SHIFT.EMPID WHERE MONTH(CAST(SHIFT.START_DTTM AS DATE)) = MONTH(CURDATE()) GROUP BY EMPLOYEE.EMPID ORDER BY COUNT(*) DESC";


module.exports = queries;





