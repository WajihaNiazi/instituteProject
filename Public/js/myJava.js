let nodeElement = null;
let parentNodeElement = null;
returnRowToDelete = (btn) =>{
  const x = btn.parentNode.closest('tr');
  nodeElement = x;
  parentNodeElement = x.parentNode;
  console.log(parentNodeElement)
}


let parentNodeElementEdit = null;
returnRowToEdit = (btn) => {
  const x = btn.parentNode.closest('tr');
  parentNodeElementEdit = x;
}


// post data of departments-------------------------------------------------------------------------------------
postData = (data) => {
    const name = document.getElementById('name').value;
    fetch('/getDepartment', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          name:name
        })
    })
    .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Creating a post failed!');
        }
        return res.json();
    })
    .then(data => {
       
        var x=document.getElementById('tableData').getElementsByTagName('tbody')[0].insertRow(0);
        var c1 = x.insertCell(0);
        var c2 = x.insertCell(1);
        var c3 = x.insertCell(2);
        c1.innerHTML="";
        c2.innerHTML=data.post.name;
        c2.setAttribute('name','name');
        c3.innerHTML=' <input type="hidden" name="departmentId" value="'+ data.post._id+'"><button  type="button" class="btn btn-warning notika-btn-warning" data-toggle="modal"  data-target="#editModal" data-whatever="'+ [data.post._id, data.post.name]+'" onclick="returnRowToEdit(this)">ویرایش</button> <button id ="sample"  type="button" class="btn btn-danger notika-btn-danger"  data-toggle="modal" data-target="#exampleModal" data-whatever="'+ data.post._id+'" onclick="returnRowToDelete(this)">حذف</button>';

        document.getElementById('name').value = null;
    })
      .catch(err => {
        console.log(err);
      });
}

//edit department------------------------------------------------------------------------------------------------

editData = (btn) => {
  const parent = btn.parentNode;
  const EditId = parent.parentNode.querySelector('[name=id]').value;
  const dpname = parent.parentNode.querySelector('[name=dpname]').value;
  console.log(EditId)

  let url = "/editedData";
      let method = 'POST'

      fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id:EditId,
            name: dpname
        })
    })
    .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('editting faild!');
        }
        return res.json();
      })
    .then(data => {
       console.log(data);
      parentNodeElementEdit.querySelector('[name=name]').innerHTML = dpname;
    })
      .catch(err => {
        console.log(err);
      });
}


//javaScripts for deleting departments--------------------------------------------------------------------

postDelete = (btn)=>{
  const parent = btn.parentNode;
    const departmentId = parent.parentNode.querySelector('[name=recipientName]').value
    console.log('------------dp',departmentId)
      fetch("/deleted" , {
          method:'POST',
          headers: {
            'Accept': 'application/json, text/plain',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: departmentId
        })
      })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Creating or editing a post failed!');
        }
        return res.json();
      })
      .then(data=>{
          console.log("-------------data",data)
          parentNodeElement.removeChild(nodeElement)

      })
      .catch(err=>
          console.log(err)
      )
  }



  // post data of years-------------------------------------------------------------------------------------
  postYearData = (data) => {
  const name = document.getElementById('name').value;
  fetch('/addYear', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        name:name
      })
  })
  .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Creating a post failed!');
      }
      return res.json();
  })
  .then(data => {
     
      var x=document.getElementById('tableData').getElementsByTagName('tbody')[0].insertRow(0);
      var c1 = x.insertCell(0);
      var c2 = x.insertCell(1);
      var c3 = x.insertCell(2);
      c1.innerHTML="";
      c2.innerHTML=data.post.name;
      c2.setAttribute('name','name');
      c3.innerHTML=' <input type="hidden" name="yearId" value="'+ data.post._id+'"><button  type="button" class="btn btn-warning notika-btn-warning" data-toggle="modal"  data-target="#editYear" data-whatever="'+ [data.post._id, data.post.name]+'" onclick="returnRowToEdit(this)">ویرایش</button> <button id ="sample"  type="button" class="btn btn-danger notika-btn-danger"  data-toggle="modal" data-target="#deleteYear" data-whatever="'+ data.post._id+'" onclick="returnRowToDelete(this)">حذف</button>';

      document.getElementById('name').value = null;
  })
    .catch(err => {
      console.log(err);
    });
}

//edit year------------------------------------------------------------------------------------------------

editYearData = (btn) => {
const parent = btn.parentNode;
const EditId = parent.parentNode.querySelector('[name=id]').value;
const yearName = parent.parentNode.querySelector('[name=yearName]').value;
console.log(EditId)

let url = "/editedYearData";
    let method = 'POST'

    fetch(url, {
      method: method,
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          id:EditId,
          name: yearName
      })
  })
  .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('editting year faild!');
      }
      return res.json();
    })
  .then(data => {
     console.log(data);
    parentNodeElementEdit.querySelector('[name=name]').innerHTML = yearName;
  })
    .catch(err => {
      console.log(err);
    });
}


//javaScripts for deleting years--------------------------------------------------------------------

postDeleteYear = (btn)=>{
const parent = btn.parentNode;
  const yearId = parent.parentNode.querySelector('[name=recipientName]').value
  console.log('------------dp',yearId)
    fetch("/deletedYear" , {
        method:'POST',
        headers: {
          'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: yearId
      })
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Creating or editing a post failed!');
      }
      return res.json();
    })
    .then(data=>{
        console.log("-------------data",data)
        parentNodeElement.removeChild(nodeElement)

    })
    .catch(err=>
        console.log(err)
    )
}



// post data of classify-------------------------------------------------------------------------------------
postClassify = (data) => {
  const nameOfBaseNumber=document.getElementById('nameOfBaseNumber').value;
  const nameOfClass=document.getElementById('nameOfClass').value;
  fetch('/classify', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        nameOfBaseNumber:nameOfBaseNumber,
        nameOfClass:nameOfClass
      })
  })
  .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Creating a post failed!');
      }
      return res.json();
  })
  .then(data => {
     
      var x=document.getElementById('data-table-basic').getElementsByTagName('tbody')[0].insertRow(0);
      var c1 = x.insertCell(0);
      var c2 = x.insertCell(1);
      var c3 = x.insertCell(2);
      var c4= x.insertCell(3);
      c1.innerHTML="";
      c2.innerHTML=data.post.nameOfBaseNumber;
      c2.setAttribute('name','nameOfBaseNumber');
      c3.innerHTML=data.post.nameOfClass;
      c3.setAttribute('name','nameOfClass');
      c4.innerHTML=' <input type="hidden" name="classifyId" value="'+ data.post._id+'"><button  type="button" class="btn btn-warning notika-btn-warning" data-toggle="modal"  data-target="#editClassify" data-whatever="'+ [data.post._id, data.post.nameOfBaseNumber,data.post.nameOfClass]+'" onclick="returnRowToEdit(this)">ویرایش</button> <button id ="sample"  type="button" class="btn btn-danger notika-btn-danger"  data-toggle="modal" data-target="#deleteClassify" data-whatever="'+ data.post._id+'" onclick="returnRowToDelete(this)">حذف</button>';

      document.getElementById('nameOfBaseNumber').value = null;
      document.getElementById('nameOfClass').value = null;
  })
    .catch(err => {
      console.log(err);
    });
}

//edit classify------------------------------------------------------------------------------------------------

editClassify = (btn) => {
const parent = btn.parentNode;
const EditId = parent.parentNode.querySelector('[name=id]').value;
const nOfBase = parent.parentNode.querySelector('[name=nOfBase]').value;
const nOfClass = parent.parentNode.querySelector('[name=nOfClass]').value;
console.log(EditId)

let url = "/editedClassify";
    let method = 'POST'

    fetch(url, {
      method: method,
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          id:EditId,
          nameOfBaseNumber:nOfBase,
          nameOfClass:nOfClass
      })
  })
  .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('editting classify faild!');
      }
      return res.json();
    })
  .then(data => {
     console.log(data);
    parentNodeElementEdit.querySelector('[name=nameOfBaseNumber]').innerHTML = nOfBase;
    parentNodeElementEdit.querySelector('[name=nameOfClass]').innerHTML = nOfClass;
  })
    .catch(err => {
      console.log(err);
    });
}


//javaScripts for deleting classify--------------------------------------------------------------------

deleteClssify = (btn)=>{
const parent = btn.parentNode;
  const classifyId = parent.parentNode.querySelector('[name=recipientName]').value
  console.log('-----------classifyId',classifyId)
    fetch("/deletedClassify" , {
        method:'POST',
        headers: {
          'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: classifyId
      })
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Creating or editing a post failed!');
      }
      return res.json();
    })
    .then(data=>{
        console.log("-------------classify data",data)
        parentNodeElement.removeChild(nodeElement)

    })
    .catch(err=>
        console.log(err)
    )
}




// post data of class--------------------------------------------------------------------------------------
postClassData = (data) => {
  const nameOfClass = document.getElementById('nameOfClass').value;
  fetch('/addClass', {
      method: 'POST',
      body: JSON.stringify({
        nameOfClass:nameOfClass
      }),
      headers: { 'Content-type': 'application/json' }
  })
  .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Creating or editing a post failed!');
      }
      return res.json();
  })
  .then(data => {
     
      var x=document.getElementById('data-table-basic').getElementsByTagName('tbody')[0].insertRow(0);
      var c1 = x.insertCell(0);
      var c2 = x.insertCell(1);
      var c3 = x.insertCell(2);
      c1.innerHTML="";
      c2.innerHTML=data.post.nameOfClass;
      c2.setAttribute('name','nameOfClass');
      c3.innerHTML='<input type="hidden" name="classId" value="'+ data.post._id +'"><button type="button"  class="btn btn-warning notika-btn-warning" data-toggle="modal"  data-target="#editClass" data-whatever="'+ [data.post._id, data.post.nameOfClass] +'" onclick="returnRowToEdit(this)" >ویرایش</button><button id ="sample" type="button"   class="btn btn-danger notika-btn-danger"  data-toggle="modal" data-target="#deleteClass" data-whatever="'+data.post._id +'" onclick="returnRowToDelete(this)">حذف</button>';

      document.getElementById('nameOfClass').value = null;
  })
    .catch(err => {
      console.log(err);
    });
}
// editting class---------------------------------------------------------------------------------------------------
editClassData = (btn) => {
const parent = btn.parentNode;
const EditId = parent.parentNode.querySelector('[name=id]').value;
const cName = parent.parentNode.querySelector('[name=cName]').value;
console.log(EditId)

let url = "/editedClassData";
    let method = 'POST'

    fetch(url, {
      method: method,
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          id:EditId,
          nameOfClass: cName
      })
  })
  .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('editting class faild!');
      }
      return res.json();
    })
  .then(data => {
     console.log("edit class data------",data);
    parentNodeElementEdit.querySelector('[name=nameOfClass]').innerHTML = cName;
  })
    .catch(err => {
      console.log(err);
    });
}


//deleting class---------------------------------------------------------------------------------------------------

postClassDelete = (btn)=>{
const parent = btn.parentNode;
  const classId = parent.parentNode.querySelector('[name=recipientName]').value
  console.log('------------class',classId)
    fetch("/deletedClass" , {
        method:'POST',
        headers: {
          'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: classId
      })
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Creating or editing a class failed!');
      }
      return res.json();
    })
    .then(data=>{
        console.log("-------------data",data)
        parentNodeElement.removeChild(nodeElement)

    })
    .catch(err=>
        console.log(err)
    )
}




// post subjects-----------------------------------------------------------------------------------------------------

  postSubjectData = (data) => {
    const name = document.getElementById('name').value;
    // console.log("------------------i got it",name);
    fetch('/subjectsForm', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          name:name
        })
    })
    .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Creating or editing subject failed!');
        }
        return res.json();
    })
    .then(data => {
       
        var x=document.getElementById('data-table-basic').getElementsByTagName('tbody')[0].insertRow(0);
        var c1 = x.insertCell(0);
        var c2 = x.insertCell(1);
        var c3 = x.insertCell(2);
        c1.innerHTML="";
        c2.innerHTML=data.post.name;
        c2.setAttribute('name','name');
        c3.innerHTML=' <input type="hidden" name="subjectId" value="'+ data.post._id+'"><button  type="button" class="btn btn-warning notika-btn-warning" data-toggle="modal"  data-target="#editSubjects" data-whatever="'+ [data.post._id, data.post.name]+'" onclick="returnRowToEdit(this)">ویرایش</button> <button id ="sample"  type="button" class="btn btn-danger notika-btn-danger"  data-toggle="modal" data-target="#DeleteSubject" data-whatever="'+ data.post._id+'" onclick="returnRowToDelete(this)">حذف</button>';

        document.getElementById('name').value = null;
    })
      .catch(err => {
        console.log(err);
      });
}

//edit subjects-----------------------------------------------------------------------------------------------------

editSubjectData = (btn) => {
  const parent = btn.parentNode;
  const EditId = parent.parentNode.querySelector('[name=id]').value;
  const subname = parent.parentNode.querySelector('[name=subname]').value;
  console.log(EditId)

  let url = "/editedSubjectData";
      let method = 'POST'

      fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id:EditId,
            name: subname
        })
    })
    .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('editting subject faild!');
        }
        return res.json();
      })
    .then(data => {
       console.log(data);
      parentNodeElementEdit.querySelector('[name=name]').innerHTML = subname;
    })
      .catch(err => {
        console.log(err);
      });
}

// deleting subjects----------------------------------------------------------------------------------------------------

postSubjectDelete = (btn)=>{
  const parent = btn.parentNode;
    const subjectId = parent.parentNode.querySelector('[name=NameOfSub]').value
    console.log('------------subject',subjectId)
      fetch("/subjectDeleted" , {
          method:'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: subjectId
        })
      })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Creating or editing a post failed!');
        }
        return res.json();
      })
      .then(data=>{
          console.log("-------------data",data)
          parentNodeElement.removeChild(nodeElement)

      })
      .catch(err=>
          console.log(err)
      )
  }


  // post data of schedules-------------------------------------------------------------------------------------
  postScheduleData = (data) => {
  const chosenClass = document.getElementById('chosenClass').value;
  const day = document.getElementById('day').value; 
  const firstHourSubject = document.getElementById('firstHourSubject').value;
  const firstHourTeacher = document.getElementById('firstHourTeacher').value;
  const secondHourSubject = document.getElementById('secondHourSubject').value;
  const secondHourTeacher = document.getElementById('secondHourTeacher').value;
  const thirdHourSubject = document.getElementById('thirdHourSubject').value;
  const thirdHourTeacher = document.getElementById('thirdHourTeacher').value;
  const fourthHourSubject = document.getElementById('fourthHourSubject').value;
  const fourthHourTeacher = document.getElementById('fourthHourTeacher').value;
  const fifthHourSubject = document.getElementById('fifthHourSubject').value;
  const fifthHourTeacher = document.getElementById('fifthHourTeacher').value;
  const sixthHourSubject = document.getElementById('sixthHourSubject').value;
  const sixthHourTeacher = document.getElementById('sixthHourTeacher').value;
  fetch('/scheduleForm', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        chosenClass:chosenClass,
        day:day,
        firstHourSubject:firstHourSubject,
        firstHourTeacher:firstHourTeacher,
        secondHourSubject:secondHourSubject,
        secondHourTeacher:secondHourTeacher,
        thirdHourSubject:thirdHourSubject,
        thirdHourTeacher:thirdHourTeacher,
        fourthHourSubject:fourthHourSubject,
        fourthHourTeacher:fourthHourTeacher,
        fifthHourSubject:fifthHourSubject,
        fifthHourTeacher:fifthHourTeacher,
        sixthHourSubject:sixthHourSubject,
        sixthHourTeacher:sixthHourTeacher
      })
  })
  .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Creating a schedule post failed!');
      }
      return res.json();
  })
  .then(data => {
     
      var x=document.getElementById('data-table-basic').getElementsByTagName('tbody')[0].insertRow(0);
      var c1 = x.insertCell(0);
      var c2 = x.insertCell(1);
      var c3 = x.insertCell(2);
      var c4 = x.insertCell(3);
      c1.innerHTML="";
      c2.innerHTML=data.post.chosenClass;
      c2.setAttribute('name','chosenClass');
      c3.innerHTML=data.post.day;
      c3.setAttribute('name','day');
      c4.innerHTML='<input type="hidden" name="scheduleId" value="'+ data.post._id +'"><button type="button"  class="btn btn-info notika-btn-info" data-toggle="modal"  data-target="" data-whatever="" onclick="returnRowToEdit(this)" >نمایش</button><button type="button"  class="btn btn-warning notika-btn-warning" data-toggle="modal"  data-target="#editSchedule" data-whatever="'+ [data.post._id, data.post.chosenClass, data.post.day,data.post.firstHourSubject,data.post.firstHourTeacher,data.post.secondHourSubject,data.post.secondHourTeacher,data.post.thirdHourSubject,data.post.thirdHourTeacher,data.post.fourthHourSubject,data.post.fourthHourTeacher,data.post.fifthHourSubject,data.post.fifthHourTeacher,data.post.sixthHourSubject,data.post.sixthHourTeacher] +'" onclick="returnRowToEdit(this)" >ویرایش</button><button type="button" id ="sample"   class="btn btn-danger notika-btn-danger"  data-toggle="modal" data-target="#deleteSchedule" data-whatever="'+ data.post._id +'" onclick="returnRowToDelete(this)">حذف</button>';

      document.getElementById('chosenClass').value = null;
      document.getElementById('day').value = null;
      document.getElementById('firstHourSubject').value = null;
      document.getElementById('firstHourTeacher').value = null;
      document.getElementById('secondHourSubject').value = null;
      document.getElementById('secondHourTeacher').value = null;
      document.getElementById('thirdHourSubject').value = null;
      document.getElementById('thirdHourTeacher').value = null;
      document.getElementById('fourthHourSubject').value = null;
      document.getElementById('fourthHourTeacher').value = null;
      document.getElementById('fifthHourSubject').value = null;
      document.getElementById('fifthHourTeacher').value = null;
      document.getElementById('sixthHourSubject').value = null;
      document.getElementById('sixthHourTeacher').value = null;
  })
    .catch(err => {
      console.log(err);
    });
}

//edit schedule------------------------------------------------------------------------------------------------

editScheduleData = (btn) => {
const parent = btn.parentNode;
const EditScheduleId = parent.parentNode.querySelector('[name=scheduleId]').value;
const EchosenClass = parent.parentNode.querySelector('[name=EchosenClass]').value;
const day = parent.parentNode.querySelector('[name=day]').value;
const firstHourSubject = parent.parentNode.querySelector('[name=firstHourSubject]').value;
const firstHourTeacher = parent.parentNode.querySelector('[name=firstHourTeacher]').value;
const secondHourSubject = parent.parentNode.querySelector('[name=secondHourSubject]').value;
const secondHourTeacher = parent.parentNode.querySelector('[name=secondHourTeacher]').value;
const thirdHourSubject = parent.parentNode.querySelector('[name=thirdHourSubject]').value;
const thirdHourTeacher = parent.parentNode.querySelector('[name=thirdHourTeacher]').value;
const fourthHourSubject = parent.parentNode.querySelector('[name=fourthHourSubject]').value;
const fourthHourTeacher = parent.parentNode.querySelector('[name=fourthHourTeacher]').value;
const fifthHourSubject = parent.parentNode.querySelector('[name=fifthHourSubject]').value;
const fifthHourTeacher = parent.parentNode.querySelector('[name=fifthHourTeacher]').value;
const sixthHourSubject = parent.parentNode.querySelector('[name=sixthHourSubject]').value;
const sixthHourTeacher = parent.parentNode.querySelector('[name=sixthHourTeacher]').value;
// console.log('--------------------',EditScheduleId,EchosenClass,day,firstHourSubject,firstHourTeacher,secondHourSubject,secondHourTeacher,thirdHourSubject,thirdHourTeacher,fourthHourSubject,fourthHourTeacher,fifthHourSubject,fifthHourTeacher,sixthHourSubject,sixthHourTeacher)

let url = "/editedScheduleData";
    let method = 'POST'

    fetch(url, {
      method: method,
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          id:EditScheduleId,
          chosenClass:EchosenClass,
          day:day,
          firstHourSubject:firstHourSubject,
          firstHourTeacher:firstHourTeacher,
          secondHourSubject:secondHourSubject,
          secondHourTeacher:secondHourTeacher,
          thirdHourSubject:thirdHourSubject,
          thirdHourTeacher:thirdHourTeacher,
          fourthHourSubject:fourthHourSubject,
          fourthHourTeacher:fourthHourTeacher,
          fifthHourSubject:fifthHourSubject,
          fifthHourTeacher:fifthHourTeacher,
          sixthHourSubject:sixthHourSubject,
          sixthHourTeacher:sixthHourTeacher
      })
  })
  .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('editting schedule faild!');
      }
      return res.json();
    })
  .then(data => {
     console.log('-----------------schedule data',data);
    parentNodeElementEdit.querySelector('[name=chosenClass]').innerHTML = EchosenClass;
    parentNodeElementEdit.querySelector('[name=day]').innerHTML = day;
    parentNodeElementEdit.querySelector('[name=firstHourSubject]').innerHTML = firstHourSubject;
    parentNodeElementEdit.querySelector('[name=firstHourTeacher]').innerHTML = firstHourTeacher;
    parentNodeElementEdit.querySelector('[name=secondHourSubject]').innerHTML = secondHourSubject;
    parentNodeElementEdit.querySelector('[name=secondHourTeacher]').innerHTML = secondHourTeacher;
    parentNodeElementEdit.querySelector('[name=thirdHourSubject]').innerHTML = thirdHourSubject;
    parentNodeElementEdit.querySelector('[name=thirdHourTeacher]').innerHTML = thirdHourTeacher;
    parentNodeElementEdit.querySelector('[name=fourthHourSubject]').innerHTML = fourthHourSubject;
    parentNodeElementEdit.querySelector('[name=fourthHourTeacher]').innerHTML = fourthHourTeacher;
    parentNodeElementEdit.querySelector('[name=fifthHourSubject]').innerHTML = fifthHourSubject;
    parentNodeElementEdit.querySelector('[name=fifthHourTeacher]').innerHTML = fifthHourTeacher;
    parentNodeElementEdit.querySelector('[name=sixthHourSubject]').innerHTML = sixthHourSubject;
    parentNodeElementEdit.querySelector('[name=sixthHourTeacher]').innerHTML = sixthHourTeacher;
  })
    .catch(err => {
      console.log(err);
    });
}



//javaScripts for deleting schedule--------------------------------------------------------------------

postScheduleDelete = (btn)=>{
  const parent = btn.parentNode;
    const scheduleId = parent.parentNode.querySelector('[name=recipientName]').value
    console.log('------------schedule',scheduleId)
      fetch("/scheduleDeleted" , {
          method:'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: scheduleId
        })
      })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('delete schedule failed!');
        }
        return res.json();
      })
      .then(data=>{
          console.log("-------------schedule",data)
          parentNodeElement.removeChild(nodeElement)

      })
      .catch(err=>
          console.log(err)
      )
  }

  // post staff------------------------------------------------------------------------------------------------------

  postStaffData=(data)=>{
    const name=document.getElementById('name').value;
    const Lastname=document.getElementById('Lastname').value;
    const Fathername=document.getElementById('Fathername').value;
    const grandFather=document.getElementById('grandFather').value;
    const currentJob=document.getElementById('currentJob').value;
    const major=document.getElementById('major').value;
    const degree=document.getElementById('degree').value;
    const yearsOfWorking=document.getElementById('yearsOfWorking').value;
    const position=document.getElementById('position').value;
    const step=document.getElementById('step').value;
    fetch('/getStaff',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name:name,
        Lastname:Lastname,
        Fathername:Fathername,
        grandFather:grandFather,
        currentJob:currentJob,
        major:major,
        degree:degree,
        yearsOfWorking:yearsOfWorking,
        position:position,
        step:step
      })
    })
    .then(res=>{
      if(res.status!==200 & res.status!==201){
        throw new Error('staffs could not get them!')
      }
      return res.json();
    })
    .then(data=>{
      var y=document.getElementById('data-table-basic').getElementsByTagName('tbody')[0].insertRow(0);
      var c1=y.insertCell(0);
      var c2=y.insertCell(1);
      var c3=y.insertCell(2);
      var c4=y.insertCell(3);
      var c5=y.insertCell(4);
      var c6=y.insertCell(5);
      var c7=y.insertCell(6);
      var c8=y.insertCell(7);
      var c9=y.insertCell(8);
      c1.innerHTML="";
      c2.innerHTML=data.post.name;
      c2.setAttribute('name','name');
      c3.innerHTML=data.post.Lastname;
      c3.setAttribute('name','Lastname');
      c4.innerHTML=data.post.Fathername;
      c4.setAttribute('name','Fathername');
      c5.innerHTML=data.post.grandFather;
      c5.setAttribute('name','grandFather');
      c6.innerHTML=data.post.currentJob;
      c6.setAttribute('name','currentJob');
      c7.innerHTML=data.post.major;
      c7.setAttribute('name','major');
      c8.innerHTML=data.post.degree;
      c8.setAttribute('name','degree');
      c9.innerHTML='<input type="hidden" name="staffId" value="'+ data.post._id+'"><button type="button"  class="btn btn-warning notika-btn-warning" data-toggle="modal" style="margin-left:3%;"  data-target="#editStaffModal" data-whatever="'+ [data.post._id, data.post.name,data.post.Lastname,data.post.Fathername,data.post.grandFather,data.post.currentJob,data.post.major,data.post.degree,data.post.yearsOfWorking,data.post.position,data.post.step]+'" onclick="returnRowToEdit(this)">ویرایش</button><button id ="sample"   type="button" class="btn btn-danger notika-btn-danger"  data-toggle="modal" data-target="#deleteStaff" data-whatever="'+ data.post._id+'" onclick="returnRowToDelete(this)">حذف</button>';                                       
      document.getElementById('name').value = null;
      document.getElementById('Lastname').value = null;
      document.getElementById('Fathername').value = null;
      document.getElementById('grandFather').value = null;
      document.getElementById('currentJob').value = null;
      document.getElementById('major').value = null;
      document.getElementById('degree').value = null;
      document.getElementById('yearsOfWorking').value = null;
      document.getElementById('position').value = null;
      document.getElementById('step').value = null;
    })
    .catch(err=>{
      console.log(err)
    })
  }


  // editting staff-------------------------------------------------------------------------------------------------

  editStaffData = (btn) => {
    const parent = btn.parentNode;
    const EditStaffId = parent.parentNode.querySelector('[name=id]').value;
    console.log("------EditstaffId",EditStaffId)
    const name = parent.parentNode.querySelector('[name=name]').value;
    const Lastname = parent.parentNode.querySelector('[name=Lastname]').value;
    const Fathername = parent.parentNode.querySelector('[name=Fathername]').value;
    const grandFather = parent.parentNode.querySelector('[name=grandFather]').value;
    const currentJob = parent.parentNode.querySelector('[name=currentJob]').value;
    const major = parent.parentNode.querySelector('[name=major]').value;
    const degree = parent.parentNode.querySelector('[name=degree]').value;
    const yearsOfWorking = parent.parentNode.querySelector('[name=yearsOfWorking]').value;
    const position = parent.parentNode.querySelector('[name=position]').value;
    const step = parent.parentNode.querySelector('[name=step]').value;
    // console.log(name,Lastname,Fathername,grandFather,currentJob,major,degree,position,step)
    let url = "/editStaff";
        let method = 'POST'
  
        fetch(url, {
          method: method,
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              id:EditStaffId,
              name: name,
              Lastname:Lastname,
              Fathername:Fathername,
              grandFather:grandFather,
              currentJob:currentJob,
              major:major,
              degree:degree,
              yearsOfWorking:yearsOfWorking,
              position:position,
              step:step
          })
      })
      .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error('editting faild!');
          }
          return res.json();
        })
      .then(data => {
        //  console.log("-----------data",data);
        parentNodeElementEdit.querySelector('[name=name]').innerHTML = name;
        parentNodeElementEdit.querySelector('[name=Lastname]').innerHTML = Lastname;
        parentNodeElementEdit.querySelector('[name=Fathername]').innerHTML = Fathername;
        parentNodeElementEdit.querySelector('[name=grandFather]').innerHTML = grandFather;
        parentNodeElementEdit.querySelector('[name=currentJob]').innerHTML = currentJob;
        parentNodeElementEdit.querySelector('[name=major]').innerHTML = major;
        parentNodeElementEdit.querySelector('[name=degree]').innerHTML = degree;
        parentNodeElementEdit.querySelector('[name=yearsOfWorking]').innerHTML = yearsOfWorking;
        parentNodeElementEdit.querySelector('[name=position]').innerHTML = position;
        parentNodeElementEdit.querySelector('[name=step]').innerHTML = step;
      })
        .catch(err => {
          console.log(err);
        });
  }
  
  
  //deleting staff-------------------------------------------------------------------------------------------------
  
  postDeleteStaff = (btn)=>{
    const parent = btn.parentNode;
      const staffId = parent.parentNode.querySelector('[name=staffDT]').value
      console.log('------------dp',staffId)
        fetch("/deleteStaff" , {
            method:'POST',
            headers: {
              'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: staffId
          })
        })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error('deleting staff failed!');
          }
          return res.json();
        })
        .then(data=>{
            console.log("-------------data",data)
            parentNodeElement.removeChild(nodeElement)
  
        })
        .catch(err=>
            console.log(err)
        )
    }


// getting external staffs-------------------------------------------------------------------------------------------

  getExternalStaff=()=>{
    console.log('found external staff')
     const name=document.getElementById('na');
     const  Lname=document.getElementById('Ln');
     const Fname=document.getElementById('Fn');
     const FFname=document.getElementById('FF');
     const  currentJob=document.getElementById('cu');
     const major=document.getElementById('ma');
     const degree=document.getElementById('de');
     const yearsOfWorking=document.getElementById('ye');
     const position=document.getElementById('po');
     const step=document.getElementById('st');
     const  button=document.getElementById('bt');
     name.style.display="block";
     Lname.style.display="block";
     Fname.style.display="block";
     FFname.style.display="block";
     currentJob.style.display="block";
     major.style.display="block";
     degree.style.display="block";
     yearsOfWorking.style.display="none";
     position.style.display="none";
     step.style.display="none";
     button.style.display="block";

     
  }

  // getting internal staffs--------------------------------------------------------------------------------------

  getInternalStaff=()=>{
    console.log('found internal staff')
     const name=document.getElementById('na');
     const  Lname=document.getElementById('Ln');
     const Fname=document.getElementById('Fn');
     const FFname=document.getElementById('FF');
     const  currentJob=document.getElementById('cu');
     const major=document.getElementById('ma');
     const degree=document.getElementById('de');
     const yearsOfWorking=document.getElementById('ye');
     const position=document.getElementById('po');
     const step=document.getElementById('st');
     const  button=document.getElementById('bt');
      name.style.display="block";
      Lname.style.display="block";
      Fname.style.display="block";
      FFname.style.display="block";
      currentJob.style.display="block";
      major.style.display="block";
      degree.style.display="block";
      yearsOfWorking.style.display="block";
      position.style.display="block";
      step.style.display="block";
      button.style.display="block";

  }

  //teacherSchedule-----------------------------------------------------------------------------------------

  teacher=(option)=>{
    const allDays=document.getElementById('allDays');
    allDays.style.display="block";
    const teach=option.value;
    // console.log('I cauth it.',teach)
    fetch('/teacherSchedule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            teach: teach
        })
    })
    .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Creating schedule failed!');
        }
        return res.json();
    })
    .then(data => {
      // console.log(data);
      
      var x=document.getElementById('first');
      var z=document.getElementById('first').getElementsByTagName('tbody')[0].insertRow(0);
      var y=document.getElementById('first').getElementsByTagName('tbody')[0].insertRow(1);
      var a=document.getElementById('first').getElementsByTagName('tbody')[0].insertRow(2);
      var b=document.getElementById('first').getElementsByTagName('tbody')[0].insertRow(3);
      var c=document.getElementById('first').getElementsByTagName('tbody')[0].insertRow(4);
      var d=document.getElementById('first').getElementsByTagName('tbody')[0].insertRow(5);
      var e=document.getElementById('first').getElementsByTagName('tbody')[0].insertRow(6);
      var f=document.getElementById('first').getElementsByTagName('tbody')[0].insertRow(7);

        var z1 = z.insertCell(0);
        z1.setAttribute('colspan','3')

        var y1=y.insertCell(0);
        var y2=y.insertCell(1);
        var y3=y.insertCell(2);

        var a1 = a.insertCell(0);
        a1.style.background="lightblue";
        a1.style.width="20%";
        a1.style.textAlign="center";
        var a2 = a.insertCell(1);
        var a3 = a.insertCell(2);

        var b1 = b.insertCell(0);
        b1.style.background="lightblue";
        b1.style.width="20%";
        b1.style.textAlign="center";
        var b2 = b.insertCell(1);
        var b3 = b.insertCell(2);

        var c1 = c.insertCell(0);
        c1.style.background="lightblue";
        c1.style.width="20%";
        c1.style.textAlign="center";
        var c2 = c.insertCell(1);
        var c3 = c.insertCell(2);

        var d1 = d.insertCell(0);
        d1.style.background="lightblue";
        d1.style.width="20%";
        d1.style.textAlign="center";
        var d2 = d.insertCell(1);
        var d3 = d.insertCell(2);

        var e1 = e.insertCell(0);
        e1.style.background="lightblue";
        e1.style.width="20%";
        e1.style.textAlign="center";
        var e2 = e.insertCell(1);
        var e3 = e.insertCell(2);

        var f1 = f.insertCell(0);
        f1.style.background="lightblue";
        f1.style.width="20%";
        f1.style.textAlign="center";
        var f2 = f.insertCell(1);
        var f3 = f.insertCell(2);

        z1.innerHTML='شـــنبه';
        z1.setAttribute('class','selectDay');

        y1.innerHTML='ساعت درسی'
        y1.style.width="20%";
        y1.style.padding='4px 8px';
        y1.style.fontWeight='bold';

        y2.innerHTML='صنف'
        y2.style.width="40%";
        y2.style.padding='4px 8px';
        y2.style.fontWeight='bold';

        y3.innerHTML='مضمون'
        y3.style.width="40%";
        y3.style.padding='4px 8px';
        y3.style.fontWeight='bold';

        a1.innerHTML="ساعت اول";
        b1.innerHTML="ساعت دوم";
        c1.innerHTML="ساعت سوم";
        d1.innerHTML="ساعت چهارم";
        e1.innerHTML="ساعت پنجم";
        f1.innerHTML="ساعت ششم";
      
        for(var i=0; i<data.post.length; i++){
            if(data.post[i].day=='شـــنبه'){
            // console.log('i got it')
              if(data.post[i].firstHourTeacher==teach){
                a2.innerHTML=data.post[i].chosenClass;
                a3.innerHTML=data.post[i].firstHourSubject;
              }
              if(data.post[i].secondHourTeacher==teach){
              b2.innerHTML=data.post[i].chosenClass;
              b3.innerHTML=data.post[i].secondHourSubject;
              }
              if(data.post[i].thirdHourTeacher==teach){
                c2.innerHTML=data.post[i].chosenClass;
                c3.innerHTML=data.post[i].thirdHourSubject;
              }
              if(data.post[i].fourthHourTeacher==teach){
                d2.innerHTML=data.post[i].chosenClass;
                d3.innerHTML=data.post[i].fourthHourSubject;
              }
              if(data.post[i].fifthHourTeacher==teach){
                e2.innerHTML=data.post[i].chosenClass;
                e3.innerHTML=data.post[i].fifthHourSubject;
              }
              
              if(data.post[i].sixthHourTeacher==teach){
                f2.innerHTML=data.post[i].chosenClass;
                f3.innerHTML=data.post[i].sixthHourSubject;
              }
            }
        }
        
        
          var x=document.getElementById('second');
          var z=document.getElementById('second').getElementsByTagName('tbody')[0].insertRow(0);
          var y=document.getElementById('second').getElementsByTagName('tbody')[0].insertRow(1);
          var a=document.getElementById('second').getElementsByTagName('tbody')[0].insertRow(2);
          var b=document.getElementById('second').getElementsByTagName('tbody')[0].insertRow(3);
          var c=document.getElementById('second').getElementsByTagName('tbody')[0].insertRow(4);
          var d=document.getElementById('second').getElementsByTagName('tbody')[0].insertRow(5);
          var e=document.getElementById('second').getElementsByTagName('tbody')[0].insertRow(6);
          var f=document.getElementById('second').getElementsByTagName('tbody')[0].insertRow(7);
  
            var z1 = z.insertCell(0);
            z1.setAttribute('colspan','3');
  
            var y1=y.insertCell(0);
            var y2=y.insertCell(1);
            var y3=y.insertCell(2);
          
            var a1 = a.insertCell(0);
            a1.style.background="lightblue";
            a1.style.width="20%";
            a1.style.textAlign="center";
            var a2 = a.insertCell(1);
            var a3 = a.insertCell(2);
  
            var b1 = b.insertCell(0);
            b1.style.background="lightblue";
            b1.style.width="20%";
            b1.style.textAlign="center";
            var b2 = b.insertCell(1);
            var b3 = b.insertCell(2);
  
            var c1 = c.insertCell(0);
            c1.style.background="lightblue";
            c1.style.width="20%";
            c1.style.textAlign="center";
            var c2 = c.insertCell(1);
            var c3 = c.insertCell(2);
  
            var d1 = d.insertCell(0);
            d1.style.background="lightblue";
            d1.style.width="20%";
            d1.style.textAlign="center";
            var d2 = d.insertCell(1);
            var d3 = d.insertCell(2);
  
            var e1 = e.insertCell(0);
            e1.style.background="lightblue";
            e1.style.width="20%";
            e1.style.textAlign="center";
            var e2 = e.insertCell(1);
            var e3 = e.insertCell(2);
  
            var f1 = f.insertCell(0);
            f1.style.background="lightblue";
            f1.style.width="20%";
            f1.style.textAlign="center";
            var f2 = f.insertCell(1);
            var f3 = f.insertCell(2);

            z1.innerHTML='یکشـــنبه';
            z1.setAttribute('class','selectDay');

            y1.innerHTML='ساعت درسی'
            y1.style.width="20%";
            y1.style.padding='4px 8px';
            y1.style.fontWeight='bold';

            y2.innerHTML='صنف'
            y2.style.width="40%";
            y2.style.padding='4px 8px';
            y2.style.fontWeight='bold';

            y3.innerHTML='مضمون'
            y3.style.width="40%";
            y3.style.padding='4px 8px';
            y3.style.fontWeight='bold';

            a1.innerHTML="ساعت اول";
            b1.innerHTML="ساعت دوم";
            c1.innerHTML="ساعت سوم";
            d1.innerHTML="ساعت چهارم";
            e1.innerHTML="ساعت پنجم";
            f1.innerHTML="ساعت ششم";

            for(var i=0; i<data.post.length; i++){
              if(data.post[i].day=='یکشـــنبه'){
              // console.log('i got it')
              if(data.post[i].firstHourTeacher==teach){
                a2.innerHTML=data.post[i].chosenClass;
                a3.innerHTML=data.post[i].firstHourSubject;
              }
              if(data.post[i].secondHourTeacher==teach){
              b2.innerHTML=data.post[i].chosenClass;
              b3.innerHTML=data.post[i].secondHourSubject;
              }
              if(data.post[i].thirdHourTeacher==teach){
                c2.innerHTML=data.post[i].chosenClass;
                c3.innerHTML=data.post[i].thirdHourSubject;
              }
              if(data.post[i].fourthHourTeacher==teach){
                d2.innerHTML=data.post[i].chosenClass;
                d3.innerHTML=data.post[i].fourthHourSubject;
              }
              if(data.post[i].fifthHourTeacher==teach){
                e2.innerHTML=data.post[i].chosenClass;
                e3.innerHTML=data.post[i].fifthHourSubject;
              }
              
              if(data.post[i].sixthHourTeacher==teach){
                f2.innerHTML=data.post[i].chosenClass;
                f3.innerHTML=data.post[i].sixthHourSubject;
              }
            }
          }
  
          var x=document.getElementById('third');
          var z=document.getElementById('third').getElementsByTagName('tbody')[0].insertRow(0);
          var y=document.getElementById('third').getElementsByTagName('tbody')[0].insertRow(1);
          var a=document.getElementById('third').getElementsByTagName('tbody')[0].insertRow(2);
          var b=document.getElementById('third').getElementsByTagName('tbody')[0].insertRow(3);
          var c=document.getElementById('third').getElementsByTagName('tbody')[0].insertRow(4);
          var d=document.getElementById('third').getElementsByTagName('tbody')[0].insertRow(5);
          var e=document.getElementById('third').getElementsByTagName('tbody')[0].insertRow(6);
          var f=document.getElementById('third').getElementsByTagName('tbody')[0].insertRow(7);
  
            var z1 = z.insertCell(0);
            z1.setAttribute('colspan','3');
  
            var y1=y.insertCell(0);
            var y2=y.insertCell(1);
            var y3=y.insertCell(2);
          
            var a1 = a.insertCell(0);
            a1.style.background="lightblue";
            a1.style.width="20%";
            a1.style.textAlign="center";
            var a2 = a.insertCell(1);
            var a3 = a.insertCell(2);
  
            var b1 = b.insertCell(0);
            b1.style.background="lightblue";
            b1.style.width="20%";
            b1.style.textAlign="center";
            var b2 = b.insertCell(1);
            var b3 = b.insertCell(2);
  
            var c1 = c.insertCell(0);
            c1.style.background="lightblue";
            c1.style.width="20%";
            c1.style.textAlign="center";
            var c2 = c.insertCell(1);
            var c3 = c.insertCell(2);
  
            var d1 = d.insertCell(0);
            d1.style.background="lightblue";
            d1.style.width="20%";
            d1.style.textAlign="center";
            var d2 = d.insertCell(1);
            var d3 = d.insertCell(2);
  
            var e1 = e.insertCell(0);
            e1.style.background="lightblue";
            e1.style.width="20%";
            e1.style.textAlign="center";
            var e2 = e.insertCell(1);
            var e3 = e.insertCell(2);
  
            var f1 = f.insertCell(0);
            f1.style.background="lightblue";
            f1.style.width="20%";
            f1.style.textAlign="center";
            var f2 = f.insertCell(1);
            var f3 = f.insertCell(2);

            z1.innerHTML='دو شـــنبه';
            z1.setAttribute('class','selectDay');

            y1.innerHTML='ساعت درسی'
            y1.style.width="20%";
            y1.style.padding='4px 8px';
            y1.style.fontWeight='bold';

            y2.innerHTML='صنف'
            y2.style.width="40%";
            y2.style.padding='4px 8px';
            y2.style.fontWeight='bold';

            y3.innerHTML='مضمون'
            y3.style.width="40%";
            y3.style.padding='4px 8px';
            y3.style.fontWeight='bold';

            a1.innerHTML="ساعت اول";
            b1.innerHTML="ساعت دوم";
            c1.innerHTML="ساعت سوم";
            d1.innerHTML="ساعت چهارم";
            e1.innerHTML="ساعت پنجم";
            f1.innerHTML="ساعت ششم";

            
            for(var i=0; i<data.post.length; i++){
              if(data.post[i].day=='دو شـــنبه'){
              // console.log('i got it')
              if(data.post[i].firstHourTeacher==teach){
                a2.innerHTML=data.post[i].chosenClass;
                a3.innerHTML=data.post[i].firstHourSubject;
              }
              if(data.post[i].secondHourTeacher==teach){
              b2.innerHTML=data.post[i].chosenClass;
              b3.innerHTML=data.post[i].secondHourSubject;
              }
              if(data.post[i].thirdHourTeacher==teach){
                c2.innerHTML=data.post[i].chosenClass;
                c3.innerHTML=data.post[i].thirdHourSubject;
              }
              if(data.post[i].fourthHourTeacher==teach){
                d2.innerHTML=data.post[i].chosenClass;
                d3.innerHTML=data.post[i].fourthHourSubject;
              }
              if(data.post[i].fifthHourTeacher==teach){
                e2.innerHTML=data.post[i].chosenClass;
                e3.innerHTML=data.post[i].fifthHourSubject;
              }
              
              if(data.post[i].sixthHourTeacher==teach){
                f2.innerHTML=data.post[i].chosenClass;
                f3.innerHTML=data.post[i].sixthHourSubject;
              }
            }
          }
  
          var x=document.getElementById('fourth');
          var z=document.getElementById('fourth').getElementsByTagName('tbody')[0].insertRow(0);
          var y=document.getElementById('fourth').getElementsByTagName('tbody')[0].insertRow(1);
          var a=document.getElementById('fourth').getElementsByTagName('tbody')[0].insertRow(2);
          var b=document.getElementById('fourth').getElementsByTagName('tbody')[0].insertRow(3);
          var c=document.getElementById('fourth').getElementsByTagName('tbody')[0].insertRow(4);
          var d=document.getElementById('fourth').getElementsByTagName('tbody')[0].insertRow(5);
          var e=document.getElementById('fourth').getElementsByTagName('tbody')[0].insertRow(6);
          var f=document.getElementById('fourth').getElementsByTagName('tbody')[0].insertRow(7);
  
            var z1 = z.insertCell(0);
            z1.setAttribute('colspan','3');
  
            var y1=y.insertCell(0);
            var y2=y.insertCell(1);
            var y3=y.insertCell(2);
          
            var a1 = a.insertCell(0);
            a1.style.background="lightblue";
            a1.style.width="20%";
            a1.style.textAlign="center";
            var a2 = a.insertCell(1);
            var a3 = a.insertCell(2);
  
            var b1 = b.insertCell(0);
            b1.style.background="lightblue";
            b1.style.width="20%";
            b1.style.textAlign="center";
            var b2 = b.insertCell(1);
            var b3 = b.insertCell(2);
  
            var c1 = c.insertCell(0);
            c1.style.background="lightblue";
            c1.style.width="20%";
            c1.style.textAlign="center";
            var c2 = c.insertCell(1);
            var c3 = c.insertCell(2);
  
            var d1 = d.insertCell(0);
            d1.style.background="lightblue";
            d1.style.width="20%";
            d1.style.textAlign="center";
            var d2 = d.insertCell(1);
            var d3 = d.insertCell(2);
  
            var e1 = e.insertCell(0);
            e1.style.background="lightblue";
            e1.style.width="20%";
            e1.style.textAlign="center";
            var e2 = e.insertCell(1);
            var e3 = e.insertCell(2);
  
            var f1 = f.insertCell(0);
            f1.style.background="lightblue";
            f1.style.width="20%";
            f1.style.textAlign="center";
            var f2 = f.insertCell(1);
            var f3 = f.insertCell(2);

            z1.innerHTML='سه شـــنبه';
            z1.setAttribute('class','selectDay');

            y1.innerHTML='ساعت درسی'
            y1.style.width="20%";
            y1.style.padding='4px 8px';
            y1.style.fontWeight='bold';

            y2.innerHTML='صنف'
            y2.style.width="40%";
            y2.style.padding='4px 8px';
            y2.style.fontWeight='bold';

            y3.innerHTML='مضمون'
            y3.style.width="40%";
            y3.style.padding='4px 8px';
            y3.style.fontWeight='bold';

            a1.innerHTML="ساعت اول";
            b1.innerHTML="ساعت دوم";
            c1.innerHTML="ساعت سوم";
            d1.innerHTML="ساعت چهارم";
            e1.innerHTML="ساعت پنجم";
            f1.innerHTML="ساعت ششم";

            for(var i=0; i<data.post.length; i++){
              if(data.post[i].day=='سه شـــنبه'){
              // console.log('i got it')
              if(data.post[i].firstHourTeacher==teach){
                a2.innerHTML=data.post[i].chosenClass;
                a3.innerHTML=data.post[i].firstHourSubject;
              }
              if(data.post[i].secondHourTeacher==teach){
              b2.innerHTML=data.post[i].chosenClass;
              b3.innerHTML=data.post[i].secondHourSubject;
              }
              if(data.post[i].thirdHourTeacher==teach){
                c2.innerHTML=data.post[i].chosenClass;
                c3.innerHTML=data.post[i].thirdHourSubject;
              }
              if(data.post[i].fourthHourTeacher==teach){
                d2.innerHTML=data.post[i].chosenClass;
                d3.innerHTML=data.post[i].fourthHourSubject;
              }
              if(data.post[i].fifthHourTeacher==teach){
                e2.innerHTML=data.post[i].chosenClass;
                e3.innerHTML=data.post[i].fifthHourSubject;
              }
              
              if(data.post[i].sixthHourTeacher==teach){
                f2.innerHTML=data.post[i].chosenClass;
                f3.innerHTML=data.post[i].sixthHourSubject;
              }
            }
          } 
  
          var x=document.getElementById('fifth');
          var z=document.getElementById('fifth').getElementsByTagName('tbody')[0].insertRow(0);
          var y=document.getElementById('fifth').getElementsByTagName('tbody')[0].insertRow(1);
          var a=document.getElementById('fifth').getElementsByTagName('tbody')[0].insertRow(2);
          var b=document.getElementById('fifth').getElementsByTagName('tbody')[0].insertRow(3);
          var c=document.getElementById('fifth').getElementsByTagName('tbody')[0].insertRow(4);
          var d=document.getElementById('fifth').getElementsByTagName('tbody')[0].insertRow(5);
          var e=document.getElementById('fifth').getElementsByTagName('tbody')[0].insertRow(6);
          var f=document.getElementById('fifth').getElementsByTagName('tbody')[0].insertRow(7);
  
            var z1 = z.insertCell(0);
            z1.setAttribute('colspan','3');
  
            var y1=y.insertCell(0);
            var y2=y.insertCell(1);
            var y3=y.insertCell(2);
          
            var a1 = a.insertCell(0);
            a1.style.background="lightblue";
            a1.style.width="20%";
            a1.style.textAlign="center";
            var a2 = a.insertCell(1);
            var a3 = a.insertCell(2);
  
            var b1 = b.insertCell(0);
            b1.style.background="lightblue";
            b1.style.width="20%";
            b1.style.textAlign="center";
            var b2 = b.insertCell(1);
            var b3 = b.insertCell(2);
  
            var c1 = c.insertCell(0);
            c1.style.background="lightblue";
            c1.style.width="20%";
            c1.style.textAlign="center";
            var c2 = c.insertCell(1);
            var c3 = c.insertCell(2);
  
            var d1 = d.insertCell(0);
            d1.style.background="lightblue";
            d1.style.width="20%";
            d1.style.textAlign="center";
            var d2 = d.insertCell(1);
            var d3 = d.insertCell(2);
  
            var e1 = e.insertCell(0);
            e1.style.background="lightblue";
            e1.style.width="20%";
            e1.style.textAlign="center";
            var e2 = e.insertCell(1);
            var e3 = e.insertCell(2);
  
            var f1 = f.insertCell(0);
            f1.style.background="lightblue";
            f1.style.width="20%";
            f1.style.textAlign="center";
            var f2 = f.insertCell(1);
            var f3 = f.insertCell(2);

            z1.innerHTML='چهار شـــنبه';
            z1.setAttribute('class','selectDay');

            y1.innerHTML='ساعت درسی'
            y1.style.width="20%";
            y1.style.padding='4px 8px';
            y1.style.fontWeight='bold';

            y2.innerHTML='صنف'
            y2.style.width="40%";
            y2.style.padding='4px 8px';
            y2.style.fontWeight='bold';

            y3.innerHTML='مضمون'
            y3.style.width="40%";
            y3.style.padding='4px 8px';
            y3.style.fontWeight='bold';

            a1.innerHTML="ساعت اول";
            b1.innerHTML="ساعت دوم";
            c1.innerHTML="ساعت سوم";
            d1.innerHTML="ساعت چهارم";
            e1.innerHTML="ساعت پنجم";
            f1.innerHTML="ساعت ششم";
            
            for(var i=0; i<data.post.length; i++){
              if(data.post[i].day=='چهار شـــنبه'){
              // console.log('i got it')
              if(data.post[i].firstHourTeacher==teach){
                a2.innerHTML=data.post[i].chosenClass;
                a3.innerHTML=data.post[i].firstHourSubject;
              }
              if(data.post[i].secondHourTeacher==teach){
              b2.innerHTML=data.post[i].chosenClass;
              b3.innerHTML=data.post[i].secondHourSubject;
              }
              if(data.post[i].thirdHourTeacher==teach){
                c2.innerHTML=data.post[i].chosenClass;
                c3.innerHTML=data.post[i].thirdHourSubject;
              }
              if(data.post[i].fourthHourTeacher==teach){
                d2.innerHTML=data.post[i].chosenClass;
                d3.innerHTML=data.post[i].fourthHourSubject;
              }
              if(data.post[i].fifthHourTeacher==teach){
                e2.innerHTML=data.post[i].chosenClass;
                e3.innerHTML=data.post[i].fifthHourSubject;
              }
              
              if(data.post[i].sixthHourTeacher==teach){
                f2.innerHTML=data.post[i].chosenClass;
                f3.innerHTML=data.post[i].sixthHourSubject;
              }
            }
          } 
  
          var x=document.getElementById('sixth');
          var z=document.getElementById('sixth').getElementsByTagName('tbody')[0].insertRow(0);
          var y=document.getElementById('sixth').getElementsByTagName('tbody')[0].insertRow(1);
          var a=document.getElementById('sixth').getElementsByTagName('tbody')[0].insertRow(2);
          var b=document.getElementById('sixth').getElementsByTagName('tbody')[0].insertRow(3);
          var c=document.getElementById('sixth').getElementsByTagName('tbody')[0].insertRow(4);
          var d=document.getElementById('sixth').getElementsByTagName('tbody')[0].insertRow(5);
          var e=document.getElementById('sixth').getElementsByTagName('tbody')[0].insertRow(6);
          var f=document.getElementById('sixth').getElementsByTagName('tbody')[0].insertRow(7);
          
            var z1 = z.insertCell(0);
            z1.setAttribute('colspan','3');
  
            var y1=y.insertCell(0);
            var y2=y.insertCell(1);
            var y3=y.insertCell(2);
          
            var a1 = a.insertCell(0);
            a1.style.background="lightblue";
            a1.style.width="20%";
            a1.style.textAlign="center";
            var a2 = a.insertCell(1);
            var a3 = a.insertCell(2);
  
            var b1 = b.insertCell(0);
            b1.style.background="lightblue";
            b1.style.width="20%";
            b1.style.textAlign="center";
            var b2 = b.insertCell(1);
            var b3 = b.insertCell(2);
  
            var c1 = c.insertCell(0);
            c1.style.background="lightblue";
            c1.style.width="20%";
            c1.style.textAlign="center";
            var c2 = c.insertCell(1);
            var c3 = c.insertCell(2);
  
            var d1 = d.insertCell(0);
            d1.style.background="lightblue";
            d1.style.width="20%";
            d1.style.textAlign="center";
            var d2 = d.insertCell(1);
            var d3 = d.insertCell(2);
  
            var e1 = e.insertCell(0);
            e1.style.background="lightblue";
            e1.style.width="20%";
            e1.style.textAlign="center";
            var e2 = e.insertCell(1);
            var e3 = e.insertCell(2);
  
            var f1 = f.insertCell(0);
            f1.style.background="lightblue";
            f1.style.width="20%";
            f1.style.textAlign="center";
            var f2 = f.insertCell(1);
            var f3 = f.insertCell(2);

            z1.innerHTML='پنج شـــنبه';
            z1.setAttribute('class','selectDay');

            y1.innerHTML='ساعت درسی'
            y1.style.width="20%";
            y1.style.padding='4px 8px';
            y1.style.fontWeight='bold';

            y2.innerHTML='صنف'
            y2.style.width="40%";
            y2.style.padding='4px 8px';
            y2.style.fontWeight='bold';

            y3.innerHTML='مضمون'
            y3.style.width="40%";
            y3.style.padding='4px 8px';
            y3.style.fontWeight='bold';

            a1.innerHTML="ساعت اول";
            b1.innerHTML="ساعت دوم";
            c1.innerHTML="ساعت سوم";
            d1.innerHTML="ساعت چهارم";
            e1.innerHTML="ساعت پنجم";
            f1.innerHTML="ساعت ششم";
            for(var i=0; i<data.post.length; i++){
              if(data.post[i].day=='پنج شـــنبه'){
              // console.log('i got it')
              if(data.post[i].firstHourTeacher==teach){
                a2.innerHTML=data.post[i].chosenClass;
                a3.innerHTML=data.post[i].firstHourSubject;
              }
              if(data.post[i].secondHourTeacher==teach){
              b2.innerHTML=data.post[i].chosenClass;
              b3.innerHTML=data.post[i].secondHourSubject;
              }
              if(data.post[i].thirdHourTeacher==teach){
                c2.innerHTML=data.post[i].chosenClass;
                c3.innerHTML=data.post[i].thirdHourSubject;
              }
              if(data.post[i].fourthHourTeacher==teach){
                d2.innerHTML=data.post[i].chosenClass;
                d3.innerHTML=data.post[i].fourthHourSubject;
              }
              if(data.post[i].fifthHourTeacher==teach){
                e2.innerHTML=data.post[i].chosenClass;
                e3.innerHTML=data.post[i].fifthHourSubject;
              }
              
              if(data.post[i].sixthHourTeacher==teach){
                f2.innerHTML=data.post[i].chosenClass;
                f3.innerHTML=data.post[i].sixthHourSubject;
              }
            }
          }
    })
    .then(data=>{
      document.getElementsByTagName('option').value=null;  
    })
    .catch(err => {
        console.log(err);
    });
  }




  //studentSchedule-----------------------------------------------------------------------------------------

  addStudentSchedule=(option)=>{
    const selectedClass=option.value;
    console.log('i cauth it.',selectedClass)
    const allDays=document.getElementById('allDays');
    allDays.style.display="block";
    fetch('/studentSchedule', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            selectedClass: selectedClass
        })
      })
      .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error('Creating student schedule failed!');
          }
          return res.json();
      })
      .then(data => {
        // console.log("data --- ",data);
        var x=document.getElementById('first');
        var z=document.getElementById('first').getElementsByTagName('tbody')[0].insertRow(0);
        var y=document.getElementById('first').getElementsByTagName('tbody')[0].insertRow(1);
        var a=document.getElementById('first').getElementsByTagName('tbody')[0].insertRow(2);
        var b=document.getElementById('first').getElementsByTagName('tbody')[0].insertRow(3);
        var c=document.getElementById('first').getElementsByTagName('tbody')[0].insertRow(4);
        var d=document.getElementById('first').getElementsByTagName('tbody')[0].insertRow(5);
        var e=document.getElementById('first').getElementsByTagName('tbody')[0].insertRow(6);
        var f=document.getElementById('first').getElementsByTagName('tbody')[0].insertRow(7);

          x.setAttribute('class','tableData');
          x.style.margin='3%';
        
          var z1 = z.insertCell(0);
          z1.setAttribute('colspan','3')

          var y1=y.insertCell(0);
          var y2=y.insertCell(1);
          var y3=y.insertCell(2);
       
          var a1 = a.insertCell(0);
          a1.style.background="lightblue";
          a1.style.width="20%";
          a1.style.textAlign="center";
          var a2 = a.insertCell(1);
          var a3 = a.insertCell(2);

          var b1 = b.insertCell(0);
          b1.style.background="lightblue";
          b1.style.width="20%";
          b1.style.textAlign="center";
          var b2 = b.insertCell(1);
          var b3 = b.insertCell(2);

          var c1 = c.insertCell(0);
          c1.style.background="lightblue";
          c1.style.width="20%";
          c1.style.textAlign="center";
          var c2 = c.insertCell(1);
          var c3 = c.insertCell(2);

          var d1 = d.insertCell(0);
          d1.style.background="lightblue";
          d1.style.width="20%";
          d1.style.textAlign="center";
          var d2 = d.insertCell(1);
          var d3 = d.insertCell(2);

          var e1 = e.insertCell(0);
          e1.style.background="lightblue";
          e1.style.width="20%";
          e1.style.textAlign="center";
          var e2 = e.insertCell(1);
          var e3 = e.insertCell(2);

          var f1 = f.insertCell(0);
          f1.style.background="lightblue";
          f1.style.width="20%";
          f1.style.textAlign="center";
          var f2 = f.insertCell(1);
          var f3 = f.insertCell(2);

          z1.innerHTML='شـــنبه';
          z1.setAttribute('name','day');
          z1.setAttribute('class','selectDay')

          y1.innerHTML='ساعت درسی'
          y1.style.width="20%";
          y1.style.padding='4px 8px';
          y1.style.fontWeight='bold';

          y2.innerHTML='صنف'
          y2.style.width="40%";
          y2.style.padding='4px 8px';
          y2.style.fontWeight='bold';

          y3.innerHTML='مضمون'
          y3.style.width="40%";
          y3.style.padding='4px 8px';
          y3.style.fontWeight='bold';

          a1.innerHTML="ساعت اول";
          b1.innerHTML="ساعت دوم";
          c1.innerHTML="ساعت سوم";
          d1.innerHTML="ساعت چهارم";
          e1.innerHTML="ساعت پنجم";
          f1.innerHTML="ساعت ششم";
        for(var i=0; i<data.post.length; i++){
          if(data.post[i].day=='شـــنبه'){
            
              a2.innerHTML=data.post[i].firstHourSubject;
              a3.innerHTML=data.post[i].firstHourTeacher;
           
              b2.innerHTML=data.post[i].secondHourSubject;
              b3.innerHTML=data.post[i].secondHourSubject;
           
              c2.innerHTML=data.post[i].thirdHourSubject;
              c3.innerHTML=data.post[i].thirdHourSubject;
           
              d2.innerHTML=data.post[i].fourthHourSubject;
              d3.innerHTML=data.post[i].fourthHourSubject;
           
              e2.innerHTML=data.post[i].fifthHourSubject;
              e3.innerHTML=data.post[i].fifthHourSubject;
           
              f2.innerHTML=data.post[i].sixthHourSubject;
              f3.innerHTML=data.post[i].sixthHourSubject;
           
          }
        }

          var x=document.getElementById('second');
          var z=document.getElementById('second').getElementsByTagName('tbody')[0].insertRow(0);
          var y=document.getElementById('second').getElementsByTagName('tbody')[0].insertRow(1);
          var a=document.getElementById('second').getElementsByTagName('tbody')[0].insertRow(2);
          var b=document.getElementById('second').getElementsByTagName('tbody')[0].insertRow(3);
          var c=document.getElementById('second').getElementsByTagName('tbody')[0].insertRow(4);
          var d=document.getElementById('second').getElementsByTagName('tbody')[0].insertRow(5);
          var e=document.getElementById('second').getElementsByTagName('tbody')[0].insertRow(6);
          var f=document.getElementById('second').getElementsByTagName('tbody')[0].insertRow(7);
  
          x.setAttribute('class','tableData');
          x.style.margin='3%';
          x.style.marginLeft='4%';

          var z1 = z.insertCell(0);
          z1.setAttribute('colspan','3');

          var y1=y.insertCell(0);
          var y2=y.insertCell(1);
          var y3=y.insertCell(2);


          var a1 = a.insertCell(0);
          a1.style.background="lightblue";
          a1.style.width="20%";
          a1.style.textAlign="center";
          var a2 = a.insertCell(1);
          var a3 = a.insertCell(2);

          var b1 = b.insertCell(0);
          b1.style.background="lightblue";
          b1.style.width="20%";
          b1.style.textAlign="center";
          var b2 = b.insertCell(1);
          var b3 = b.insertCell(2);

          var c1 = c.insertCell(0);
          c1.style.background="lightblue";
          c1.style.width="20%";
          c1.style.textAlign="center";
          var c2 = c.insertCell(1);
          var c3 = c.insertCell(2);

          var d1 = d.insertCell(0);
          d1.style.background="lightblue";
          d1.style.width="20%";
          d1.style.textAlign="center";
          var d2 = d.insertCell(1);
          var d3 = d.insertCell(2);

          var e1 = e.insertCell(0);
          e1.style.background="lightblue";
          e1.style.width="20%";
          e1.style.textAlign="center";
          var e2 = e.insertCell(1);
          var e3 = e.insertCell(2);

          var f1 = f.insertCell(0);
          f1.style.background="lightblue";
          f1.style.width="20%";
          f1.style.textAlign="center";
          var f2 = f.insertCell(1);
          var f3 = f.insertCell(2);

          z1.innerHTML='یکشـــنبه';
          z1.setAttribute('name','day');
          z1.setAttribute('class','selectDay')

          y1.innerHTML='ساعت درسی'
          y1.style.width="20%";
          y1.style.padding='4px 8px';
          y1.style.fontWeight='bold';

          y2.innerHTML='صنف'
          y2.style.width="40%";
          y2.style.padding='4px 8px';
          y2.style.fontWeight='bold';

          y3.innerHTML='مضمون'
          y3.style.width="40%";
          y3.style.padding='4px 8px';
          y3.style.fontWeight='bold';

          a1.innerHTML="ساعت اول";
          b1.innerHTML="ساعت دوم";
          c1.innerHTML="ساعت سوم";
          d1.innerHTML="ساعت چهارم";
          e1.innerHTML="ساعت پنجم";
          f1.innerHTML="ساعت ششم";
        for(var i=0; i<data.post.length; i++){
          if(data.post[i].day=='یکشـــنبه'){
            
              a2.innerHTML=data.post[i].firstHourSubject;
              a3.innerHTML=data.post[i].firstHourTeacher;
           
              b2.innerHTML=data.post[i].secondHourSubject;
              b3.innerHTML=data.post[i].secondHourSubject;
           
              c2.innerHTML=data.post[i].thirdHourSubject;
              c3.innerHTML=data.post[i].thirdHourSubject;
           
              d2.innerHTML=data.post[i].fourthHourSubject;
              d3.innerHTML=data.post[i].fourthHourSubject;
           
              e2.innerHTML=data.post[i].fifthHourSubject;
              e3.innerHTML=data.post[i].fifthHourSubject;
           
              f2.innerHTML=data.post[i].sixthHourSubject;
              f3.innerHTML=data.post[i].sixthHourSubject;
           
          }
        }


          var x=document.getElementById('third');
          var z=document.getElementById('third').getElementsByTagName('tbody')[0].insertRow(0);
          var y=document.getElementById('third').getElementsByTagName('tbody')[0].insertRow(1);
          var a=document.getElementById('third').getElementsByTagName('tbody')[0].insertRow(2);
          var b=document.getElementById('third').getElementsByTagName('tbody')[0].insertRow(3);
          var c=document.getElementById('third').getElementsByTagName('tbody')[0].insertRow(4);
          var d=document.getElementById('third').getElementsByTagName('tbody')[0].insertRow(5);
          var e=document.getElementById('third').getElementsByTagName('tbody')[0].insertRow(6);
          var f=document.getElementById('third').getElementsByTagName('tbody')[0].insertRow(7);
          // document.getElementById('first').innerHTML = data.post[0].day;
  
          x.setAttribute('class','tableData');
            x.style.margin='3%';
  
            var z1 = z.insertCell(0);
            z1.setAttribute('colspan','3');
  
            var y1=y.insertCell(0);
            var y2=y.insertCell(1);
            var y3=y.insertCell(2);
       
          var a1 = a.insertCell(0);
          a1.style.background="lightblue";
          a1.style.width="20%";
          a1.style.textAlign="center";
          var a2 = a.insertCell(1);
          var a3 = a.insertCell(2);

          var b1 = b.insertCell(0);
          b1.style.background="lightblue";
          b1.style.width="20%";
          b1.style.textAlign="center";
          var b2 = b.insertCell(1);
          var b3 = b.insertCell(2);

          var c1 = c.insertCell(0);
          c1.style.background="lightblue";
          c1.style.width="20%";
          c1.style.textAlign="center";
          var c2 = c.insertCell(1);
          var c3 = c.insertCell(2);

          var d1 = d.insertCell(0);
          d1.style.background="lightblue";
          d1.style.width="20%";
          d1.style.textAlign="center";
          var d2 = d.insertCell(1);
          var d3 = d.insertCell(2);

          var e1 = e.insertCell(0);
          e1.style.background="lightblue";
          e1.style.width="20%";
          e1.style.textAlign="center";
          var e2 = e.insertCell(1);
          var e3 = e.insertCell(2);

          var f1 = f.insertCell(0);
          f1.style.background="lightblue";
          f1.style.width="20%";
          f1.style.textAlign="center";
          var f2 = f.insertCell(1);
          var f3 = f.insertCell(2);

          z1.innerHTML='دو شـــنبه';
          z1.setAttribute('name','day');
          z1.setAttribute('class','selectDay')

          y1.innerHTML='ساعت درسی'
          y1.style.width="20%";
          y1.style.padding='4px 8px';
          y1.style.fontWeight='bold';

          y2.innerHTML='صنف'
          y2.style.width="40%";
          y2.style.padding='4px 8px';
          y2.style.fontWeight='bold';

          y3.innerHTML='مضمون'
          y3.style.width="40%";
          y3.style.padding='4px 8px';
          y3.style.fontWeight='bold';

          a1.innerHTML="ساعت اول";
          b1.innerHTML="ساعت دوم";
          c1.innerHTML="ساعت سوم";
          d1.innerHTML="ساعت چهارم";
          e1.innerHTML="ساعت پنجم";
          f1.innerHTML="ساعت ششم";
        for(var i=0; i<data.post.length; i++){
          if(data.post[i].day=='دو شـــنبه'){
            
              a2.innerHTML=data.post[i].firstHourSubject;
              a3.innerHTML=data.post[i].firstHourTeacher;
           
              b2.innerHTML=data.post[i].secondHourSubject;
              b3.innerHTML=data.post[i].secondHourSubject;
           
              c2.innerHTML=data.post[i].thirdHourSubject;
              c3.innerHTML=data.post[i].thirdHourSubject;
           
              d2.innerHTML=data.post[i].fourthHourSubject;
              d3.innerHTML=data.post[i].fourthHourSubject;
           
              e2.innerHTML=data.post[i].fifthHourSubject;
              e3.innerHTML=data.post[i].fifthHourSubject;
           
              f2.innerHTML=data.post[i].sixthHourSubject;
              f3.innerHTML=data.post[i].sixthHourSubject;
           
          }
        }


          var x=document.getElementById('fourth');
          var z=document.getElementById('fourth').getElementsByTagName('tbody')[0].insertRow(0);
          var y=document.getElementById('fourth').getElementsByTagName('tbody')[0].insertRow(1);
          var a=document.getElementById('fourth').getElementsByTagName('tbody')[0].insertRow(2);
          var b=document.getElementById('fourth').getElementsByTagName('tbody')[0].insertRow(3);
          var c=document.getElementById('fourth').getElementsByTagName('tbody')[0].insertRow(4);
          var d=document.getElementById('fourth').getElementsByTagName('tbody')[0].insertRow(5);
          var e=document.getElementById('fourth').getElementsByTagName('tbody')[0].insertRow(6);
          var f=document.getElementById('fourth').getElementsByTagName('tbody')[0].insertRow(7);
  
          x.setAttribute('class','tableData');
          x.style.margin='3%';
          x.style.marginLeft='4%';

          var z1 = z.insertCell(0);
          z1.setAttribute('colspan','3');

          var y1=y.insertCell(0);
          var y2=y.insertCell(1);
          var y3=y.insertCell(2);
       
          var a1 = a.insertCell(0);
          a1.style.background="lightblue";
          a1.style.width="20%";
          a1.style.textAlign="center";
          var a2 = a.insertCell(1);
          var a3 = a.insertCell(2);

          var b1 = b.insertCell(0);
          b1.style.background="lightblue";
          b1.style.width="20%";
          b1.style.textAlign="center";
          var b2 = b.insertCell(1);
          var b3 = b.insertCell(2);

          var c1 = c.insertCell(0);
          c1.style.background="lightblue";
          c1.style.width="20%";
          c1.style.textAlign="center";
          var c2 = c.insertCell(1);
          var c3 = c.insertCell(2);

          var d1 = d.insertCell(0);
          d1.style.background="lightblue";
          d1.style.width="20%";
          d1.style.textAlign="center";
          var d2 = d.insertCell(1);
          var d3 = d.insertCell(2);

          var e1 = e.insertCell(0);
          e1.style.background="lightblue";
          e1.style.width="20%";
          e1.style.textAlign="center";
          var e2 = e.insertCell(1);
          var e3 = e.insertCell(2);

          var f1 = f.insertCell(0);
          f1.style.background="lightblue";
          f1.style.width="20%";
          f1.style.textAlign="center";
          var f2 = f.insertCell(1);
          var f3 = f.insertCell(2);

          z1.innerHTML='سه شـــنبه';
          z1.setAttribute('class','selectDay')

          y1.innerHTML='ساعت درسی'
          y1.style.width="20%";
          y1.style.padding='4px 8px';
          y1.style.fontWeight='bold';

          y2.innerHTML='صنف'
          y2.style.width="40%";
          y2.style.padding='4px 8px';
          y2.style.fontWeight='bold';

          y3.innerHTML='مضمون'
          y3.style.width="40%";
          y3.style.padding='4px 8px';
          y3.style.fontWeight='bold';

          a1.innerHTML="ساعت اول";
          b1.innerHTML="ساعت دوم";
          c1.innerHTML="ساعت سوم";
          d1.innerHTML="ساعت چهارم";
          e1.innerHTML="ساعت پنجم";
          f1.innerHTML="ساعت ششم";
        for(var i=0; i<data.post.length; i++){
          if(data.post[i].day=='سه شـــنبه'){
            
              a2.innerHTML=data.post[i].firstHourSubject;
              a3.innerHTML=data.post[i].firstHourTeacher;
           
              b2.innerHTML=data.post[i].secondHourSubject;
              b3.innerHTML=data.post[i].secondHourSubject;
           
              c2.innerHTML=data.post[i].thirdHourSubject;
              c3.innerHTML=data.post[i].thirdHourSubject;
           
              d2.innerHTML=data.post[i].fourthHourSubject;
              d3.innerHTML=data.post[i].fourthHourSubject;
           
              e2.innerHTML=data.post[i].fifthHourSubject;
              e3.innerHTML=data.post[i].fifthHourSubject;
           
              f2.innerHTML=data.post[i].sixthHourSubject;
              f3.innerHTML=data.post[i].sixthHourSubject;
           
          }
        }

        var x=document.getElementById('fifth');
        var z=document.getElementById('fifth').getElementsByTagName('tbody')[0].insertRow(0);
        var y=document.getElementById('fifth').getElementsByTagName('tbody')[0].insertRow(1);
        var a=document.getElementById('fifth').getElementsByTagName('tbody')[0].insertRow(2);
        var b=document.getElementById('fifth').getElementsByTagName('tbody')[0].insertRow(3);
        var c=document.getElementById('fifth').getElementsByTagName('tbody')[0].insertRow(4);
        var d=document.getElementById('fifth').getElementsByTagName('tbody')[0].insertRow(5);
        var e=document.getElementById('fifth').getElementsByTagName('tbody')[0].insertRow(6);
        var f=document.getElementById('fifth').getElementsByTagName('tbody')[0].insertRow(7);

        x.setAttribute('class','tableData');
        x.style.margin='3%';

        var z1 = z.insertCell(0);
        z1.setAttribute('colspan','3');

        var y1=y.insertCell(0);
        var y2=y.insertCell(1);
        var y3=y.insertCell(2);
       
          var a1 = a.insertCell(0);
          a1.style.background="lightblue";
          a1.style.width="20%";
          a1.style.textAlign="center";
          var a2 = a.insertCell(1);
          var a3 = a.insertCell(2);

          var b1 = b.insertCell(0);
          b1.style.background="lightblue";
          b1.style.width="20%";
          b1.style.textAlign="center";
          var b2 = b.insertCell(1);
          var b3 = b.insertCell(2);

          var c1 = c.insertCell(0);
          c1.style.background="lightblue";
          c1.style.width="20%";
          c1.style.textAlign="center";
          var c2 = c.insertCell(1);
          var c3 = c.insertCell(2);

          var d1 = d.insertCell(0);
          d1.style.background="lightblue";
          d1.style.width="20%";
          d1.style.textAlign="center";
          var d2 = d.insertCell(1);
          var d3 = d.insertCell(2);

          var e1 = e.insertCell(0);
          e1.style.background="lightblue";
          e1.style.width="20%";
          e1.style.textAlign="center";
          var e2 = e.insertCell(1);
          var e3 = e.insertCell(2);

          var f1 = f.insertCell(0);
          f1.style.background="lightblue";
          f1.style.width="20%";
          f1.style.textAlign="center";
          var f2 = f.insertCell(1);
          var f3 = f.insertCell(2);

          z1.innerHTML='چهار شـــنبه';
          z1.setAttribute('name','day');
          z1.setAttribute('class','selectDay')

          y1.innerHTML='ساعت درسی'
          y1.style.width="20%";
          y1.style.padding='4px 8px';
          y1.style.fontWeight='bold';

          y2.innerHTML='صنف'
          y2.style.width="40%";
          y2.style.padding='4px 8px';
          y2.style.fontWeight='bold';

          y3.innerHTML='مضمون'
          y3.style.width="40%";
          y3.style.padding='4px 8px';
          y3.style.fontWeight='bold';

          a1.innerHTML="ساعت اول";
          b1.innerHTML="ساعت دوم";
          c1.innerHTML="ساعت سوم";
          d1.innerHTML="ساعت چهارم";
          e1.innerHTML="ساعت پنجم";
          f1.innerHTML="ساعت ششم";
        for(var i=0; i<data.post.length; i++){
          if(data.post[i].day=='چهار شـــنبه'){
            
              a2.innerHTML=data.post[i].firstHourSubject;
              a3.innerHTML=data.post[i].firstHourTeacher;
           
              b2.innerHTML=data.post[i].secondHourSubject;
              b3.innerHTML=data.post[i].secondHourSubject;
           
              c2.innerHTML=data.post[i].thirdHourSubject;
              c3.innerHTML=data.post[i].thirdHourSubject;
           
              d2.innerHTML=data.post[i].fourthHourSubject;
              d3.innerHTML=data.post[i].fourthHourSubject;
           
              e2.innerHTML=data.post[i].fifthHourSubject;
              e3.innerHTML=data.post[i].fifthHourSubject;
           
              f2.innerHTML=data.post[i].sixthHourSubject;
              f3.innerHTML=data.post[i].sixthHourSubject;
           
          }
        }


          var x=document.getElementById('sixth');
          var z=document.getElementById('sixth').getElementsByTagName('tbody')[0].insertRow(0);
          var y=document.getElementById('sixth').getElementsByTagName('tbody')[0].insertRow(1);
          var a=document.getElementById('sixth').getElementsByTagName('tbody')[0].insertRow(2);
          var b=document.getElementById('sixth').getElementsByTagName('tbody')[0].insertRow(3);
          var c=document.getElementById('sixth').getElementsByTagName('tbody')[0].insertRow(4);
          var d=document.getElementById('sixth').getElementsByTagName('tbody')[0].insertRow(5);
          var e=document.getElementById('sixth').getElementsByTagName('tbody')[0].insertRow(6);
          var f=document.getElementById('sixth').getElementsByTagName('tbody')[0].insertRow(7);
  
          x.setAttribute('class','tableData');
          x.style.margin='3%';
          x.style.marginLeft='4%';

          var z1 = z.insertCell(0);
          z1.setAttribute('colspan','3');

          var y1=y.insertCell(0);
          var y2=y.insertCell(1);
          var y3=y.insertCell(2);
       
          var a1 = a.insertCell(0);
          a1.style.background="lightblue";
          a1.style.width="20%";
          a1.style.textAlign="center";
          var a2 = a.insertCell(1);
          var a3 = a.insertCell(2);

          var b1 = b.insertCell(0);
          b1.style.background="lightblue";
          b1.style.width="20%";
          b1.style.textAlign="center";
          var b2 = b.insertCell(1);
          var b3 = b.insertCell(2);

          var c1 = c.insertCell(0);
          c1.style.background="lightblue";
          c1.style.width="20%";
          c1.style.textAlign="center";
          var c2 = c.insertCell(1);
          var c3 = c.insertCell(2);

          var d1 = d.insertCell(0);
          d1.style.background="lightblue";
          d1.style.width="20%";
          d1.style.textAlign="center";
          var d2 = d.insertCell(1);
          var d3 = d.insertCell(2);

          var e1 = e.insertCell(0);
          e1.style.background="lightblue";
          e1.style.width="20%";
          e1.style.textAlign="center";
          var e2 = e.insertCell(1);
          var e3 = e.insertCell(2);

          var f1 = f.insertCell(0);
          f1.style.background="lightblue";
          f1.style.width="20%";
          f1.style.textAlign="center";
          var f2 = f.insertCell(1);
          var f3 = f.insertCell(2);

          z1.innerHTML='پنج شـــنبه ';
          z1.setAttribute('class','selectDay')

          y1.innerHTML='ساعت درسی'
          y1.style.width="20%";
          y1.style.padding='4px 8px';
          y1.style.fontWeight='bold';

          y2.innerHTML='صنف'
          y2.style.width="40%";
          y2.style.padding='4px 8px';
          y2.style.fontWeight='bold';

          y3.innerHTML='مضمون'
          y3.style.width="40%";
          y3.style.padding='4px 8px';
          y3.style.fontWeight='bold';

          a1.innerHTML="ساعت اول";
          b1.innerHTML="ساعت دوم";
          c1.innerHTML="ساعت سوم";
          d1.innerHTML="ساعت چهارم";
          e1.innerHTML="ساعت پنجم";
          f1.innerHTML="ساعت ششم";
        for(var i=0; i<data.post.length; i++){
          if(data.post[i].day=='پنج شـــنبه'){
            
              a2.innerHTML=data.post[i].firstHourSubject;
              a3.innerHTML=data.post[i].firstHourTeacher;
           
              b2.innerHTML=data.post[i].secondHourSubject;
              b3.innerHTML=data.post[i].secondHourSubject;
           
              c2.innerHTML=data.post[i].thirdHourSubject;
              c3.innerHTML=data.post[i].thirdHourSubject;
           
              d2.innerHTML=data.post[i].fourthHourSubject;
              d3.innerHTML=data.post[i].fourthHourSubject;
           
              e2.innerHTML=data.post[i].fifthHourSubject;
              e3.innerHTML=data.post[i].fifthHourSubject;
           
              f2.innerHTML=data.post[i].sixthHourSubject;
              f3.innerHTML=data.post[i].sixthHourSubject;
           
          }
        }

        //myTable-------------------------------------------------------------------------------------------------
        // var myDynamicTable = document.getElementById("myDynamicTable");

        // var table = document.createElement('TABLE');
        // table.border = '1';
        // table.style.borderCollapse="collapse";
        // table.width='70%';
        // table.style.margin='auto';

        // var tableBody=document.createElement('TBODY');
        // table.appendChild(tableBody);

        // var tr=document.createElement('TR');
        // tableBody.appendChild(tr);
        // var td=document.createElement('TD');
        // td.style.width='100%';
        // td.appendChild(document.createTextNode('salam'));
        // tr.appendChild(td);

        // var tr2= document.createElement('TR');
        // tr2.appendChild(tr);

        // var td1=document.createElement('TD');
        // td1.style.width='20%';
        // td1.style.color='lightblue';
        // td1.appendChild(document.createTextNode('ساعت اول'));
        // td1.appendChild(tr2);

        // var td2=document.createElement('TD');
        // td2.style.width='40%';
        // td2.appendChild(document.createTextNode('saleha'));
        // td2.appendChild(tr2);

        // var td3=document.createElement('TD');
        // td3.style.width='40%';
        // td3.appendChild(document.createTextNode('bussiness'));
        // td3.appendChild(tr2);
        // myDynamicTable.appendChild(table);
        
      })
      .catch(err => {
          console.log(err);
      });
  }
  // addStudentSchedule();
  