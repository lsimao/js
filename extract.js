/* Extract(selector, extractors, colsep, rowsep)
/* Extracts HTML data to plain string data
/* - selector: main "row" query, applied to document
/* - extractor: array of extraction data for each col:
/*    "query": return text content on matched query over current "row"
/*    {"query":"attribute"}: return specified attribute of matched query over current "row"
/*    {"query":function(element)}: custom function which must return string data from element returned from query over current "row"
/* - colsep: string which will separate columns, default "\t"
/* - rowsep: string which will separate rows, default "\n"
/*
/* Example:
/*  <div class="item"><p class="name"><a href="a_link">A</a></p><span class="year">2001</p></div>
/*  <div class="item"><p class="name"><a href="b_link">B</a></p><span class="year">2002</p></div>
/*  <div class="item"><p class="name"><a href="c_link">C</a></p><span class="year">2003</p></div>
/*
/* Call: 
/*  Extract("div.item", [".name",{"a":"href"},{".year":function(el){return (new Date).getFullYear()-el.textContent;}}],",","/");
/*
/* Return:
/*  "A,a_link,16/B,b_link,15/C,c_link,14/"
/**/
function Extract(selector, extractors, colsep, rowsep) {
 function fm(m, e) {
  var f=function(){return "";};
  var k;
  if(typeof m == "object") {
   for (var p in m) {k=p; break;}
   if (typeof m[k] == "string") f=function(e) {return e.attributes[m[k]].value;}
   if (typeof m[k] == "function") f=function(e){try{return m[k](e);}catch(x){return "";}};
  };
  if(typeof m == "string") {
   k=m;
   f=function(e){return e.textContent.replace(/\n/g," ").replace(/\t/g," ").replace(/  /g," ").trim();};
  }
  if (k!="") e=e.querySelector(k);
  return e?f(e):"";
 }
 var r="";
 if (colsep===undefined) colsep="\t";
 if (rowsep===undefined) rowsep="\n";
 var l=document.querySelectorAll(selector);
 for (var j=0;j<l.length;++j) for(var i=0; i<extractors.length; ++i) r=r+fm(extractors[i],l[j])+(i<extractors.length-1?colsep:rowsep);
 return r;
};

function Copy (text) {
 var ta=document.createElement("textarea");
 document.body.appendChild(ta);
 ta.value=text;
 ta.select();document.execCommand("copy");
 ta.remove();
}
