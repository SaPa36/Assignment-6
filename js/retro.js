const loadRetroDefault = async () =>{
    const res = await fetch(' https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const retro = data.posts;

    displayRetro(retro);
};
loadRetroDefault();

const loadRetro = async (searchText) =>{
    const res = await fetch
    (`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json();
    const retro = data.posts;

    displayRetro(retro);
}

const displayRetro = (retro) =>{
    const retroContainer = document.getElementById('retro-card-container');
    retroContainer.textContent = "";
    let color = "";
    setTimeout(() =>{
        retro.forEach((i) =>{
            if(i.isActive){
                color = "green";
            }
            else{
                color = "red";
            }

            // Creating a New Div
            const retroCard = document.createElement('div');
            retroCard.classList = `pt-4`;
            retroCard.innerHTML = `
            <div class="bg-violet-100 rounded-3xl shadow-2xl">

            <!-- Left Div -->
            <div class="flex">
                <div class="flex justify-center items-center w-[60px] h-[60px]  m-2 p-4 rounded-2xl mt-6">
                        <img class=" rounded-2xl w-full h-full" src="${i.image}" alt="">

                    <i  class="fa-solid rounded-[50%] fa-circle text-[${color}]"></i>
                </div>

                <div class="w-full">
                    <div class="flex gap-8 pt-6 text-sm font-medium text-[#12132DCC]">
                        <p> #${i.category} </p>
                        <p> Author: ${i.author.name} </p>
                    </div>

                    <div class="pr-2">
                        <h4 class="text-lg font-bold"> ${i.title} </h4>
                        <br>
                        <p class="text-base font-mulish font-normal w-3/4">${i.description}</p>
                        <br>
                        <hr style="border-top: dotted 1px;" />
                    </div>
                </div>
            </div>
            

                <!-- Comment Section -->
                <div class="pt-3 pb-3 flex justify-between">
                    <div class="flex gap-6 pl-16 ">
                        <span> <i class="fa-regular fa-message"></i> ${i.comment_count}</span>
                        <span> <i class="fa-regular fa-eye"></i> ${i.view_count}</span>
                        <span> <i class="fa-regular fa-clock"></i> ${i.posted_time} Min</span>
                    </div>

                    <div class="pb-6 pr-6">
                        <button onclick="clickMe('${i.title}','${i.view_count}')" 
                        class="btn bg-[#10B981] rounded-[50%]"><i class="fa-regular fa-envelope"></i></button>
                    </div>
                </div>

            </div>
            `;
            retroContainer.appendChild(retroCard);
        });
        // Hide Loading Spinner
    loadingSpinner(false);
}, 2000);
        
    
    
};

const loadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove("hidden");
      } else {
        loadingSpinner.classList.add("hidden");
      }
};

const handleSearch = () => {
    loadingSpinner(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadRetro(searchText);
  };

  const clickMe = (title, view) => {

    // Mark as read count
    const infoContainer = document.getElementById('selected-info');
    const currentInfoText = infoContainer.innerText;
    const currentText = parseInt(currentInfoText);
    const newInfo= currentText + 1;
    infoContainer.innerText = newInfo;

    // Show title and view count
    const rightCardContainer = document.getElementById('right-card-id');

    const rightCard = document.createElement('div');
    rightCard.classList =  `flex justify-between border mt-6 bg-white rounded-2xl p-4`;
    rightCard.innerHTML = `
    <div class="flex">
        <p class="text-base font-mulish font-semibold text-[#12132D] ">${title}</p>
        <span class="text-[#12132D] text-base font-mulish font-normal">
            <i class="fa-regular fa-eye "></i></span>
        <p>${view}</p>
    `;
    rightCardContainer.appendChild(rightCard);
  };

  const loadCard = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    const card = data;

    displayCard(card);
  }
  loadCard();

  const displayCard = async (card) =>{
    const discussCardContainer = document.getElementById('discuss-id');
    card.forEach((i) =>{
        const dissCard = document.createElement('div');
        dissCard.classList = `rounded-2xl`
        dissCard.innerHTML = `
        <div class="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            src="${i.cover_image}"
             />
        </figure>
        <div class="card-body">
            <div class="flex gap-8">
                <i class="fa-solid fa-calendar-days mt-1"></i>
                <p>${i.author?.posted_date || "No Publish Date"}</p>
            </div>
          <h2 class="card-title">${i.title}</h2>
          <p>${i.description}</p>
          
          <div class="flex gap-8">
          <div class="w-[44px] h-[44px]"><img class="rounded-full" src="${
            i.profile_image
          }" alt=""></div>
            <div>
                <h4>${i.author.name}</h4>
                <p>${i.author?.designation || "Unknown"}</p>
            </div>
          </div>
        </div>
      </div>
        `;
        discussCardContainer.appendChild(dissCard);
    });
  };