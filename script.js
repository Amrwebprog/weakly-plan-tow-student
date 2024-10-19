// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDLZf9gdelSwm9es_Y9Efx0XrTX0SV1hAM",
    authDomain: "weaklyplan-tow.firebaseapp.com",
    projectId: "weaklyplan-tow",
    storageBucket: "weaklyplan-tow.appspot.com",
    messagingSenderId: "418809439981",
    appId: "1:418809439981:web:5b2e2d80ebadb89ca04ee4",
    measurementId: "G-ZHEFTNN20D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Event listeners
document.getElementById('monthInput').addEventListener('change', function() {
    document.getElementById('weekSelectorDiv').style.display = 'block';
});

document.getElementById('weekSelector').addEventListener('change', function() {
    document.getElementById('gradeSelectorDiv').style.display = 'block';
});

document.getElementById('gradeSelector').addEventListener('change', async function() {
    const month = document.getElementById('monthInput').value;
    const week = document.getElementById('weekSelector').value;
    const grade = document.getElementById('gradeSelector').value;
    
    // بناء اسم المجموعة بناءً على المدخلات
    const collectionName = `${month}-${week}`;

    // جلب البيانات من Firestore
    const q = query(collection(db, collectionName), where("classroom", "==", grade));
    const querySnapshot = await getDocs(q);
    
    // ملء الجدول بالبيانات
    const tbody = document.querySelector('#data-table tbody');
    tbody.innerHTML = ''; // مسح أي بيانات سابقة

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const row = `
            <tr>
                <td>${data.subject}</td>
                <td>${data.sunday}</td>
                <td>${data.monday}</td>
                <td>${data.tuesday}</td>
                <td>${data.wednesday}</td>
                <td>${data.thursday}</td>
            </tr>
        `;
        tbody.innerHTML += row; // إضافة الصف الجديد
    });

    document.getElementById('tableDiv').style.display = 'block'; // إظهار الجدول بعد إضافة البيانات
});
