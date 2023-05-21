const load = document.currentScript.dataset.load;
const element = document.currentScript.dataset.element;

console.log(load+"  "+ element)

axios.get(load).then((response)=>{
    document.getElementById(element).innerHTML = response.data;


}).catch((error)=>{
    console.error('Error, Get content error:', error);
})