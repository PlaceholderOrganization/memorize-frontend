var link = document.createElement("link");


import {API_URL} from "../../settings.js"
const URL = API_URL + "/matrix"

import { sanitizeStringWithTableRows } from "../../utils.js"

export async function initDefaultMatrix(){
  console.log("got you")
  getAndRenderMatrix();
}


async function getAndRenderMatrix(){
  try {
    const matrixFromServer = await fetch(URL).then(res => res.json())
    renderMatrixData(matrixFromServer)
    console.log("got it")
  } catch (e){
    console.log("Errot fetching matrix " + e)
  }
}


function renderMatrixData(data) {
  let valueNamesRow = '<td></td>';
  let valueDescriptionsRow = '<td></td>';
  let combinedRow = '';

console.log(data[0].cards)
console.log(data[0].cards[0].suit)


if (data.length >= 0) {

    data[0].suits.forEach((suit) => {
      combinedRow += `<tr><td>${suit.suitName} <br> ${suit.suitDescription}</td>`;
      data[0].cards.forEach((card) => {
        if (card.suit == suit.suitName){
          combinedRow += `<td><div>${card.person}</div> <br> <div><img src="${card.image}" style="width: 60px"/></div> <br> <div>${card.action}</div> <br> <div>${card.object}</div></td>`;
        }
      });
      combinedRow += `</tr>`;
    })    
  


    data[0].values.forEach((value) => {
      valueNamesRow += `<td>${value.valueName}</td>`;
      valueDescriptionsRow += `<td>${value.valueDescription}</td>`;
    });
  }

  // Wrap headers and rows in respective table row tags
 
  let tableValueNames = `<tr>${valueNamesRow}</tr>`;
  let tableValueDescriptions = `<tr>${valueDescriptionsRow}</tr>`;
 
  // Combine all rows and set them as innerHTML of the table body
  document.querySelector("#matrix-tbl-body").innerHTML = sanitizeStringWithTableRows(tableValueNames + tableValueDescriptions + combinedRow);
}
