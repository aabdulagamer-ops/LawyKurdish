const firebaseConfig = {
  apiKey: "AIzaSyD1E2XRgo_g_gGawsY_hhaGO0THrEwPhiY",
  authDomain: "lawy-kurdish.firebaseapp.com",
  projectId: "lawy-kurdish",
  storageBucket: "lawy-kurdish.firebasestorage.app",
  messagingSenderId: "406843574269",
  appId: "1:406843574269:web:c3f651d97f2ecfd8b8fb94",
  measurementId: "G-B79FPND107"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.style.display = (menu.style.display === "flex") ? "none" : "flex";
}

function openFrame() { document.getElementById("dataFrame").style.display = "flex"; }
function closeFrame() { document.getElementById("dataFrame").style.display = "none"; }

function checkPassword() {
    const passValue = document.getElementById("passInput").value;
    if(passValue === "prosep and laawy kurdish") {
        document.getElementById("globalChat").style.display = "block";
        document.getElementById("passWrapper").style.display = "none";
        loadGlobalComments(); 
    } else {
        alert("وشەی نهێنی هەڵەیە!");
    }
}

function submitComment() {
    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim();
    const platform = document.getElementById("userPlatform").value.trim();
    const comment = document.getElementById("userComment").value.trim();
    
    if(name !== "" && email !== "" && platform !== "" && comment !== "") {
        db.collection("messages").add({
            name: name,
            email: email,
            platform: platform,
            text: comment,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            alert("پەیامەکەت نێردرا!");
            closeFrame();
        });
    } else {
        alert("خانەکان پڕ بکەرەوە");
    }
}

function loadGlobalComments() {
    const list = document.getElementById("commentList");
    db.collection("messages").orderBy("createdAt", "desc").limit(50).onSnapshot((snapshot) => {
        list.innerHTML = ""; 
        snapshot.forEach((doc) => {
            const data = doc.data();
            const bubble = document.createElement("div");
            bubble.className = "chat-bubble";
            bubble.innerHTML = `<strong>${data.name}</strong><p>${data.text}</p>`;
            list.appendChild(bubble);
        });
    });
}

window.addEventListener("scroll", () => {
    document.querySelectorAll(".reveal").forEach(el => {
        if(el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add("active");
    });
});