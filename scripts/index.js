// load allpost data from api
let globaldata = [];
const loadAllpost = async (inputText = '') => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputText}`
  );
  const data = await res.json();
  const posts = data.posts;
  globaldata.push(posts);
  displayPost(posts);
  markRead(posts);
};
loadAllpost();



const displayPost = (posts) => {
  const postContainer = document.getElementById("post-container");
  postContainer.innerHTML = '';
 posts.forEach((post) =>{
    const div = document.createElement("div");
    div.classList =
      "container p-4 lg:pl-10 md:py-12 bg-[#F3F3F5] hover:bg-[#797DFC1A] rounded-3xl flex mb-4";
    div.innerHTML = `
              <div>
              <div class="indicator">
        <span id='status' class="indicator-item badge ${post.isActive ? 'badge-success' : 'badge-error'}"></span> 
        <div class="grid w-32 h-32  place-items-center">
          <img class="h-32 w-32 rounded-xl" src="${post.image}" alt="" />
        </div>
      </div>
              </div>
              <div class="ml-4 w-full">
                <div class="container flex gap-4">
                  <p class="text2 text-[#12132DCC] text-sm font-medium">#${post.category}</p>
                  <p class="text2 text-[#12132DCC] text-sm font-medium">
                    Author : ${post.author.name}
                  </p>
                </div>
                <div class="mt-4">
                  <h3 class="text1 text-xl font-bold text-[#12132D]">
                    ${post.title}
                  </h3>
                </div>
                <div class="my-4">
                  <p class="text2 text-[#12132D99]">
                    ${post.description}
                  </p>
                </div>
                <div
                  class="border border-b border-dashed border-[#12132D40]"
                ></div>
                <div class="container flex justify-between mt-4">
                  <div class="flex md:gap-2">
                    <div>
                      <img src="./images/tabler-icon-message-2.png" alt="" />
                    </div>
                    <div>
                      <p>${post.comment_count}</p>
                    </div>
                    <div class="ml-1 lg:ml-2">
                      <img src="./images/tabler-icon-eye.png" alt="" />
                    </div>
                    <div>
                      <p>${post.view_count}</p>
                    </div>
                    <div class="ml-1 lg:ml-2">
                      <img src="./images/tabler-icon-clock-hour-9.png" alt="" />
                    </div>
                    <div>
                      <p>${post.posted_time}</p>
                    </div>
                  </div>
                  <div onclick="markRead(${post.view_count},'${post.title}')">
                    <img src="./images/email 1.png" alt="" />
                  </div>
                </div>
              </div>
      `;
      postContainer.appendChild(div);
      document.getElementById('input-field').value = '';
      
    });
    handleSpinner(false);
};

const handleSearch = () => {
  handleSpinner(true);
  const inputText = document.getElementById('input-field').value.toLowerCase();
  loadAllpost(inputText);
}


  function handleSpinner(isLoading) {
    const spinnerContainer = document.getElementById('spinner-container');
    if(isLoading){
      spinnerContainer.classList.remove('hidden');
    }else{
      setTimeout(() =>{
        spinnerContainer.classList.add('hidden');
      },2000)
  
    }
  }


const loadLatestPosts = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/latest-posts`
  );
  const latestPosts = await res.json();
  displayLatestPosts(latestPosts)
}
loadLatestPosts()


const displayLatestPosts = (latestPosts) => {
  const latestPostContainer = document.getElementById('latest-post-container');
  latestPosts.forEach((latestPost) => {
    const latestPostDiv = document.createElement('div');
    latestPostDiv.classList = 'container flex flex-col lg:flex-row border-[1px] border-[#12132D26] rounded-3xl p-6';
    latestPostDiv.innerHTML = `
    <div class="container">
                  <div class="flex justify-center"><img class="rounded-lg" src="${latestPost.cover_image}" alt="" srcset="" /></div>
      
                  <div class="flex gap-1 mt-5">
                    <img src="./images/calender.png" alt="" />
                    <p class="text1 text-[#12132D99]">${latestPost.author.posted_date? latestPost.author.posted_date : "No Publish date"}</p>
                  </div>
      
                  <div class="mt-4">
                    <h3 class="text1 text-[#12132D] text-lg font-extrabold">
                      ${latestPost.title}
                    </h3>
                  </div>
                  <div class="mt-4">
                    <p class="text1 text-[#12132D99]">
                      ${latestPost.description}
                    </p>
                  </div>
                  <div class="mt-4 flex gap-4">
                    <img class="h-24 w-24 rounded-[50%]" src="${latestPost.profile_image}" alt="" srcset="" />
                    <div>
                      <h3 class="text1 text-[#12132D] font-bold">
                        ${latestPost.author?.name}
                      </h3>
                      <p class="text1 text-[#12132D99] text-sm">${latestPost.author?.designation ? latestPost.author.designation : "Unknown"}</p>
                    </div>
                  </div>
                </div>
    `;
    latestPostContainer.appendChild(latestPostDiv);
  })

}


let viewCount = 0;
const markRead = (count,title) => {
  // console.log(count,id)

  const markCount = document.getElementById('mark-count');
  markCount.innerText = viewCount++;

  const markContainer = document.getElementById('mark-container');
  const markDiv = document.createElement("div");
  markDiv.classList = "container flex bg-white mt-4 rounded-2xl p-4";
  markDiv.innerHTML = `
  <div class="w-4/5">
                    <h3 class="text1 text-[#12132D] font-semibold">
                    ${title}
                    </h3>
                  </div>
                  <div class="container flex w-1/5 justify-end items-center">
                    <img src="./images/tabler-icon-eye.png" alt="" />
                    <p class="text1 text-[#12132D99]">${count}</p>
                  </div>
  `;
  markContainer.appendChild(markDiv);
}





// let count = 0;
// const markRead = (posts) => {
//   const markCount = document.getElementById('mark-count');
//   markCount.innerText = count++;
//   const markContainer = document.getElementById('mark-container');

//   posts.forEach((post) =>{
  
//     const markDiv = document.createElement("div");
//   markDiv.classList = "container flex bg-white mt-4 rounded-2xl p-4";
//   markDiv.innerHTML = `
//   <div class="w-4/5">
//                     <h3 class="text1 text-[#12132D] font-semibold">
//                     ${post.title}
//                     </h3>
//                   </div>
//                   <div class="container flex w-1/5 justify-end items-center">
//                     <img src="./images/tabler-icon-eye.png" alt="" />
//                     <p class="text1 text-[#12132D99]">${post.view_count}</p>
//                   </div>
//   `;
//   markContainer.appendChild(markDiv);
//   });

// }
