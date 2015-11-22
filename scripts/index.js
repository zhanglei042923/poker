window.onload=function(){

  var el, data = {length:0},dict = [],
      sence = document.getElementById('sence'),
      huase = ['ac','ad','ah','as'],
      guize = {1:'A',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',10:'10',11:'J',12:'Q',13:'K'},
      change = document.getElementById('change'),
      changePlage = document.getElementById('change-place'),
      reChange = document.getElementById('re-change'),
      leftPlace = document.getElementById('left-place'),
      removedEl;

  change.onclick = function(){
    if( !leftPlace.children.length) {return;}
    removedEl = leftPlace.removeChild(leftPlace.lastElementChild);
    removedEl.style.top = 0;
    removedEl.style.left = 0;
    removedEl.style.position = 'absolute';
    changePlage.appendChild(removedEl);
  };
  var dianjicishu = 0;
  reChange.onclick = function(){
    if(dianjicishu == 3 || leftPlace.children.length != 0) return;
    while(changePlage.children.length){
      removedEl = changePlage.removeChild(changePlage.lastElementChild);
      leftPlace.appendChild(removedEl);
    }
    dianjicishu++;
  };

  while( data.length !== 52){
    var t1  = huase[Math.floor(Math.random()*4)];
    var t2  = 1 + Math.floor(Math.random()*13);
    var id = t1 + ':' + t2;
    if( !data[id] ){
      data[id] = true;
      data.length += 1; dict.push(id);
    }
  }
  var dingwei = [];
  for ( var i = 0;  i < 7;  i++){
    for ( var j = 0;  j < i+1 ;  j++){
      dingwei.push({top:i*60,left:(6-i)*(100)+j*200,zIndex:i, id:i+'_'+j });
    }
  }
  for (i = 0;  i < 24;  i++){
    dingwei.push({top:0,left:0,zIndex:0});
  }

  for ( i = 0;  i < 52;  i++){
    el = document.createElement('div');
    el.setAttribute('class','puke');
    var str = dict[i];
    el.innerHTML = guize[str.split(':')[1]];
    el.setAttribute('data',str.split(':')[1]);
    el.style.background = 'url(./images/western_'+str.split(':')[0]+'.png)';
    el.style.top = dingwei[i].top + 'px';
    el.style.left = dingwei[i].left + 'px';
    el.style.zIndex = dingwei[i].zIndex;
    if( str.split(':')[0] == 'ad' || str.split(':')[0] == 'ah'){
      el.style.color = 'rgb(133,21,20)';
    }
    if(i<=27){
      sence.appendChild(el);
      el.setAttribute('id',dingwei[i].id);
    }else{
      leftPlace.appendChild(el);
    }
  }
  var compare = [false,false];
  var end=document.getElementById('end');
  var xiaochu  = function(){
    if(compare[0] && compare[1] && compare[0].n + compare[1].n == 13){
      compare[0].d.parentElement.removeChild(compare[0].d);
      compare[1].d.parentElement.removeChild(compare[1].d);
      compare = [false,false];
      return true;
    }
    return false;
  };

  var tmp;
  sence.onclick = function(e){
    el = e.target;
    if(el == leftPlace || el == this || el == change ||el == changePlage || el == reChange){return;}
    var dd = Number(el.getAttribute('data'));
    if( el.hasAttribute('id') ){
      var x = Number(el.id.split('_')[0]);
      var y = Number(el.id.split('_')[1]);
      var x1 = (x+1) + '_' + y;
      var x2 = (x+1) + '_' + (y+1);
      var z1 = document.getElementById(x1);
      var z2 = document.getElementById(x2);
      if(z1 || z2){
        return;
      }
    }
    if(dd == 13){
      el.parentElement.removeChild(el);return;
    }
    if(!compare[0] && !compare[1]){
      compare[0] = {};
      compare[0].n = dd;
      compare[0].d = el;
      el.style.boxShadow = '0 0 10px black';
      tmp  = el;
    }else{
      compare[1] = {};
      compare[1].n = dd;
      compare[1].d = el;
      if( !xiaochu() ){
        compare[0].d.style.boxShadow = 'none';
        compare[1].d.style.boxShadow = 'none';
        compare = [false,false];
      };
    }

  };



















};