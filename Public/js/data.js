
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


postData = (data) => {
  const name = document.getElementById('Name').value;
  const lastName = document.getElementById('LastName').value;
  const fatherName = document.getElementById('FatherName').value;
  const grandfather = document.getElementById('GrandFather').value;
  const section = document.getElementById('Skin').value;
  const page = document.getElementById('Page').value;
  const record = document.getElementById('Register').value;
  const Nsakok = document.getElementById('SakokNumber').value;
  const graduation = document.getElementById('ClassGraduted').value;
  const year = document.getElementById('Year').value;
  const school = document.getElementById('School').value;
  const Gprovince = document.getElementById('Province').value;
  const village = document.getElementById('MainVillage').value;
  const district = document.getElementById('MainRegion').value;
  const province = document.getElementById('MainProvince').value;
  const currentvillage = document.getElementById('CurrentVillage').value;
  const currentprovince= document.getElementById('CurrentProvince').value;
  const currentdistrict = document.getElementById('CurrentRegion').value;
  const interanceID = document.getElementById('KonkorID').value;
  const score = document.getElementById('KonkorScore').value;
  const phone= document.getElementById('PhoneNumber').value;
  const relativePhone= document.getElementById('RelationContactNumber').value;
  const basenumber = document.getElementById('BaseNumber').value;
  const nationality = document.getElementById('Nationality').value;
  const interanceMaktobNumber= document.getElementById('RegisterWrittenNumber').value;
  const maktobNumber = document.getElementById('WrittenNumber').value;
  const night = document.getElementById('Dormitory').value;
  const department=document.getElementById('Department').value
  const lunch = document.getElementById('Lunch').value;
  const enrollDate= document.getElementById('EnrollDate').value;
  const duty= document.getElementById('FatherJob').value;
  const dutyPlace= document.getElementById('FatherJoblocation').value;
  const birthYear= document.getElementById('BirthYear').value;
  const semster = document.getElementById('semster').value;
  const classes = document.getElementById('GraduationYear').value;

 

  // let url = "http://localhost:3000/";  
  let url = "/getInfo";  
    let method = 'POST'
  fetch(url, {
      method: method,
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          Name: name,
          LastName: lastName,
          FatherName: fatherName,
          GrandFather:grandfather,
          Skin:section,
          Page:page,
          Register:record,
          SakokNumber:Nsakok,
          ClassGraduted:graduation,
          Year:year,
          School:school,
          Province:Gprovince,
          MainVillage:village,
          MainRegion:district,
          MainProvince:province,
          CurrentVillage:currentvillage,
          CurrentRegion:currentdistrict,
          CurrentProvince:currentprovince,
          FatherJob:duty,
          FatherJoblocation:dutyPlace,
          BirthYear:birthYear,
          KonkorID:interanceID,
          KonkorScore:score,
          PhoneNumber:phone,
          RelationContactNumber:relativePhone,
          EnrollDate:enrollDate,
          BaseNumber:basenumber,
          RegisterWrittenNumber:interanceMaktobNumber,
          Nationality:nationality,
          WrittenNumber:maktobNumber,
          Department:department,
          Dormitory:night,
          Lunch:lunch,
          semster:semster,
          GraduationYear:classes,
          image:image
      })
  })
  .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Creating or editing a post failed!');
      }
      return res.json();
    })
  .then(data => {
    console.log(data.image)
      var x=document.getElementById('tableData').getElementsByTagName('tbody')[0].insertRow(0);
      var c1 = x.insertCell(0);
      var c2 = x.insertCell(1);
      var c3 = x.insertCell(2);
      var c4 = x.insertCell(3);
      var c5 = x.insertCell(4);
      var c6 = x.insertCell(5);
      var c7 = x.insertCell(6);
      var c8 = x.insertCell(7);
      c8.innerHTML="";
      c7.innerHTML=data.post.Name;
      c7.setAttribute('name','name');
      c6.innerHTML=data.post.LastName;
      c6.setAttribute('name','LastName');
      c5.innerHTML=data.post.FatherName;
      c5.setAttribute('name','FatherName ');
      c4.innerHTML=data.post.BaseNumber;
      c4.setAttribute('name','BaseNumber');
      c3.innerHTML=data.post.Department;
      c3.setAttribute('name','Department');
      c2.innerHTML=data.post.GraduationYear;
      c2.setAttribute('name','GraduationYear');
      c1.innerHTML='<input type="hidden" name="recordId" value="'+data.post._id+'"><button type="button"  class="btn btn-warning notika-btn-warning" data-toggle="modal" data-target="#editModal" data-whatever="'+[data.post._id, data.post.Name, data.post.FatherName, data.post.LastName,data.post.GrandFather,data.post.Skin,data.post.Page,data.post.Register,data.post.SakokNumber,data.post.ClassGraduted,data.post.Year,data.post.School,data.post.Province,data.post.MainVillage,data.post.MainRegion,data.post.MainProvince,data.post.CurrentVillage,data.post.CurrentRegion,data.post.CurrentProvince,data.post.FatherJob,data.post.FatherJoblocation,data.post.BirthYear,data.post.KonkorID,data.post.KonkorScore,data.post.PhoneNumber,data.post.RelationContactNumber,data.post.EnrollDate,data.post.BaseNumber,data.post.RegisterWrittenNumber,data.post.Nationality,data.post.Department,data.post.WrittenNumber,data.post.Dormitory,data.post.Lunch,data.post.semster,data.post.GraduationYear]+'" onclick="returnRowToEdit(this)" >ویرایش</button> <button type="button" class="btn btn-info notika-btn-info" id="sample" data-toggle="modal" data-target="#myModalthree'+data.post._id+'">جزئیات</button> <button type="button"  class="btn btn-danger notika-btn-danger"   id ="sample" data-toggle="modal" data-target="#exampleModal" data-whatever="'+data.post._id+'" onclick="returnRowToDelete(this)">حذف</button> ';
      document.getElementById('Name').value = null;
      document.getElementById('FatherName').value = null;
      document.getElementById('LastName').value = null;
      document.getElementById('GrandFather').value = null;
      document.getElementById('Skin').value = null;
      document.getElementById('Page').value = null;
      document.getElementById('Register').value = null;
      document.getElementById('SakokNumber').value = null;
      document.getElementById('ClassGraduted').value = null;
      document.getElementById('Year').value = null;
      document.getElementById('School').value = null;
      document.getElementById('Province').value = null;
      document.getElementById('MainVillage').value = null;
      document.getElementById('MainRegion').value = null;
      document.getElementById('MainProvince').value = null;
      document.getElementById('CurrentVillage').value = null;
      document.getElementById('CurrentRegion').value = null;
      document.getElementById('CurrentProvince').value = null;
      document.getElementById('FatherJob').value = null;
      document.getElementById('FatherJoblocation').value = null;
      document.getElementById('BirthYear').value = null;
      document.getElementById('KonkorID').value = null;
      document.getElementById('KonkorScore').value = null;
      document.getElementById('PhoneNumber').value = null;
      document.getElementById('RelationContactNumber').value = null;
      document.getElementById('EnrollDate').value = null;
      document.getElementById('BaseNumber').value = null;
      document.getElementById('RegisterWrittenNumber').value = null;
      document.getElementById('Nationality').value = null;
      document.getElementById('WrittenNumber').value = null;
      document.getElementById('Dormitory').value = null;
      document.getElementById('Lunch').value = null;


  })
    .catch(err => {
      console.log(err);
    });
}

editData = (btn) => {
const parent = btn.parentNode;
const recordId = parent.parentNode.querySelector('[name=id]').value;
const name = parent.parentNode.querySelector('[name=Name]').value;
const lastName = parent.parentNode.querySelector('[name=LastName]').value;
const fatherName = parent.parentNode.querySelector('[name=FatherName]').value;
const grandfather = parent.parentNode.querySelector('[name=GrandFather]').value;
const section = parent.parentNode.querySelector('[name=Skin]').value;
const page= parent.parentNode.querySelector('[name=Page]').value;
const record= parent.parentNode.querySelector('[name=Register]').value;
const Nsakok= parent.parentNode.querySelector('[name=SakokNumber]').value;
const graduation= parent.parentNode.querySelector('[name=ClassGraduted]').value;
const year= parent.parentNode.querySelector('[name=Year]').value;
const school= parent.parentNode.querySelector('[name=School]').value;
const Gprovince= parent.parentNode.querySelector('[name=Province]').value;
const village= parent.parentNode.querySelector('[name=MainVillage]').value;
const district= parent.parentNode.querySelector('[name=MainRegion]').value;
const province= parent.parentNode.querySelector('[name=MainProvince]').value;
const currentvillage= parent.parentNode.querySelector('[name=CurrentVillage]').value;
const currentdistrict= parent.parentNode.querySelector('[name=CurrentRegion]').value;
const currentprovince= parent.parentNode.querySelector('[name=CurrentProvince]').value;
const duty= parent.parentNode.querySelector('[name=FatherJob]').value;
const dutyPlace= parent.parentNode.querySelector('[name=FatherJoblocation]').value;
const birthYear= parent.parentNode.querySelector('[name=BirthYear]').value;
const interanceID= parent.parentNode.querySelector('[name=KonkorID]').value;
const score= parent.parentNode.querySelector('[name=KonkorScore]').value;
const phone= parent.parentNode.querySelector('[name=PhoneNumber]').value;
const relativePhone= parent.parentNode.querySelector('[name=RelationContactNumber]').value;
const enrollDate= parent.parentNode.querySelector('[name=EnrollDate]').value;
const basenumber= parent.parentNode.querySelector('[name=BaseNumber]').value;
const interanceMaktobNumber= parent.parentNode.querySelector('[name=RegisterWrittenNumber]').value;
const nationality= parent.parentNode.querySelector('[name=Nationality]').value;
const department=parent.parentNode.querySelector('[name=Department]').value;
const maktobNumber=parent.parentNode.querySelector('[name=WrittenNumber]').value;
const night= parent.parentNode.querySelector('[name=Dormitory]').value;
const lunch= parent.parentNode.querySelector('[name=Lunch]').value;
const semster= parent.parentNode.querySelector('[name=semster]').value;
const classes= parent.parentNode.querySelector('[name=GraduationYear]').value;
let url = "/editedReport";
    let method = 'POST'
    fetch(url, {
      method: method,
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          id: recordId,
          Name: name,
          LastName: lastName,
          FatherName: fatherName,
          GrandFather:grandfather,
          Skin:section,
          Page:page,
          Register:record,
          SakokNumber:Nsakok,
          ClassGraduted:graduation,
          Year:year,
          School:school,
          Province:Gprovince,
          MainVillage:village,
          MainRegion:district,
          MainProvince:province,
          CurrentVillage:currentvillage,
          CurrentRegion:currentdistrict,
          CurrentProvince:currentprovince,
          FatherJob:duty,
          FatherJoblocation:dutyPlace,
          BirthYear:birthYear,
          KonkorID:interanceID,
          KonkorScore:score,
          PhoneNumber:phone,
          RelationContactNumber:relativePhone,
          EnrollDate:enrollDate,
          BaseNumber:basenumber,
          RegisterWrittenNumber:interanceMaktobNumber,
          Nationality:nationality,
          Department:department,
          WrittenNumber:maktobNumber,
          Dormitory:night,
          Lunch:lunch,
          semster:semster,
          GraduationYear:classes
      })
  })
  .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Creating or editing a post failed!');
      }
      return res.json();
    })
  .then(data => {
    parentNodeElementEdit.querySelector('[name=Name]').innerHTML= name;
    parentNodeElementEdit.querySelector('[name=LastName]').innerHTML = lastName;
    parentNodeElementEdit.querySelector('[name=FatherName]').innerHTML = fatherName;
    parentNodeElementEdit.querySelector('[name=GrandFather]').innerHTML = grandfather;
    parentNodeElementEdit.querySelector('[name=Skin]').innerHTML = section;
    parentNodeElementEdit.querySelector('[name=Page]').innerHTML = page;
    parentNodeElementEdit.querySelector('[name=Register]').innerHTML = record;
    parentNodeElementEdit.querySelector('[name=SakokNumber]').innerHTML = Nsakok;
    parentNodeElementEdit.querySelector('[name=ClassGraduted]').innerHTML = graduation;
    parentNodeElementEdit.querySelector('[name=Year]').innerHTML =year;
    parentNodeElementEdit.querySelector('[name=School]').innerHTML=school;
    parentNodeElementEdit.querySelector('[name=Province]').innerHTML=Gprovince;
    parentNodeElementEdit.querySelector('[name=MainVillage]').innerHTML=village;
    parentNodeElementEdit.querySelector('[name=MainRegion]').innerHTML=district;
    parentNodeElementEdit.querySelector('[name=MainProvince]').innerHTML=province;
    parentNodeElementEdit.querySelector('[name=CurrentVillage]').innerHTML=currentvillage;
    parentNodeElementEdit.querySelector('[name=CurrentRegion]').innerHTML=currentdistrict;
    parentNodeElementEdit.querySelector('[name=CurrentProvince]').innerHTML=currentprovince;
    parentNodeElementEdit.querySelector('[name=FatherJob]').innerHTML=duty;
    parentNodeElementEdit.querySelector('[name=FatherJoblocation]').innerHTML=dutyPlace;
    parentNodeElementEdit.querySelector('[name=BirthYear]').innerHTML=birthYear;
    parentNodeElementEdit.querySelector('[name=KonkorID]').innerHTML=interanceID;
    parentNodeElementEdit.querySelector('[name=KonkorScore]').innerHTML=score;
    parentNodeElementEdit.querySelector('[name=PhoneNumber]').innerHTML=phone;
    parentNodeElementEdit.querySelector('[name=RelationContactNumber]').innerHTML=relativePhone;
    parentNodeElementEdit.querySelector('[name=EnrollDate]').innerHTML=enrollDate;
    parentNodeElementEdit.querySelector('[name=BaseNumber]').innerHTML=basenumber;
    parentNodeElementEdit.querySelector('[name=RegisterWrittenNumber]').innerHTML=interanceMaktobNumber;
    parentNodeElementEdit.querySelector('[name=Nationality]').innerHTML=nationality;
    parentNodeElementEdit.querySelector('[name=Department]').innerHTML=department;
    parentNodeElementEdit.querySelector('[name=WrittenNumber]').innerHTML=maktobNumber;
    parentNodeElementEdit.querySelector('[name=Dormitory]').innerHTML=night;
    parentNodeElementEdit.querySelector('[name=Lunch]').innerHTML=lunch;
    parentNodeElementEdit.querySelector('[name=semster]').innerHTML=semster;
    parentNodeElementEdit.querySelector('[name=GraduationYear]').innerHTML=classes;

  })
    .catch(err => {
      console.log(err);
    });
}

postDelete = (btn)=>{
const parent = btn.parentNode;
const recordId = parent.parentNode.querySelector('[name=recipientName]').value


// let url = "http://localhost:3000/deleted";
let url = "/deletedStudent";
    let method = 'POST'
  fetch(url, {
      method: method,
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          id: recordId
      })
  })
  .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Creating or editing a post failed!');
      }
      return res.json();
    })
  .then(data => {
    parentNodeElement.removeChild(nodeElement)
  })
    .catch(err => {
      console.log(err);
    });
}