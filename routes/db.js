var tedious = require('tedious');

var config = {
    userName: 'kinoshita',
    password: 'Kinokino0',
    server:   'kinoshita-db-server.database.windows.net',
    // If you are on Microsoft Azure, you need this:
    options: {encrypt: true, database: 'kinoshitaDoneList'}
};

function execQuery(query, content){
    console.log(query);
  var connection = new tedious.Connection(config);
  //var content = []; // DBからselectした結果を格納する変数

  return new Promise((resolve, reject) => {
    // DB接続した際のイベントハンドラ
    connection.on('connect', function(err){
        console.log("connected");
        executeStatement();
    })
    .on('end', function(){
      console.log("disconnected");
      resolve();
    });
  });

  // SQLを発行する関数
  function executeStatement(){
    var Request = require('tedious').Request;
      // 発行するSQLを記載する
      request = new Request(query, function(err){
      if(err){
          console.log(err);}
      });

      var result = {}; // SQLの結果を行ごとにオブジェクトに格納する。
      // SQLの行ごとに実行するイベントハンドラ
      request.on('row', function(columns){
          columns.forEach(function(column){
              if(column.value === null){
                  console.log('NULL');
              }else{
                  result[column.metadata.colName] = column.value;
              }
          });
          content.push(result);
          result = {};
      });

      // SQLのリクエスト完了時のイベントハンドラ。
      // コネクションをクローズしないとDBにいらないプロセスが残るので、コネクションをクローズする。
      request.on('requestCompleted', function(){
          console.log('requestCompleted');
          connection.close();
      });

      // DBへSQLを発行する。
      connection.execSql(request);
  }
}

module.exports = execQuery;
