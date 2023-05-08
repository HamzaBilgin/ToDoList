let form = document.getElementById("form");
let text = document.getElementById("text");
let tasksUl = document.getElementById("tasks_ul");
let control = true;

let variable = localStorage.getItem("ekle")
  ? JSON.parse(localStorage.getItem("ekle"))
  : [];
Array.from(variable).forEach((element) => {
  const html = `
    <li>
      <div class="tasks_task">
        <input type="checkbox" class="checkbox" ${element.checkbox}>
        <div class="tasks_task_text" style="flex-basis: 75%">${element.görev}</div>
        <div class="tasks_task_text_silinecek" style="flex-basis: 75%"></div>
        <div class="tasks_task_tamamlandi" style="flex-basis: 25%">${element.işlemDurumu}</div> 
      </div>
    </li>
  `;
  tasksUl.innerHTML += html;
});
addCheckboxListeners();
taskSubmit();





//-------------------------------------------- Button Fonksiyonları -------------------------------------------

//Sil Butonuna tıklandığında çalışır
const silButton = document.querySelector('.buttons_sil');
silButton.addEventListener('click', () => {
  deleteListElement()
});


//Tamamlandı Butonuna tıklandığında çalışır
const tamamlandiButton = document.querySelector('.buttons_tamamlandi');
tamamlandiButton.addEventListener('click', () => {
  saveList();

});





//----------------------------------------------Kullanılan Yardımcı Fonksiyonlar -------------------------------------

//Enterla veya kaydet butonuna tıklayınca yazılan görevin listeye eklenmesini ve kaydetmesini sağlar
function taskSubmit(){

  form.addEventListener("submit", function (event) {
    tasksControl();
    event.preventDefault();
    const term = text.value.trim();
   if(control){
    addTask(term)
   }
   else{
    alert("Kayıtlı iş");
   }
  });
 
}

//Güncelleme yapılan listeyi kaydetmek için kullanılan fonksiyon başlangıcı
function saveList(){
  const tasks = document.querySelectorAll(".tasks_task");

const taskArray = [];

tasks.forEach(task => {
  const checkbox = task.querySelector("input[type=checkbox]");
  const görev = task.querySelector(".tasks_task_text").textContent;
  const işlemDurumu = task.querySelector(".tasks_task_tamamlandi").textContent;
 
  if (checkbox.checked) {
    const taskObj = {
      checkbox: "checked",
      görev: görev,
      işlemDurumu: işlemDurumu
    };
    
    taskArray.push(taskObj);
  } else {
    const taskObj = {
      checkbox: "",
      görev: görev,
      işlemDurumu: işlemDurumu
    };
    
    taskArray.push(taskObj);
  }
  
});

const taskJSON = JSON.stringify(taskArray);

localStorage.setItem("ekle", taskJSON);
}

//Güncelleme yapılan listeyi kaydetmek için kullanılan fonksiyon sonu
selectDeleteItem();
let sayac = 0;
function selectDeleteItem(){
  const taskList = document.querySelector('#tasks_ul');
  const taskItems = taskList.querySelectorAll('li');
  taskItems.forEach((item) => {
    
    const taskstask = item.querySelector('div');
    const tasksTaskSilinecek = taskstask.querySelector('.tasks_task_text_silinecek');

    item.addEventListener("click", function (e) {
      if (sayac === 0) {

        if (e.target.tagName !== 'INPUT') {
          const taskstask = item.querySelector('div');
          const tasksTaskSilinecek = taskstask.querySelector('.tasks_task_text_silinecek');
  
          taskstask.setAttribute('style', 'background-color: rgb(228, 95, 95);');
          tasksTaskSilinecek.innerHTML = "SİLİNECEK ÖĞE!";
            sayac = 1;
        }


       
      } else if (sayac === 1) {

        if (e.target.tagName !== 'INPUT') {
          const taskstask = item.querySelector('div');
        const tasksTaskSilinecek = taskstask.querySelector('.tasks_task_text_silinecek');
        taskstask.removeAttribute('style', 'background-color: rgb(228, 95, 95);');
        tasksTaskSilinecek.innerHTML = "";
          sayac = 0;
        }
        
      }
  });
  });
}

//Silme yapılan listeyi kaydetmek için kullanılan fonksiyon başlangıcı
function deleteListElement(){
  const taskList = document.querySelector('#tasks_ul');
  const taskItems = taskList.querySelectorAll('li');

  taskItems.forEach((item) => {
    const taskstask = item.querySelector('div');
    // const checkbox = item.querySelector('input[type="checkbox"]');
    if (taskstask.style.backgroundColor === 'rgb(228, 95, 95)') {
      taskList.removeChild(item);

    }

  });
}

//Daha önce eklenip eklenmediğinin kontrolü
function tasksControl(){
  let testVariable = localStorage.getItem("ekle")
  ? JSON.parse(localStorage.getItem("ekle"))
  : [];

  for (let i = 0; i < Array.from(testVariable).length; i++) {
    const element = Array.from(testVariable)[i];

    if (element.görev == text.value){    
      control = false;

      break;
    } else {
      control = true;

    }
  }
  
}

// Checkbox tiklenince işin tamamlanım tamamlanmadığını değişmesini sağlar
function addCheckboxListeners() {
  const checkboxes = document.querySelectorAll("#tasks_ul input[type=checkbox]");
  const taskTexts = document.querySelectorAll("#tasks_ul .tasks_task_text");
  const taskStatuses = document.querySelectorAll("#tasks_ul .tasks_task_tamamlandi");

  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        taskStatuses[index].textContent = "tamamlandı"; 
      } else {
        taskStatuses[index].textContent = "tamamlanmadı"; 
      }
    });
  });
}

// İnputta girilen görevi listeye ekler
function addTask(term){

  variable.push({ görev: term, işlemDurumu: "tamamlanmadı" });
  localStorage.setItem("ekle", JSON.stringify(variable));
  const html = `
    <li>
          <div class="tasks_task">
          <input type="checkbox" class="checkbox" >
            <div class="tasks_task_text" style="flex-basis: 75%">${term}</div>
            <div class="tasks_task_text_silinecek" style="flex-basis: 75%"></div>
            <div class="tasks_task_tamamlandi" style="flex-basis: 25%">tamamlanmadı</div> 
          </div>
          
        </li>
    `;
  tasksUl.innerHTML += html;
addCheckboxListeners();
;
}




/**
 * Eğer girilmeye çalışılan iş daha önce girildiyse uyarı ver
 * Girilmeye çalışılan değerdeki gereksiz boşlukları temizle
 * Oluşturulan her görev için tamamlandı / tamamlanmadı görüntüsünü göster
 *      Eğer iş tamamladnıysa checkbox checked durumuna gelecek
 * Eleman silme özelliği eklenecek
 *
 * sayfayı yenilediğimizde daha önceki girilen task'ları kaybetme
 * Yeni item eklenirken ekrana animasyonlu gelsin
 */
