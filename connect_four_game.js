
var name1= prompt("Enter name of player 1------ you will be blue");
var name1_color='rgb(66, 134, 244)';
var name2= prompt("Enter name of player 2------ you will be red");
var name2_color='rgb(193, 22, 3)';
var count=1,i;
var table = $('table tr');

$('h2').text(name1+": it is your turn, please pick a column to drop your blue chip.");


function num_count(){
  if(count%2==1){
    $('h2').text(name2+": it is your turn, please pick a column to drop your red chip.");
  }
  if(count%2==0){
      $('h2').text(name1+": it is your turn, please pick a column to drop your blue chip.");
  }
  count++;
 return count;
}




function returnColor(rowIndex,colIndex) {
  var define= table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
return define;
}


function changeColor(number,rowIndex,colIndex,def1){
  if(def1==='rgb(128, 128, 128)'&& number%2==1 ){
    var color=  table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color','rgb(178, 28, 8)');
    return color;
  }
  if(def1==='rgb(128, 128, 128)'&& number%2==0 ){
   var color=table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color','rgb(13, 147, 165)');
   return color;
  }
}

function checkBottom(colIndex) {
  for (var row = 6; row > -1; row--) {
    colorReport = returnColor(row,colIndex);
    if (colorReport === 'rgb(128, 128, 128)') {
      return row
    }
  }
}

function colorMatchCheck(one,two,three,four){
  return (one===two && one===three && one===four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}


function horizontalWinCheck() {
  for (var row = 0; row <= 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
        var res=returnColor(row,col)
        $('h2').text("");
        if(res=='rgb(13, 147, 165)'){
          $('#heading').text(name1+ " WON.......!");
        }else{
            $('#heading').text(name2+ " WON.......!");
        }
          gameend();
        return true;
      }
        else{
        continue;
      }
    }
  }
}



function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 4; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
        var res=returnColor(row,col)
        $('h2').text("");
        if(res=='rgb(13, 147, 165)'){
          $('#heading').text(name1+ " WON.......!");
        }else{
            $('#heading').text(name2+ " WON.......!");
        }
          gameend();
        return true;
      }
      else {
        continue;
      }
    }
  }
}

function diagonalWinCheck(){
  for (var col = 0; col <=3; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        var res=returnColor(row,col)
        console.log('game end');
        if(res=='rgb(13, 147, 165)'){
          $('#heading').text(name1+ " WON.......!");
        }else{
          $('#heading').text(name2+ " WON.......!");
        }
        gameend();
        return true;
      }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        var res=returnColor(row,col)
        console.log('game end');
        $('h2').text("");
        if(res=='rgb(13, 147, 165)'){
          $('#heading').text(name1+ " WON.......!");
        }else{
          $('#heading').text(name2+ " WON.......!");
        }
        gameend();
        return true;
      }
        else {
        continue;
      }
    }
  }
}


function gameend(){
      $('body').slideUp(2000);
}

$('.board button').on('click',function(){

   console.log('This is the Column:');
   console.log($(this).closest("td").index());
   var col=$(this).closest("td").index();
   console.log("This is the Row:");
   console.log($(this).closest("tr").index());
   var row=$(this).closest("tr").index();
   var avail= returnColor(row,col);
   console.log(avail);
   var num=num_count();
   console.log(num);
   var bottomAvail = checkBottom(col);
   console.log(bottomAvail);
   var available=changeColor(num,bottomAvail,col,avail);
   console.log(available);
   var avail1=horizontalWinCheck();
   var avail2=verticalWinCheck();
   var avail3=diagonalWinCheck();
})
