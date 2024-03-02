// load post data from api
const loadAllpost = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await res.json();
  const posts = data.posts;
  displayPost(posts);
  markRead(posts);
};




const displayPost = (posts) => {
  const postContainer = document.getElementById("post-container");
 posts.forEach((post) =>{
    const div = document.createElement("div");
    div.classList =
      "container p-10 bg-[#F3F3F5] hover:bg-[#797DFC1A] rounded-3xl flex mb-4";
    div.innerHTML = `
              <div>
              <img class="rounded-2xl h-28 w-28" src="${post.image}" alt="" />
              </div>
              <div class="ml-4">
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
                  <p class="text2 text-[#12132D99] w-11/12">
                    ${post.description}
                  </p>
                </div>
                <div
                  class="border border-b border-dashed border-[#12132D40]"
                ></div>
                <div class="container flex justify-between mt-4">
                  <div class="flex gap-2">
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
                  <div onclick="markRead()">
                    <img src="./images/email 1.png" alt="" />
                  </div>
                </div>
              </div>
      `;
      postContainer.appendChild(div);
 })
};


let count = 0;
const markRead = (posts) => {
  const markCount = document.getElementById('mark-count');
  markCount.innerText = count++;
  const markContainer = document.getElementById('mark-container');

  posts.forEach((post) =>{
    const markDiv = document.createElement("div");
  markDiv.classList = "container flex bg-white mt-4 rounded-2xl p-4";
  markDiv.innerHTML = `
  <div class="w-4/5">
                    <h3 class="text1 text-[#12132D] font-semibold">
                    ${post.title}
                    </h3>
                  </div>
                  <div class="container flex w-1/5 justify-end items-center">
                    <img src="./images/tabler-icon-eye.png" alt="" />
                    <p class="text1 text-[#12132D99]">${post.view_count}</p>
                  </div>
  `;
  markContainer.appendChild(markDiv);
  });

}
