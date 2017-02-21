console.log('Loaded!');


var element1 = document.getElementById("id2");

element1.innerHTML = "Assigning";

var element2 = document.getElementById("id1");

element2.oncilck = function()
{
    element2.style.marginLeft = '100px';
};