function iframeAutoFit()
{
    try
    {
        if(window!=parent)
        {
            var a = parent.document.getElementsByTagName("IFRAME");
            for(var i=0; i<a.length; i++) //author:meizz
            {
                if(a[i].contentWindow==window)
                {
                    var h1=0, h2=0;
                    a[i].parentNode.style.height = a[i].offsetHeight +"px";
                    a[i].style.height = "10px";
                    if(document.documentElement&&document.documentElement.scrollHeight)
                    {
                        h1=document.documentElement.scrollHeight;
                    }
                    if(document.body) h2=document.body.scrollHeight;
                    var h=Math.max(h1, h2);
                    if(document.all) {h += 4;}
                    if(window.opera) {h += 1;}
								    if (h<=4)
								    {
											setTimeout("iframeAutoFit();",500);
											break;
								    }
								    var ua = navigator.userAgent.toLowerCase();
								    if(ua.indexOf("firefox")!=-1)
								    	h+=30;
                    a[i].style.height = a[i].parentNode.style.height = h +"px";
		    						break;
                }
            }
        }
    }
    catch (ex){}
    
}
function hiddenTrButton()
{
	if(document.getElementById("TR_Button")){
		document.getElementById("TR_Button").style.display="none";
	}
}

if(window.attachEvent)
{
	window.attachEvent("onload",  iframeAutoFit);
}
else if(window.addEventListener)
{
	window.addEventListener('load',  iframeAutoFit,  false);
}
