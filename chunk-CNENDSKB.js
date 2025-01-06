import"./chunk-EQDQRRRY.js";function u(e){let g=e.regex,i=new RegExp("[\\p{XID_Start}_]\\p{XID_Continue}*","u"),b=["and","as","assert","async","await","break","case","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","in","is","lambda","match","nonlocal|10","not","or","pass","raise","return","try","while","with","yield"],r={$pattern:/[A-Za-z]\w+|__\w+__/,keyword:b,built_in:["__import__","abs","all","any","ascii","bin","bool","breakpoint","bytearray","bytes","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","exec","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","print","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip"],literal:["__debug__","Ellipsis","False","None","NotImplemented","True"],type:["Any","Callable","Coroutine","Dict","List","Literal","Generic","Optional","Sequence","Set","Tuple","Type","Union"]},n={className:"meta",begin:/^(>>>|\.\.\.) /},s={className:"subst",begin:/\{/,end:/\}/,keywords:r,illegal:/#/},o={begin:/\{\{/,relevance:0},c={className:"string",contains:[e.BACKSLASH_ESCAPE],variants:[{begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,end:/'''/,contains:[e.BACKSLASH_ESCAPE,n],relevance:10},{begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,end:/"""/,contains:[e.BACKSLASH_ESCAPE,n],relevance:10},{begin:/([fF][rR]|[rR][fF]|[fF])'''/,end:/'''/,contains:[e.BACKSLASH_ESCAPE,n,o,s]},{begin:/([fF][rR]|[rR][fF]|[fF])"""/,end:/"""/,contains:[e.BACKSLASH_ESCAPE,n,o,s]},{begin:/([uU]|[rR])'/,end:/'/,relevance:10},{begin:/([uU]|[rR])"/,end:/"/,relevance:10},{begin:/([bB]|[bB][rR]|[rR][bB])'/,end:/'/},{begin:/([bB]|[bB][rR]|[rR][bB])"/,end:/"/},{begin:/([fF][rR]|[rR][fF]|[fF])'/,end:/'/,contains:[e.BACKSLASH_ESCAPE,o,s]},{begin:/([fF][rR]|[rR][fF]|[fF])"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,o,s]},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]},t="[0-9](_?[0-9])*",d=`(\\b(${t}))?\\.(${t})|\\b(${t})\\.`,a=`\\b|${b.join("|")}`,l={className:"number",relevance:0,variants:[{begin:`(\\b(${t})|(${d}))[eE][+-]?(${t})[jJ]?(?=${a})`},{begin:`(${d})[jJ]?`},{begin:`\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${a})`},{begin:`\\b0[bB](_?[01])+[lL]?(?=${a})`},{begin:`\\b0[oO](_?[0-7])+[lL]?(?=${a})`},{begin:`\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${a})`},{begin:`\\b(${t})[jJ](?=${a})`}]},_={className:"comment",begin:g.lookahead(/# type:/),end:/$/,keywords:r,contains:[{begin:/# type:/},{begin:/#/,end:/\b\B/,endsWithParent:!0}]},p={className:"params",variants:[{className:"",begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:["self",n,l,c,e.HASH_COMMENT_MODE]}]};return s.contains=[c,l,n],{name:"Python",aliases:["py","gyp","ipython"],unicodeRegex:!0,keywords:r,illegal:/(<\/|\?)|=>/,contains:[n,l,{scope:"variable.language",match:/\bself\b/},{beginKeywords:"if",relevance:0},{match:/\bor\b/,scope:"keyword"},c,_,e.HASH_COMMENT_MODE,{match:[/\bdef/,/\s+/,i],scope:{1:"keyword",3:"title.function"},contains:[p]},{variants:[{match:[/\bclass/,/\s+/,i,/\s*/,/\(\s*/,i,/\s*\)/]},{match:[/\bclass/,/\s+/,i]}],scope:{1:"keyword",3:"title.class",6:"title.class.inherited"}},{className:"meta",begin:/^[\t ]*@/,end:/(?=#)|$/,contains:[l,p,c]}]}}export{u as default};
