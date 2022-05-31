const username = document.getElementById('username');
const password = document.getElementById('password');
const email = document.getElementById('email');

const form = document.getElementById('form');
const messageBox = document.getElementById('messagebox');

username.oninput = () => {

    username.value = username.value.toLowerCase().replace(/ /g, '-').replace(/[^a-z\-]/g, '');

    while (username.value.startsWith('-')) {

        username.value = username.value.slice(1, username.value.length);

    }
    
    while (username.value.endsWith('--')) {

        username.value = username.value.slice(0, username.value.length - 1);

    }

}

password.oninput = (e) => {

    let message = passwordMessage(password.value);
    if (message != undefined) {

        messageBox.innerHTML = message;

    } else {

        messageBox.innerHTML = "";

    }

}

function passwordMessage(password) {

    if (!password.match(/[0-9]/)) return "You should have a number in your password.";
    if (!password.match(/[$-/:-?{-~!"^_`\[\]]/)) return "Your password should contain a symbol.";
    if (password.toLowerCase() == password) return "Your password should contain uppercase letters.";
    if (password.toUpperCase() == password) return "Your password should contain lowercase letters.";

    if (password.length <= 4) return "Your password is too short.";
    if (password.length >= 14) return "Your password is too long.";

    return undefined;

}

form.onsubmit = (e) => {

    e.preventDefault();
    
    while (username.value.endsWith('-')) {

        username.value = username.value.slice(0, username.value.length - 1);

    }

    let usernameValue = username.value;
    let passwordValue = password.value;
    let emailValue = email.value;

    let body = {
        username: usernameValue,
        password: passwordValue,
        email: emailValue
    };

    fetch(`https://api.fairfieldprogramming.org/user/signup`, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json()).then((data) => {

        if (data.id != undefined) {

            document.getElementById('success').classList.add('active');

        } else {

            alert("Please try again later.");

        }

    });

}