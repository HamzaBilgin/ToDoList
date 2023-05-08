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
          <input type="checkbox" id="myCheckBox">
            <div class="tasks_task_text" style="flex-basis: 75%">${element.görev}</div>
            <div class="tasks_task_tamamlandi" style="flex-basis: 25%">${element.işlemDurumu}</div> 
          </div>
          
        </li>
    `;
  tasksUl.innerHTML += html;
});
addCheckboxListeners();
startProject();


function startProject(){

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






// İnputta girilen görevi listeye ekler
function addTask(term){

    variable.push({ görev: term, işlemDurumu: "tamamlanmadı" });
    localStorage.setItem("ekle", JSON.stringify(variable));
    const html = `
      <li>
            <div class="tasks_task">
            <input type="checkbox" id="myCheckBox">
              <div class="tasks_task_text" style="flex-basis: 75%">${term}</div>
              <div class="tasks_task_tamamlandi" style="flex-basis: 25%">tamamlanmadı</div> 
            </div>
            
          </li>
      `;
    tasksUl.innerHTML += html;
  addCheckboxListeners();
  ;
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

//Tablodan görev silme
const silButton = document.querySelector('.buttons_sil');
silButton.addEventListener('click', () => {
  const taskList = document.querySelector('#tasks_ul');
  const taskItems = taskList.querySelectorAll('li');

  taskItems.forEach((item) => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      taskList.removeChild(item);
    }
  });
});


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
