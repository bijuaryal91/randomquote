const btnSpeak=document.querySelector('.speak'),
btnCopy=document.querySelector('.copy'),
btnTweet=document.querySelector('.tweeter'),
btnNew=document.querySelector('.btnNew button')
quotearea=document.querySelector('.quote span'),
authorName=document.querySelector('.author span');
 
window.onload=()=>
{
    
    btnNew.onclick();
}

// new button
btnNew.onclick=()=>
{
    btnNew.classList.add("loading");
    btnNew.innerText = "Loading Quote...";
    var url="https://api.quotable.io/random";
    fetch(url).then((response)=>response.json()).then((data)=>
    {
        quotearea.innerText=data.content;
        authorName.innerText=data.author;
        btnNew.classList.remove("loading");
        btnNew.innerText = "New Quote";
    });
}

// speak button
btnSpeak.onclick=()=>
{
    if(!btnNew.classList.contains("loading")){
        snackbar("Start Speaking.");
        let utterance = new SpeechSynthesisUtterance(`${quotearea.innerText} by ${authorName.innerText}`);
        speechSynthesis.speak(utterance);
    }
}

// copy button
btnCopy.onclick=()=>
{
    navigator.clipboard.writeText(quotearea.innerText);
    snackbar("Text Copied.");
}

// tweeter button
btnTweet.onclick=()=>
{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quotearea.innerText}`;
    window.open(tweetUrl),"_blank";
}

// snackbar
function snackbar(text)
{
    var x = document.getElementById("snackbar");
    x.innerText=text;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
