function renderIndex(res, year, month, work_list, done_list){
  var i, j, work_id, day;
  var WeekChars = ["(日)", "(月)", "(火)", "(水)", "(木)", "(金)", "(土)"];
  var firstDay = new Date(year, month-1, 1).getDay();
  var monthDay = new Date(year, month, 0).getDate();
  var mattrix = [];
  var days = [];

  for(i=0; i<monthDay; i++){
    day = (firstDay + i) % 7;
    switch(day){
      case 0:
        days[i] = "<font color=\"red\">" + (i+1) + WeekChars[day] + "</font>";
        break;
      case 6:
        days[i] = "<font color=\"blue\">" + (i+1) + WeekChars[day] + "</font>";
        break;
      default:
        days[i] = "" + (i+1) + WeekChars[day];
        break;
    }
  }
  for(i=0; i<work_list.length; i++){
    work_id = work_list[i].work_id;
    mattrix[work_id] = [];
    for(j=0; j<monthDay; j++){
      mattrix[work_id][j] = "_";
    }
  }
  for(i=0; i<done_list.length; i++){
    work_id = done_list[i].work_id;
    day = done_list[i].day-1;
    if(mattrix[work_id]) mattrix[work_id][day] = "〇";
  }
  res.render('index', { title: 'Done List',
                        year: year,
                        month: month,
                        days: days,
                        mattrix: mattrix,
                        work_list: work_list});
}

module.exports = renderIndex;
