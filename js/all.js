// 設置選取器
let body = document.body;
let btn = document.getElementById('result');
let bmiNum = document.getElementById('bmiNum');
let heightNum = document.getElementById('height');
let weightNum = document.getElementById('weight');
let recalculate = document.getElementById('recalculate');
let result = document.getElementById('result');
let toolTip = document.getElementById('toolTip');
let bmiValue = document.getElementById('bmiValue');

// 計算 BMI
function calculateBMI(){
  let num = weightNum.value / ( heightNum.value * heightNum.value / 10000 );
  let BMI = num.toFixed(2);
  // bmiNum.textContent = BMI;
  return BMI;
};

// 點擊計算按鈕
btn.addEventListener('click', btnClick);

function btnClick() {
  change();
  countBMI(calculateBMI());
};

// 切換結果樣式
function change(){
  result.classList.add('hide');
  toolTip.classList.remove('hide');
  bmiValue.classList.remove('hide');
};

// 套入樣式及文字
function changeStyle(color, text) {
  toolTip.style.color = color;
  bmiValue.style.color = color;
  bmiValue.style.border = `5px solid ${color}`;
  recalculate.style.backgroundColor = color;
  toolTip.textContent = `${text}`;
};

// 依據 BMI 值給予相對應的結果樣式及文字
function countBMI(num){
  bmiNum.textContent = num;
  if(num < 18.5){
    changeStyle('#31BAF9','過輕');
    addData(toolTip.textContent, num, '#31BAF9');

  } else if(18.5 <= num && num < 24) {
    changeStyle('green','理想');
    addData(toolTip.textContent, num , 'green');

  } else if(24 <= num && num < 27) {
    changeStyle('#FF982D','過重');
    addData(toolTip.textContent, num, '#FF982D');

  } else if(27 <= num && num < 30) {
    changeStyle('#FF6C02','輕度肥胖');
    addData(toolTip.textContent, num, '#FF6C02');

  } else if(30 <= num && num < 35) {
    changeStyle('#FF6C02','中度肥胖');
    addData(toolTip.textContent, num, '#FF6C02');

  } else if(35 <= num && num < 75) {
    changeStyle('red','超級胖');
    addData(toolTip.textContent, num, 'red');

  } else if(num >= 75) {
    changeStyle('aqua','無法計算');
    bmiNum.textContent = '太重了';

  } else {
    changeStyle('white','好好輸入');
    bmiNum.textContent = '不要亂';
  }
};

// 點擊重置按鈕
recalculate.addEventListener('click', recalculateFun);

function recalculateFun() {
  weightNum.value = '';
  heightNum.value = '';
  result.classList.remove('hide');
  toolTip.classList.add('hide');
  bmiValue.classList.add('hide');
};

// 按下 Enter 按鍵
body.addEventListener('keydown', keyDownFun);

function keyDownFun(e){
  if(e.keyCode === 13){
    change();
    countBMI(calculateBMI());
  }
};

// 儲存計算結果至陣列
let healthDetails = document.querySelector('#healthDetails');
let headlthAry = JSON.parse(localStorage.getItem('listData')) || [];

healthDetails.addEventListener('click',deleteData);

function addData(text, bmi_num, color){
  let date = moment().format('YYYY.MM.DD');
  let healthObj = {
    condition: text,
    bmi: bmi_num,
    height: heightNum.value,
    weight: weightNum.value,
    toolTip: color,
    calDate: date
  };
  headlthAry.push(healthObj);
  localStorage.setItem('listData',JSON.stringify(headlthAry));
  upDataList(headlthAry);
};

// 渲染資料至頁面
function upDataList(items){
  let str = '';
  items.forEach((i, index) => {
    str += `
        <div class="row bg-white py-3 mx-2 align-items-center mb-3" style="border-left:15px solid ${i.toolTip}">
        <div class="col-6 col-lg-2">
          <p id="condition" class="text-center mb-3 mb-lg-0">
            ${i.condition}
          </p>
        </div>
        <div class="col-6 col-lg-2 text-center mb-3 mb-lg-0">
          <div id="delete" class="btn btn-sm btn-outline-danger px-3" data-index=${index}>
            刪除
          </div>
        </div>
        <div class="col-6 col-lg-2 text-center mb-3 mb-lg-0">
          <small class="mr-2">
            Height
          </small>
          <p id="height" class="d-inline-block">
            ${i.height}
          </p>
        </div>
        <div class="col-6 col-lg-2 text-center mb-3 mb-lg-0">
          <small class="mr-2">
            Weight
          </small>
          <p id="weight" class="d-inline-block">
          ${i.weight}
          </p>
        </div>
        <div class="col-6 col-lg-2 text-center">
          <small class="mr-2">
            BMI
          </small>
          <p id="bmi" class="d-inline-block text-center">
            ${i.bmi}
          </p>
        </div>
        <div class="col-6 col-lg-2 text-center">
          <small class="mr-2">
            Date
          </small>
          ${i.calDate}
        </div>
      </div>
    `
  })
  healthDetails.innerHTML = str;
};

upDataList(headlthAry);

// 刪除 localStorage 資料並重新渲染頁面
function deleteData(e){
  if(e.target.id !== 'delete'){
    return;
  }
  let index = e.target.dataset.index;
  headlthAry.splice(index,1);
  localStorage.setItem('listData',JSON.stringify(headlthAry));
  upDataList(headlthAry);
};
