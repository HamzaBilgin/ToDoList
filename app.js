let form = document.getElementById("form");
let text = document.getElementById("text");
let tasksUl = document.getElementById("tasks_ul");

let variable = localStorage.getItem("ekle")
  ? JSON.parse(localStorage.getItem("ekle"))
  : [];
console.log(variable.term);
Array.from(variable).forEach(element=>{
    const html = `
    <li>
          <div class="tasks_task">
          <input type="checkbox">
            <div class="tasks_task_text" style="flex-basis: 75%">${element.görev}</div>
            <div class="tasks_task_tamamlandi" style="flex-basis: 25%">${element.işlemDurumu}</div> 
          </div>
          
        </li>
    `;
   

  tasksUl.innerHTML += html;
  });

form.addEventListener("submit", function (event) {
  const term = text.value.trim();
console.log(tasksUl);
  event.preventDefault();
  variable.push({ görev: term, işlemDurumu: "tamamlanmadı" });
  localStorage.setItem("ekle", JSON.stringify(variable));
  const html = `
    <li>
          <div class="tasks_task">
          <input type="checkbox">
            <div class="tasks_task_text" style="flex-basis: 75%">${term}</div>
            <div class="tasks_task_tamamlandi" style="flex-basis: 25%">tamamlanmadı</div> 
          </div>
          
        </li>
    `;
   

  tasksUl.innerHTML += html;

  
});

// const showList = (taskList) => {
//   taskList.forEach(element ={
//     console.log()
//   });
// };

// text.addEventListener('keyup',()=>{
//     const term=text.value.trim().toLowerCase();
//     console.log(term);

// })
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
