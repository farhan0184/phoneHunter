const phoneDetail = document.getElementById('phoneDetail');
const inputText = document.getElementById('searchField');

const searchBtn = () =>{
    
    const inputValue = inputText.value;
    inputText.value = '';
    phoneDetail.textContent = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
    fetch(url)
        .then(res => res.json())
        .then(item => showData(item.data));
}
// enter button click
inputText.addEventListener('keypress', function(event){
    if(event.key == 'Enter'){
        searchBtn();
    }
})

// phone section
const showData = items =>{
    const phoneSection = document.getElementById('phoneSection');
    phoneSection.textContent ='';
    items.forEach(item => {
        const id = item.slug;
        const div = document.createElement('div');
        const list = ['m-8','rounded']
        div.classList.add(...list);
        div.innerHTML = `
         <img class='w-full' src="${item.image}">
         <h3 class='text-yellow-700 text-center text-3xl font-semibold my-5'>${item.phone_name}</h3>
         <div class='flex justify-center'>
            <p onclick = "itemDetail('${id}')" class="text-white bg-sky-700 hover:bg-sky-500 py-2 px-3 rounded">Details</p>
         </div>
        `;
        phoneSection.appendChild(div);
    });

}

function itemDetail(id){
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json()
        .then(item => displayItem(item.data)));
}

// phone detail
const displayItem = item =>{
    console.log(item);
    phoneDetail.textContent = ''
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const list = ['p-5','my-5']
    div1.classList.add(...list);
    div2.classList.add(...list,'flex','items-center','text-black');
    div1.innerHTML =`
    <img class='w-full h-full' src='${item.image}'>
    `;
    div2.innerHTML=`
    <div>
        <h3 class='text-yellow-700 text-center text-xl font-semibold m-2'>${item.name}</h3>
        <table>
            <tr>
                <th>Feature</th>
                <th>Value</th>
                
            </tr>
            <tr>
                <td>Brand</td>
                <td>${item.brand}</td>
                
            </tr>
            <tr>
                <td>Memory</td>
                <td>${item.mainFeatures.memory}</td>
                
            </tr>
            <tr>
                <td>Storage</td>
                <td>${item.mainFeatures.storage}</td>
            
            </tr>
            <tr>
                <td>Display</td>
                <td>${item.mainFeatures.displaySize}</td>
            </tr>
            <tr>
                <td>ChipSet</td>
                <td>${item.mainFeatures.chipSet}</td>
            </tr>
            <tr>
                <td>Bluetooth</td>
                <td>${item.others.Bluetooth}</td>
            </tr>
            <tr>
                <td>USB</td>
                <td>${item.others.USB}</td>
            </tr>
            <tr>
                <td>WLAN</td>
                <td>${item.others.releaseDate}</td>
            </tr>
            <tr>
                <td>Release Date</td>
                <td>${item.releaseDate}</td>
            </tr>
        </table>
    </div>
    `;
    phoneDetail.appendChild(div1);
    phoneDetail.appendChild(div2);

    
}
