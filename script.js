const key = "AIzaSyCfQnlwVZT8aVdH9U0E88XnChM4o4ioB2A";
let query = "";
let prev_page = "";
let next_page = "";



function display_results(data){
    let display = document.querySelector('.results');
    
    //display 10 results at a time
    display.innerHTML="";
    for( let i=0; i<data.items.length; i++){
        let videoTitle = data.items[i].snippet.title;
        let videoImg   = data.items[i].snippet.thumbnails.default.url;
        let videoId    = data.items[i].id.videoId;

        //console.log(videoId);
        display.innerHTML +=`
        <span class="api_response">
            <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                <h3 class="searchable">${videoTitle}</h3>
                <img class="searchable"src="${videoImg}"/>
            </a>
        </span>
        `;
    }

    //next & previous page
    if(data.nextPageToken != ""){
        next_page = data.nextPageToken;
    }
    if(data.prevPageToken != ""){
        prev_page = data.prevPageToken;
    }else{
        prev_page="";
    }
}

//GETTER
function fetch_videos(query,token){
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=${key}&pageToken=${token}`;
    let settings ={
        method : 'GET'
    }

    fetch(url, settings)
        .then( response =>{
            if(response.ok){
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then( responseJSON =>{
            console.log(responseJSON);
            display_results( responseJSON);
        })
        .catch( err =>{
            console.log(err.message);
        })
}

function enable_search(){
    let btn = document.getElementById("btn");
    
    btn.addEventListener('click', (event) =>{
        event.preventDefault();
        query = document.getElementById("search_term");

        if(query.value.trim() !== ""){
            fetch_videos(query.value.trim(),"");
        }
        
    });
}

//next & previous page
function mv_page(){
    let pages = document.getElementById("pages");
    
    pages.addEventListener('click',(event) =>{
        //event.preventDefault();
        
        if(event.target.matches('#prv_pg')){
            console.log("prev");
            if(prev_page != ""){
                fetch_videos(query,prev_page);
        }
        }
        if(event.target.matches('#nxt_pg')){
            console.log("next");
            if(prev_page != ""){
                fetch_videos(query,next_page);
            }
        }
    })
}

function init(){
    enable_search();
    mv_page();
}

init();