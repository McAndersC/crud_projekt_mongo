// Metode til at sender vores nye bruger til vores endpoint.
const submitNewUser = (e) => {

    let form = document.querySelector('#userform');

    // Forhindre vorew event i at udføre default. (vi tager over herfra)
    e.preventDefault();

    // Samler vores input vir form.elements.
    let formInputs = form.elements;

    // Opretter et nyt user objekt
    let newUser =  {
        'username': formInputs['username'].value,
        'name' : formInputs['name'].value,
        'email' : formInputs['email'].value,
        'password' : formInputs['password'].value
    }

    // Benytter fetch til at POST(e) vores newUser objekt til vores endpoint (localhost:3000/users/register)
    fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }).then((response) => response.json()).then((response) => {

        showResponse(response.message);

    });

}

// Metode til at vise response beskeden.
const showResponse = (response) => {

    let status = document.querySelector('.status-bar');
    status.textContent = response;
    status.classList.add('active');

    setTimeout(() => {
        status.classList.remove('active');
    }, 3000)

}


const navBar = {
    
    setup : (elm) => {

        if(elm) {

            elm.insertAdjacentHTML('beforeend', `
                <a href="/">Forside</a>
                <a href="/create">Create</a>
            `)
        }

    }

}


let client = {};

client.init = () => {

    let form = document.querySelector('#userform');
    let nav = document.querySelector('.nav-bar')
    
    if(form)
    {
        form.addEventListener('submit', submitNewUser);
    }

   navBar.setup(nav);

}

client.init()